import express from "express";
import child_process from "child_process";
import fs from "fs";
import random from "rand-token";

const app = express();
app.use(express.json());

app.post("/repo/clone/", (req, res) => {
  // sacar estos datos del endpoint (template)
  const { username, password, repository, branch } = req.body;

  const folder = "healthcheck"; // sacar de cloudvalley.json
  const subFolder = random.uid(12);
  const directory = `${folder}/${subFolder}`;

  const url = new URL(repository);

  url.username = username;
  url.password = password;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  child_process.execSync(
    `git clone --branch ${branch} --single-branch ${url.href} ./${directory}`
  );

  // correr las reglas

  // eliminar el subdirectorio
  // fs.rmdir(directory, { recursive: true }, (res) => {
  //   console.log(subFolder, res);
  // });

  res.send("Repositorio clonado");
});

app.listen(3000, () => {
  console.log("App running at http://localhost:3000");
});
