# Gerador de Senhas Seguras

Um gerador de senhas web moderno e seguro, construído com tecnologias web padrão e focado em segurança criptográfica.

## 🔐 Sobre o Projeto

O Gerador de Senhas Seguras é uma ferramenta web que permite criar senhas fortes e personalizáveis usando a Web Crypto API para garantir aleatoriedade criptográfica. A aplicação foi projetada com foco em segurança, usabilidade e acessibilidade.

## ✨ Funcionalidades

### Principais
- **Comprimento Personalizável**: Gere senhas de 8 a 128 caracteres
- **Tipos de Caracteres**: Escolha entre maiúsculas, minúsculas, números e símbolos
- **Exclusão Inteligente**: Opção para excluir caracteres visualmente similares (0/O, 1/l, etc.)
- **Múltiplas Senhas**: Gere até 10 senhas de uma vez
- **Cópia Rápida**: Copie senhas para a área de transferência com um clique
- **Avaliação de Força**: Feedback visual sobre a segurança da senha gerada

### Técnicas
- **Geração Criptográfica**: Usa Web Crypto API para verdadeira aleatoriedade
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- **Sem Dependências**: JavaScript puro, sem frameworks externos
- **Modo Escuro**: Suporte nativo para tema escuro
- **Acessível**: Compatível com leitores de tela e navegação por teclado

## 🚀 Como Usar

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/passwords-generator.git
   cd passwords-generator
   ```

2. Instale as dependências do Node.js para o servidor local:
   ```bash
   npm install express
   ```

3. Para iniciar o servidor local (Node.js + Express):
   ```bash
   ./start-local-server.sh
   ```

4. Abra o navegador e acesse:
   ```
   http://localhost:8000
   ```

5. (Opcional) Para desenvolvimento com live reload, instale nodemon globalmente:
   ```bash
   npm install -g nodemon
   ```
   E rode o servidor com:
   ```bash
   nodemon server.js
   ```

---

## 🏗️ Documentação do Projeto

### Estrutura do Projeto
- `index.html`: Página principal da aplicação web.
- `assets/`: Contém os arquivos estáticos, como CSS e JavaScript.
- `server.js`: Servidor Node.js usando Express para servir os arquivos estáticos.
- `start-local-server.sh`: Script para iniciar o servidor local Node.js.
- `tests/`: Contém os testes automatizados para o projeto.
- `jest.config.js` e `jest.setup.js`: Configurações do Jest para testes.

### Como Funciona o Servidor
O servidor é implementado em `server.js` usando o framework Express. Ele serve os arquivos estáticos da raiz do projeto na porta 8000. O script `start-local-server.sh` inicia o servidor Node.js, substituindo o servidor Python anterior.

### Testes Automatizados
- Os testes são escritos usando Jest e Supertest.
- O arquivo `tests/server.test.js` contém testes para o servidor, verificando:
  - Resposta na rota raiz (`/`) com status 200.
  - Servir arquivos estáticos, como `index.html`.
  - Retornar erro 404 para arquivos inexistentes.
- Outros testes cobrem a lógica do gerador de senhas e funcionalidades front-end.
- Para rodar os testes, use o comando:
  ```bash
  npx jest --coverage
  ```
- Foi necessário adicionar polyfills no arquivo `jest.setup.js` para suportar APIs como `TextEncoder` e `setImmediate` no ambiente de teste.

### Como Rodar o Projeto
1. Instale as dependências Node.js:
   ```bash
   npm install express
   ```
2. Inicie o servidor local:
   ```bash
   ./start-local-server.sh
   ```
3. Acesse no navegador:
   ```
   http://localhost:8000
   ```
4. Para desenvolvimento com live reload, instale nodemon globalmente e rode:
   ```bash
   npm install -g nodemon
   nodemon server.js
   ```

---

Se precisar de mais alguma coisa, estou à disposição.
   ./start-local-server.sh

---

## 🛠️ Documentação do Projeto

### Estrutura do Projeto
- `index.html`: Página principal da aplicação web.
- `assets/css/`: Contém os arquivos de estilos CSS.
- `assets/js/`: Contém os scripts JavaScript para funcionalidades do gerador de senhas, verificação de força, clipboard, etc.
- `server.js`: Servidor Node.js usando Express para servir os arquivos estáticos da aplicação.
- `start-local-server.sh`: Script para iniciar o servidor local Node.js.
- `tests/`: Contém os testes automatizados escritos com Jest para as funcionalidades do projeto.

### Como Funciona o Servidor
- O servidor é implementado em `server.js` usando o framework Express.
- Serve os arquivos estáticos da raiz do projeto, permitindo acessar a aplicação via navegador em `http://localhost:8000`.
- Inclui um middleware para log simples das requisições HTTP.
- O script `start-local-server.sh` verifica se o Node.js está instalado e executa o servidor.
- Para desenvolvimento, pode-se usar `nodemon` para live reload automático.

