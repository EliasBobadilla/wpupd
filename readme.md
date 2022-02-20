# WPUPD!

This application downloads one image from a selected **provider** (like
WallHaven) and sets it as wallpaper.

The config values from search images are in \*`$HOME/.config/wpupd/config.json`\*\*

Example File:

```json
{
  "local": "~/pictures/wallpapers",
  "system": "gnome",
  "provider": "wallhaven",
  "misc": {
    "resolution": [1600, 900],
    "ratios": [16, 9],
    "topic": "Code Geass",
    "sfw": false,
    "color": "FFA500"
  }
}
```

## Config Values

- `local`: Where to download images
- `system`: It can be `gnome`,`windows` or `feh`
- `provider`: It can be `wallhaven` or `unsplash`

Also, there is a **wpupd.log** file in the same directory with the app journal

## Installation

To be able to use it in your entire system you have to install globally:

```bash
npm i -g wpupd # yarn global add wpupd
```

### Usage

After install just run `wpupd`

### Licence

wpupd is licensed under the [MIT license](./LICENSE.md).
