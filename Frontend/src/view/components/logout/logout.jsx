import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styless.css';




const LogoutButton = ({ onLogout }) => {
    const handleLogoutClick = () => {
        // Limpar o localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userPhoto");
        localStorage.removeItem("username");
        
        // Executar qualquer outra lógica passada como prop (por exemplo, redirecionar para a página de login)
        onLogout();
    };

    return (
      <button
        type="button"
        onClick={handleLogoutClick}
        className="exit-btn"
      >
        Logout
        <i className="bi bi-box-arrow-left"></i>
      </button>



    );    
};

export default LogoutButton;
