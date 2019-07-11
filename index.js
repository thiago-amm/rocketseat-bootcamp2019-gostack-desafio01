const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: []
  }
];

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
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(proj => proj.id === id);
  project.title = title;
  return res.json(project);
});

server.listen(3000);
