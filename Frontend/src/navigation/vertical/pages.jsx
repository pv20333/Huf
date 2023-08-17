import { Award } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

import { parseJwt } from '../../view/pages/login/token';



const ITPagesRoles = [
    {
        header: "Follow-ups",
    },
    {
        id: "Seguimentos",
        title: "Follow-ups",
        navLink: "/pages/listarSeguimentos",
    },
    {
        header: "List Tables",
    },
    {
        id: "Parametros Padrão",
        title: "Default Parameters",
        navLink: "/pages/ParametrosPadrao",
    },
    {
        id: "maquinas",
        title: "Machines",
        navLink: "/pages/Maquinas",
    },
    {
        id: "Materia Prima",
        title: "Raw Material",
        navLink: "/pages/listarMP",
    },
    {
        id: "Moldes",
        title: "Molds",
        navLink: "/pages/ListarMoldes",
    },
    {
        id: "Colaboradores",
        title: "Employees",
        navLink: "/pages/Colaboradores",
    },
    {
        header: "Builder",
    },
    {
        id: "Tabelas",
        title: "Tables",
        navLink: "/pages/criarTabelas",
    },
    {
        id: "Formularios",
        title: "Forms",
        navLink: "/pages/criarFormularios",
    },
    {
        id: "EditarFormularios",
        title: "Edit Forms",
        navLink: "/pages/editarFormularios",
    },
    
];

const QualityPagesRoles = [
    {
        header: "Follow-ups",
    },
    {
        id: "Seguimentos",
        title: "Follow-ups",
        navLink: "/pages/listarSeguimentos",
    },
    {
        header: "List Tables",
    },
    {
        id: "Parametros Padrão",
        title: "Default Parameters",
        navLink: "/pages/ParametrosPadrao",
    },
    {
        id: "maquinas",
        title: "Machines",
        navLink: "/pages/Maquinas",
    },
    {
        id: "Materia Prima",
        title: "Raw Material",
        navLink: "/pages/listarMP",
    },
    {
        id: "Moldes",
        title: "Molds",
        navLink: "/pages/ListarMoldes",
    },
];

const CollaboratorPagesRoles = [
    {
        header: "Follow-ups",
    },
    {
        id: "Seguimentos",
        title: "Follow-ups",
        navLink: "/pages/listarSeguimentos",
    },
    {
        header: "List Tables",
    },
    {
        id: "Parametros Padrão",
        title: "Default Parameters",
        navLink: "/pages/ParametrosPadrao",
    },
    {
        id: "maquinas",
        title: "Machines",
        navLink: "/pages/Maquinas",
    },
    {
        id: "Materia Prima",
        title: "Raw Material",
        navLink: "/pages/listarMP",
    },
    {
        id: "Moldes",
        title: "Molds",
        navLink: "/pages/ListarMoldes",
    },
];



function determinePagesBasedOnRole() {
    const token = localStorage.getItem('token');
    if (!token) return [];

    const decodedJwt = parseJwt(token);
    if (!decodedJwt || !decodedJwt.departmentNumber) return [];

    switch (decodedJwt.departmentNumber) {
        case 'IT':
            return ITPagesRoles;
        case 'Quality':
            return QualityPagesRoles;
        case 'Collaborator':
            return CollaboratorPagesRoles;
        default:
            return [];
    }
}

// Esta constante pode ser importada em outros componentes para obter as páginas do role atual
const pages = determinePagesBasedOnRole()
export default pages