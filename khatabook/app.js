const { isUtf8 } = require("buffer");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      return res.render("index", { files });
    }
  });
});

app.get("/view/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("view", { data, filename: req.params.filename });
    }
  });
});

app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", { data, filename: req.params.filename });
    }
  });
});

app.post("/update/:filename", (req, res) => {
  fs.writeFile(`./files/${req.params.filename}`, req.body.filedata, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/delete/:filename", (req, res) => {
  fs.unlink(`./files/${req.params.filename}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/create/new", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const finalDate = `${day}-${month}-${year}.txt`;
  console.log(finalDate);
  fs.writeFile(`./files/${finalDate}`, req.body.filedata, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File is Successfully created");
      res.redirect("/");
    }
  });
});

app.listen(port, (req, res) => {
  console.log("listening on port 3000");
});
