const express = require("express");

// Criação do servidor HTTP.
const server = express();

// Definição do banco de dados transiente (em memória primária).
const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: []
  }
];

var totalRequisicoes = 0;

// Middlewares (filtros)

// Middlewares de escopo global.
server.use(express.json());

function contarRequisicoes(req, res, next) {
  ++totalRequisicoes;
  console.log(`Total de requisições: ${totalRequisicoes}`);
  return next();
}

server.use(contarRequisicoes);

// Middlewares de escopo local.
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  if (!project) {
    return res.status(400).json({ error: "Project does not exists!" });
  }
  return next();
}

// Cadastra um novo projeto.
server.post("/projects", (req, res) => {
  const project = req.body;
  projects.push(project);
  return res.json(projects);
});

// Lista todos os projetos cadastrados.
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Atualiza um projeto cadastrado.
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.title = title;
  return res.json(project);
});

// Exclui um projeto cadastrado.
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id === id);
  projects.splice(index, 1);
  return res.json(projects);
});

// Cadastra uma nova tarefa para um projeto.
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.tasks.push(title);
  return res.json(projects);
});

// Processo do servidor HTTP
// esperando por conexões na porta 3000.
server.listen(3000);
