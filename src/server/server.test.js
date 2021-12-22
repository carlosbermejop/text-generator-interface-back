import express from "express";
import { checkHealth, greeting } from "./server.js";

describe("Server - Basic unit tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a greeting in the response", async () => {
    const req = {};

    const res = {
      text: "",
      send: function (input) {
        this.text = input;
      },
    };

    await greeting(req, res);
    expect(res.text).toBe("Hello World!");
  });

  it("should return a health check message in the response", async () => {
    jest.spyOn(express, "json").mockImplementation(() => "Server OK");
    const req = {};

    const res = {
      text: "",
      json: function (input) {
        this.text = input;
      },
    };

    await checkHealth(req, res);
    expect(res.text).toEqual({ message: "Server OK" });
  });
});
