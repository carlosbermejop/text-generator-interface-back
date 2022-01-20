import express from "express";
import { setupEnvVariables } from "./config/setup.js";

export const greeting = (req, res) => {
  res.send(req?.params?.user ? `Hello ${req.params.user}!` : "Hello World!");
};

export const checkHealth = (req, res) => {
  res.json({
    message: "Server OK",
  });
};

/* istanbul ignore next */
export const startServer = () => {
  setupEnvVariables();
  
  const port = process.env.PORT || 8080;

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  app.get("/", greeting);

  app.get("/greeting", greeting);

  app.get("/greeting/:user", greeting);

  app.get("/health", checkHealth);
};
