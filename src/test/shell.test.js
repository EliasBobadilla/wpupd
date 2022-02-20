import { join } from "path";
import { describe, before, it } from "mocha";
import { expect } from "chai";
import { getConfig } from "../utils/files";
import { run, getCommand } from "../utils/shell";

describe("Shell process", () => {
  let config;
  let testPath;
  before("get config", async () => {
    config = await getConfig();
    testPath = join(__dirname, "assets", "test.png");
  });

  it("get command for shell", () => {
    const command = getCommand(config.system, "Test");
    expect(command).to.not.have.lengthOf(0);
    expect(command).to.match(/feh|rundll32|gnome/);
  });

  it("set test wallpaper", () => {
    return run(config.system, testPath).then((result) => {
      const { stderr } = result;
      expect(stderr).to.have.lengthOf(0);
    });
  });
});
