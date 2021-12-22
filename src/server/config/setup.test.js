import { setupEnvVariables } from "./setup.js";
import dotenv from "dotenv";

describe("Setup - Basic functionality", () => {
  it("should read environment variables using dotenv", () => {
    const mockDotenvConfig = jest
      .spyOn(dotenv, "config")
      .mockImplementation(() => null);
    setupEnvVariables();
    expect(mockDotenvConfig).toHaveBeenCalled();
  });
});
