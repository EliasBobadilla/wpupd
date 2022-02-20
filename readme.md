# WPUPD!

Set as Wallpaper an image from a **provider** (like
[WallHaven](https://wallhaven.cc) or [Unsplash](https://unsplash.com)).

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

### Installation

```bash
npm i -g wpupd # yarn global add wpupd
```

### Usage

```sh
wpupd
```

https://user-images.githubusercontent.com/71897736/154862672-88f54f66-59b6-41b8-be1e-47a9da2e8414.mp4

## Config Values

- `local`: Where to download images
- `system`: It can be `gnome`, `windows` or `feh`
- `provider`: `wallhaven`

> By the moment `wallhaven` is the only provider accepted, but the API is really
> easy to extend, PR are welcome!

Also, there is a **wpupd.log** file in the same directory with the app journal 😆

## Adding a Provider

You just need to a new file in [`providers/`](./src/providers/) 👀

Check the [Wallhaven configuration](./src/providers/wallhaven.js) file for reference,
but to resume, you just need to export a default class with an async `getWallpaper` method.

### Licence

wpupd is licensed under the [MIT license](./LICENSE.md).
