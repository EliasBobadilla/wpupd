import { exec } from "child_process";
import { platform } from "os";
import { promisify } from "util";

const shell = promisify(exec);

/**
 * Method to get custom command for shell
 * @param {string} system
 * @param {string} path
 * @returns {string} command for shell
 */
function getCommand(system, path) {
  switch (system) {
    case "feh":
      return `feh --bg-fill ${path}`;
    case "windows":
      return `powershell.exe -file ${__dirname}/windows.ps1 "${path}"`;
    case "gnome":
      return `gsettings set org.gnome.desktop.background picture-uri ${path}`;
    case "default":
      throw new Error("Bad Provider!");
  }
}

/**
 * Method to run a command in shell
 * @param {string} system
 * @param {string} path
 * @returns {Promise<string>}
 */
export const run = (system, path) => {
  shell(getCommand(system, path), {
    shell: platform().includes("win") ? "powershell.exe" : "/bin/bash",
  });
};
