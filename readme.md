# WPUPD!

Download one image from a **provider** (like
WallHaven) and set it as wallpaper.

Example Config File 👇

> `~/.config/wpupd/config.json`

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
- `system`: It can be `gnome`, `windows` or `feh`
- `provider`: It can be `wallhaven`

> By the moment `wallhaven` is the only provider accepted, but the API is really easy to extend, PR are welcome!

Also, there is a **wpupd.log** file in the same directory with the app journal 😆

## Installation

```bash
npm i -g wpupd # yarn global add wpupd
```

### Usage

```sh
wpupd
```

### Licence

wpupd is licensed under the [MIT license](./LICENSE.md).
