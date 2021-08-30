# Wpupd!

This application downloads one image from a selected **provider** (like Wallhaven)
and sets it as wallpaper.

The config values from search images are in **`$HOME/.config/wpupd/config.json`**

Example File:

```json
{
  "local": "/home/saile/pictures/wallpapers",
  "system": "gnome",
  "provider": "wallhaven",
  "misc": {
    "resolution": [1600, 900],
    "ratios": [16, 9],
    "topic": "candy",
    "sfw": false
  }
}
```

Also, there is a **wpupd.log** file in the same directory with the app journal

## Installation

To be able to use it in your entire system you have to install globally:

```bash
npm i -g @ebobadilla/wpupd
```

If you use yarn:

```bash
yarn global add @ebobadilla/wpupd
```

### Usage

After install just run `wpupd`

### Licence

wpupd is licensed under the [MIT license](./LICENSE.md)
