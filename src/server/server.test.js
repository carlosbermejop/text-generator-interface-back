import express from "express";
import { checkHealth, greeting } from "./server.js";

describe("Server - Basic unit tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a general greeting in the response when no name is provided", async () => {
    const req = {};

    const res = {
      text: "",
      send: function (input) {
        this.text = input;
      },
    };

    await greeting(req, res);
    expect(res.text).toBe("Hi stranger!");
  });

  it("should return a customized greeting in the response when called with a name", async () => {
    const req = {
      params: {
        user: "Carlos"
      }
    };

    const res = {
      text: "",
      send: function (input) {
        this.text = input;
      },
    };

    await greeting(req, res);
    expect(res.text).toBe("Hello Carlos!");
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
