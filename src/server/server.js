import express from "express";
import { setupEnvVariables } from "./config/setup.js";
import cors from "cors";

export const greeting = (req, res) => {
  res.send(req?.params?.user ? `Hello ${req.params.user}!` : "Hi stranger!");
};

export const checkHealth = (req, res) => {
  res.json({
    message: "Server OK",
  });
};

const whitelist = [
  "http://localhost:3000",
  "https://carlosbermejop.github.io",
];

/* istanbul ignore next */
export const startServer = () => {
  setupEnvVariables();

  const port = process.env.PORT || 8080;

  const app = express();

  app.use(cors({ origin: whitelist }));
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
