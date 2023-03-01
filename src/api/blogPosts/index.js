import Express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";

const blogPostsRouter = Express.Router();
const blogPostsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogPosts.json"
);
const getBlogPosts = () => JSON.parse(fs.readFileSync(blogPostsJSONPath));
const writeBlogPosts = (blogPostsArray) =>
  fs.writeFileSync(blogPostsJSONPath, JSON.stringify(blogPostsArray));

blogPostsRouter.post("/", (req, res, next) => {
  const newBlogPost = {
    ...req.body,
    id: uniqid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const blogPostsArray = getBlogPosts();
  blogPostsArray.push(newBlogPost);
  writeBlogPosts(blogPostsArray);
  res.status(201).send({ id: newBlogPost.id });
});

blogPostsRouter.get("/", (req, res, next) => {
  const blogPosts = getBlogPosts();
  if (req.query && req.query.category) {
    const filteredBlogPosts = blogPosts.filter(
      (b) => b.category === req.query.category
    );
    res.send(filteredBlogPosts);
  } else {
    res.send(blogPosts);
  }
});

blogPostsRouter.get("/:blogPostIs");

export default blogPostsRouter;
