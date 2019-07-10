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

server.listen(3000);
