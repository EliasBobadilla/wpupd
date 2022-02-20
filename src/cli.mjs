#!/usr/bin/env node

import log4js from "log4js";

import { homedir } from "os";
import { join } from "path";

import wpupd from "./wpupd.js";

const { configure, getLogger } = log4js;

configure({
  appenders: {
    file: {
      type: "file",
      filename: join(homedir(), ".config", "wpupd", "wpupd.log"),
    },
    console: { type: "console" },
  },
  categories: { default: { appenders: ["file", "console"], level: "ALL" } },
});

const logger = getLogger("default");

async function init() {
  try {
    const image = await wpupd();
    logger.info(`(^‿^)  ${image} was set as wallpaper`);
  } catch (error) {
    logger.error(error.message);
  }
}

init();
