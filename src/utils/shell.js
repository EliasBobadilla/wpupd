const shell = require("util").promisify(require("child_process").exec);

function getCommand(system) {
  switch (system) {
    case "feh":
      return "feh --bg-fill";
    default:
      return "gsettings set org.gnome.desktop.background picture-uri";
  }
}

const run = (system, path) => shell(`${getCommand(system)} ${path}`);

module.exports = run;