### Testes Automatizados
- Os testes são escritos usando Jest e estão localizados na pasta `tests/`.
- Para o servidor, os testes em `tests/server.test.js` verificam:
  - Resposta na rota raiz (`/`) com status 200.
  - Servir arquivos estáticos, como `index.html`.
  - Retornar erro 404 para arquivos inexistentes.
- Para o front-end e lógica do gerador de senhas, há testes específicos cobrindo geração, força da senha, clipboard, etc.
- O ambiente de testes foi configurado para suportar APIs Web como `TextEncoder` e `setImmediate` para evitar erros durante os testes.
- Para rodar os testes, use o comando:
  ```bash
  npx jest --coverage
  ```

### Observações
- O teste para arquivo inexistente no servidor teve um problema com `setImmediate` no ambiente de teste, que foi contornado com um polyfill no arquivo `jest.setup.js`.

---

2. Abra o arquivo `index.html` em seu navegador:
   ```bash
   # No Linux/Mac
   open index.html
   
   # No Windows
   start index.html
   ```

### Uso Básico
1. Ajuste o comprimento da senha usando o slider
2. Selecione os tipos de caracteres desejados
3. (Opcional) Ative a exclusão de caracteres similares
4. Clique em "Gerar Senha"
5. Copie a senha gerada clicando no ícone de clipboard

## 🛡️ Segurança

### Práticas Implementadas
- **Web Crypto API**: Geração criptograficamente segura
- **Sem Armazenamento**: Senhas não são salvas localmente
- **Sem Rede**: Funciona 100% offline, sem envio de dados
- **CSP Headers**: Content Security Policy implementada
- **Código Auditável**: Todo código é open source e revisável

### Avaliação de Força
A ferramenta calcula a força da senha baseada em:
- Comprimento total
- Variedade de caracteres utilizados
- Entropia estimada
- Padrões comuns evitados

## 🏗️ Arquitetura

Para detalhes técnicos sobre a arquitetura do projeto, consulte [ARCHITECTURE.md](ARCHITECTURE.md).

### Estrutura Simplificada
```
passwords-generator/
├── index.html          # Página principal
├── assets/
│   ├── css/           # Estilos
│   └── js/            # Lógica JavaScript
└── tests/             # Testes unitários
```

## 💻 Requisitos

### Navegadores Suportados
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### APIs Necessárias
- Web Crypto API
- Clipboard API
- ES6 Modules

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes
- Mantenha o código limpo e documentado
- Adicione testes para novas funcionalidades
- Siga os padrões de código estabelecidos
- Atualize a documentação conforme necessário

## 📝 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) pela geração segura
- [OWASP](https://owasp.org/) pelas diretrizes de segurança
- Comunidade open source pelos padrões e boas práticas


---

**Nota**: Este é um projeto educacional focado em demonstrar boas práticas de segurança em aplicações web. Para uso em produção, considere utilizar gerenciadores de senha estabelecidos.