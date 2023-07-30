import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Adicione a URL completa do backend aqui
});


const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
};

export const isExpired = () => {
        const token = localStorage.getItem('token');
        if(token){
            const decodedJwt = parseJwt(token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                history.push('/login');
            }
       }
    

}

export const isExpiredBoolean = () => {
    const token = localStorage.getItem('token');
    if(token){
        try{
            const decodedJwt = parseJwt(token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                return true;
            }
            return false;
        }catch(e){
            return true;
        }
   }
   return true;
}

export const isNotExpiredBoolean = () => {
    const token = localStorage.getItem('token');
    if(token){
        try{
            const decodedJwt = parseJwt(token);
            if (decodedJwt.exp * 1000 >= Date.now()) {
                return true;
            }
            return false;
        }catch(e){
            return false;
        }
   }
   return false;
}

export const isNotExpired = () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if(token){
             try{
                const decodedJwt = parseJwt(token);
                if (decodedJwt.exp * 1000 >= Date.now()) {
                    console.log("Not expired")
                      //history.push('/dashboard');
                 }
             }catch(e){
                
             }
    
       }
    

}

export const validateToken = async () => {

    const response = await axiosInstance.post('/verify-token', {token: localStorage.getItem('token')});
    console.log("Validatoken: " + response.data.valid)
    const valid = response?.data?.valid;
    if(!valid){
        localStorage.removeItem('token');
        window.location.href = "/pages/login"
    }


    return response?.data?.valid;

    axiosInstance.post('/verify-token', { token: localStorage.getItem('token') })
    .then((response) => {
      if (response.data.valid) {
        history.push('/');
      } else {
        setError('Invalid token');
        localStorage.removeItem('token'); // Remover o token inválido do localStorage
      }
    })
    .catch((error) => {
      setError('Error occurred while verifying token');
      localStorage.removeItem('token'); // Remover o token inválido do localStorage
    });

}
