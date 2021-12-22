import express from "express";
import { setupEnvVariables } from "./config/setup.js";

export const greeting = (req, res) => {
  res.send("Hello World!");
};

export const checkHealth = (req, res) => {
  res.json({
    message: "Server OK",
  });
};

/* istanbul ignore next */
export const startServer = () => {
  const port = process.env.PORT || 8080;

  setupEnvVariables();

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  app.get("/", greeting);

  app.get("/health", checkHealth);
};
