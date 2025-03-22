import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log('main.jsx: Iniciando a aplicação');

try {
  console.log('main.jsx: Tentando renderizar o App');
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      {console.log('main.jsx: Dentro do StrictMode')}
      <App />
    </React.StrictMode>
  );
  console.log('main.jsx: Renderização iniciada com sucesso');
} catch (error) {
  console.error('main.jsx: Erro ao renderizar a aplicação:', error);
}