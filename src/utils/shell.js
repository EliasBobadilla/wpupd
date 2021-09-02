const shell = require("util").promisify(require("child_process").exec);
const os = require("os");

function getCommand(system, path) {
  switch (system) {
    case "feh":
      return `feh --bg-fill ${path}`;
    case "windows":
      return `reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d ${path};Start-Sleep -s 10; rundll32.exe user32.dll, UpdatePerUserSystemParameters, 0, $false`;
    default:
      return `gsettings set org.gnome.desktop.background picture-uri ${path}`;
  }
}

const run = (system, path) =>
  shell(getCommand(system, path), {
    shell: os.platform().includes("win") ? "powershell.exe" : "/bin/bash",
  });

module.exports = run;
