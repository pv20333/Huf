import { lazy } from "react";
import { BrowserRouter } from 'react-router-dom';

const PagesRoutes = [
  // PAGES
  {
    path: "/pages/login",
    component: lazy(() => import("../../view/pages/login/index")),
    layout: "FullLayout",
  },
  {
    path: "/pages/odata",
    component: lazy(() => import("../../view/pages/Odatatestes/index")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/parametrospadrao/formulario/criarformulario",
    component: lazy(() => import("../../view/pages/parametros-padrao/parametros-form/criar-parametros-form/index")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/parametrospadrao/formulario",
    component: lazy(() => import("../../view/pages/parametros-padrao/parametros-form/index")),
    layout: "VerticalLayout",
  },

  {
    path: "/pages/parametrospadrao/detalhes/:n_ParametroPadrao",
    component: lazy(() => import("../../view/pages/parametros-padrao/parametros-form/PPdetalhes")),
    layout: "VerticalLayout",
  },
  
  {
    path: "/pages/parametrospadrao",
    component: lazy(() => import("../../view/pages/parametros-padrao")),
    layout: "VerticalLayout",
  },
  
  {
    path: "/pages/maquinas",
    component: lazy(() => import("../../view/pages/maquinas")),
    layout: "VerticalLayout",
  },
  
  {
    path: "/pages/criarTabelas",
    component: lazy(() => import("../../view/pages/criarTabelas")),
    layout: "VerticalLayout",
  },

  {
    path: "/pages/criarFormularios",
    component: lazy(() => import("../../view/pages/criarFomularios")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/editarFormularios",
    component: lazy(() => import("../../view/pages/editarFormularios")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/preencher-PP",
    component: lazy(() => import("../../view/pages/preencher-PP")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/listarseguimentos",
    component: lazy(() => import("../../view/pages/seguimentos-pendentes")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/seguimentos/detalhes/:n_ParametroPadrao",
    component: lazy(() => import("../../view/pages/seguimentos-pendentes/seguimentos-detalhes")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/listarMP",
    component: lazy(() => import("../../view/pages/materia-prima")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/listarMoldes",
    component: lazy(() => import("../../view/pages/moldes")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/Colaboradores",
    component: lazy(() => import("../../view/pages/colaboradores")),
    layout: "VerticalLayout",
  },
  
  
];

export default PagesRoutes;