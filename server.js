const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware para log simples das requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Servir arquivos estáticos da raiz do projeto
app.use(express.static(path.join(__dirname)));

if (require.main === module) {
  // Iniciar o servidor apenas se o arquivo for executado diretamente
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
