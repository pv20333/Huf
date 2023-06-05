import { lazy } from "react";
import { BrowserRouter } from 'react-router-dom';

const PagesRoutes = [
  // PAGES
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
    path: "/pages/testes",
    component: lazy(() => import("../../view/pages/testes")),
    layout: "VerticalLayout",
  },

  {
    path: "/pages/testes2",
    component: lazy(() => import("../../view/pages/testes2")),
    layout: "VerticalLayout",
  },
  {
    path: "/pages/testes3",
    component: lazy(() => import("../../view/pages/testes3")),
    layout: "VerticalLayout",
  },
  
];

export default PagesRoutes;