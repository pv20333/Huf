const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const ldap = require("ldapjs");
const jwt = require('jsonwebtoken');

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const client = ldap.createClient({
  url: "ldap://127.0.0.1:10389" // Servidor e porta do LDAP
});

function authenticateDN(username, password) {
  const userDN = `uid=${username},ou=Users,dc=example,dc=com`;

  return new Promise((resolve, reject) => {
    client.bind(userDN, password, function (err) {
      if (err) {
        console.error("LDAP bind error:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function _convert(entry) {
  var obj = {
    dn: entry.dn.toString(),
    controls: []
  };
  entry.attributes.forEach(function (a) {
    var item = a.buffers;
    if (item && item.length) {
      if (item.length > 1) {
        obj[a.type] = item.slice();
      } else {
        obj[a.type] = item[0];
      }
    } else {
      obj[a.type] = [];
    }
  });
  entry.controls.forEach(function (element, index, array) {
    obj.controls.push(element.json);
  });
  return obj;
}


function getAttributeValue(attributes, type) {
  const attributeObject = attributes.find(attr => attr.type === type);
  return attributeObject ? attributeObject.values[0] : null;
}


function fetchUserDetails(username) {
  const userDN = `uid=${username},ou=Users,dc=example,dc=com`;

  return new Promise((resolve, reject) => {
    const opts = {
      filter: `(uid=${username})`,
      scope: 'sub',
      attributes: ['jpegPhoto', 'cn', 'departmentNumber']
    };

    client.search(userDN, opts, function(err, res) {
      if (err) {
        console.error("LDAP search error:", err);
        reject(err);
        return;
      }

      res.on('searchEntry', function(entry) {
        const convertedEntry = _convert(entry);
        
        console.log("Converted Attributes:", convertedEntry);
      
        if (!convertedEntry || !convertedEntry.jpegPhoto) {
            console.error("jpegPhoto is missing in the converted attributes");
            reject(new Error("Unexpected LDAP response format"));
            return;
        }
      
        const cnValue = convertedEntry.cn;
        const photoBuffer = convertedEntry.jpegPhoto;
        const departmentNumberValue = convertedEntry.departmentNumber ? convertedEntry.departmentNumber.toString('utf8') : null;

      
        if (photoBuffer) {
            console.log("Tipo de dados de jpegPhoto:", typeof photoBuffer);
            console.log("Tamanho de jpegPhoto:", photoBuffer.length);
            console.log(Buffer.isBuffer(photoBuffer)); // Deve imprimir 'true' se for um Buffer.
        }

        resolve({ cn: cnValue, jpegPhoto: photoBuffer, departmentNumber: departmentNumberValue });
      });
      
      res.on('error', function(err) {
        console.error("LDAP search result error:", err);
        reject(err);
      });
    });
  });
}

function listAllUsers() {
  return new Promise((resolve, reject) => {
    const baseDN = 'ou=Users,dc=example,dc=com';
    const searchOptions = {
      scope: 'sub', 
      filter: '(objectClass=person)',
      attributes: ['cn', 'departmentNumber', 'jpegPhoto']
    };

    client.search(baseDN, searchOptions, (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      const users = [];

      res.on('searchEntry', (entry) => {
        const convertedEntry = _convert(entry);

        // Extraia os atributos necessários e converta Buffers para strings ou base64
        const userData = {
          cn: convertedEntry.cn.toString('utf8'),
          departmentNumber: convertedEntry.departmentNumber.toString('utf8'),
          jpegPhoto: convertedEntry.jpegPhoto ? convertedEntry.jpegPhoto.toString('base64') : null
        };

        users.push(userData);
      });

      res.on('error', (err) => {
        reject(err);
      });

      res.on('end', (result) => {
        resolve(users);
      });
    });
  });
}


app.get("/users", async (req, res) => {
  try {
    // Verificar autenticação e se o usuário é admin
    // (você pode fazer isso usando middleware ou dentro desta função)

    const users = await listAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});






  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Autenticação LDAP
      await authenticateDN(username, password);
  
      // Buscar detalhes do utilizador
      const userDetails = await fetchUserDetails(username);

      const tokenPayload = {
        username,
        departmentNumber: userDetails.departmentNumber
      };
  
      // Se a autenticação for bem-sucedida, gerar um token JWT
      const token = jwt.sign(tokenPayload, "segredo_jwt", { expiresIn: "10m" });

      const usernameString = userDetails.cn;
      console.log('CN:', userDetails.cn);

      const departmentNumber = userDetails.departmentNumber;
      console.log('departmentNumber:', userDetails.departmentNumber);

  
      let base64Photo = null;
  
      // Verifique se jpegPhoto é um Buffer
      if (Buffer.isBuffer(userDetails.jpegPhoto)) {
        base64Photo = userDetails.jpegPhoto.toString("base64");
      } else {
        console.error("jpegPhoto não é um Buffer:", typeof userDetails.jpegPhoto);
      }
  
      res.status(200).json({
        message: "Authentication successful",
        token,
        photo: base64Photo,
        username: usernameString,
        department: departmentNumber
      });
    } catch (err) {
      console.error("Error:", err.message);
      res.status(401).json({ message: "Authentication failed" });
    }
  });

  app.post("/verify-token", (req, res) => {
    const { token } = req.body;
  
    try {
      const decoded = jwt.verify(token, 'segredo_jwt');
      console.log(decoded);
      // Verificar se o token foi emitido pelo backend
      // Aqui você pode fazer mais verificações, como verificar o nome de usuário ou outras informações
      if (decoded) {
        res.status(200).json({ valid: true });
      } else {
        res.status(200).json({ valid: false });
      }
    } catch (err) {
      res.status(200).json({ valid: false });
    }
  });
  




//authenticateDN("uid=tesla,dc=example,dc=com", "password");


// Rota de login
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const ldapOpts = {
//     filter: "uid=tesla",
//     scope: "sub"
//   };

//   const userDN = `uid=tesla,dc=example,dc=com`;

//   ldapClient.bind(userDN, password, (err) => {
//     if (err) {
//       console.error("LDAP bind error:", err);
//       return res.status(401).json({ message: "Authentication failed" });
//     }

//     ldapClient.search("dc=example,dc=com", ldapOpts, (err, result) => {
//       // Verifique se a pesquisa falhou
//       if (err) {
//         console.error("LDAP search error:", err);
//         return res.status(401).json({ message: "Authentication failed" });
//       }

//       result.on("searchEntry", (entry) => {
//         // Autenticação bem-sucedida, faça algo com os dados do usuário, se necessário
//         console.log("Authenticated user:", entry.object);
//         res.status(200).json({ message: "Authentication successful" });
//       });

//       result.on("error", (err) => {
//         console.error("LDAP search result error:", err);
//         return res.status(401).json({ message: "Authentication failed" });
//       });
//     });
//   });
// });


const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/tabelacriar.routes")(app);
require("./app/routes/escolher.tabelas")(app);
require("./app/routes/editar.formularios")(app);
require("./app/routes/preencher.formulario")(app);
require("./app/routes/listarPP")(app);
require("./app/routes/renderizarPP")(app);
require("./app/routes/listar.seguimentos")(app);
require("./app/routes/maquinas.crud")(app);
require("./app/routes/detalhesSeg")(app);
require("./app/routes/listarPPForm")(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
