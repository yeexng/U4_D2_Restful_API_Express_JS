import Express from "express"; //add to package.json
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./api/authors/index.js"; //remember to add index.js
import blogPostsRouter from "./api/blogPosts/index.js";

const server = Express();
const port = 3009;
server.use(Express.json()); // if don't add all req body will be undefined

server.use("/authors", authorsRouter); //here will be adding the middle-part of the url
server.use("/blogPosts", blogPostsRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server On port ${port}`);
});
