import Express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

const authorsRouter = Express.Router();

//in local path
// console.log(import.meta.url);
// console.log(fileURLToPath(import.meta.url));
// console.log(dirname(fileURLToPath(import.meta.url))); //completed path
const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);
console.log("TARGET:", authorsJSONPath); //use join not +, make sure the braces placement

//for different methods
authorsRouter.post("/", (req, res) => {
  console.log("Request body", req.body);
  //adding object to the array
  const newAuthors = {
    ...req.body,
    id: uniqid(),
  };

  res.send("Working?");
});

authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONPath);
  console.log("FILE CONTENT:", fileContent); // return random numbers
  console.log("FILE CONTENT:", JSON.parse(fileContent));
  const authorsArray = JSON.parse(fileContent);
  res.send(authorsArray);
});

authorsRouter.get("/:authorId", (req, res) => {
  res.send("Working?");
});

authorsRouter.put("/:authorId", (req, res) => {
  res.send("Working?");
});

authorsRouter.delete("/:authorId", (req, res) => {
  res.send("Working?");
});

export default authorsRouter;
