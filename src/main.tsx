import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.scss";
// import './styles/mixins.scss'
import {  HashRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <MainLayout>
        <App />
      </MainLayout>
    </HashRouter>
  </React.StrictMode>
);
