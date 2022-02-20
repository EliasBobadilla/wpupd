import { join, basename } from "path";
import { existsSync, promises } from "fs";
import { homedir, platform } from "os";

import fetch from "node-fetch";

/**
 * Method to fix Windows path with double \
 *
 * @param {string} path
 * @returns {string} Fixed path for Windows
 */
export function fixWindowsPath(path) {
  return path.replace(/\\/g, "\\\\");
}

/**
 * Method to create default config file
 * @returns {Promise<string>}
 */
export async function getConfigFile() {
  const filePath = join(homedir(), ".config", "wpupd", "config.json");

  if (existsSync(filePath)) return filePath;

  const downloadPath = join(homedir(), "Downloads");
  const isWindows = platform().includes("win");

  const defaultConfig = `
{
  "local": "${isWindows ? fixWindowsPath(downloadPath) : downloadPath}",
  "system": "${isWindows ? "windows" : "gnome"}",
  "provider": "wallhaven",
  "misc": {
    "resolution": [1600, 900],
    "ratios": [16, 9],
    "topic": "code geass",
    "sfw": true,
    "color": "#FFA500"
  }
}
  `;

  await promises.writeFile(filePath, defaultConfig);
  return filePath;
}

/**
 * Method to get config info as json
 * @returns {Promise<object>}
 */
export async function getConfig() {
  const configFilePath = await getConfigFile();
  const config = await promises.readFile(configFilePath, "utf8");
  const json = JSON.parse(config);
  const { local, system, provider } = json;
  if (!local || !system || !provider) {
    throw new Error(`Invalid config file, check ${configFilePath}`);
  }
  return json;
}

/**
 * Method to download one image from url and save it in local path
 * @param {string} url image uri
 * @param {string} local local path
 * @returns {Promise<string>} image path
 */
export async function getImage(url, local) {
  const filePath = join(local, basename(url));

  const response = await fetch(url);

  const contentType = response.headers.get("Content-Type");

  if (!contentType.includes("image")) {
    throw new Error(`Error downloading file from ${url}`);
  }

  await promises.writeFile(filePath, await response.buffer());

  return filePath;
}
