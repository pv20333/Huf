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
        searchUser();
        resolve();
      }
    });
  });
}

function searchUser() {
  var opts = {
        //filter: '(objectClass=*)',  //simple search
      //  filter: '(&(uid=2)(sn=John))',// and search
      filter: '(uid=Ana)',
      scope: 'sub',
      //attributes: ['cn']
  };

  client.search('ou=Users,dc=example,dc=com', opts, function (err, res) {
      if (err) {
          console.log("Error in search " + err)
      } else {
          res.on('searchEntry', function (entry) {
              console.log('entry: ' + JSON.stringify(entry.object));
          });
          res.on('searchReference', function (referral) {
              console.log('referral: ' + referral.uris.join());
          });
          res.on('error', function (err) {
              console.error('error: ' + err.message);
          });
          res.on('end', function (result) {
              console.log('status: ' + result.status);
          });
      }
  });
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Autenticação LDAP
    await authenticateDN(username, password);

    // Se a autenticação for bem-sucedida, gerar um token JWT
    // const token = jwt.sign({ username }, 'segredo_jwt', { expiresIn: '1h' });
    const token = jwt.sign({ username }, 'segredo_jwt', { expiresIn: '30s' });


    // Enviar a resposta com o token JWT
    res.status(200).json({ message: "Authentication successful", token });
  } catch (err) {
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


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
