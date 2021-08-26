# Wpupd!

This application downloads one image from a selected **provider** (like hallhaven) and sets it as wallpaper.

The config values from search images are in **~<user>/.config/wpupd/config.json**
File example:

    {
       "local":"/home/saile/pictures/wallpapers",
       "system":"gnome",
       "provider":"wallhaven",
       "misc":{
          "resolution":[
             1600,
             900
          ],
          "ratios":[
             16,
             9
          ],
          "topic":"candy",
          "sfw":false
       }
    }

Also, there is a **wpupd.log** file in the same directory with the app journal
