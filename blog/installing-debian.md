---
title: Installing debian, again!
description: It was ignorance of me not documenting this process the last time, so I do it this time
tags:
    - technology
date: "2022-10-07"
---

<salaadas-hero ai='Stable Diffusion' prompt='aang, standing on mountain, looking at the sun, red sun, sunset, trending on artstation, uhd, 8k' file='aang'></salaadas-hero>

## Foreword

This guide is designed for myself in the future (main reason why I wrote this), and you (the lovely reader you are scrolling through this).

Because of this, the way I set up debian or GNU/Linux could be at odds with your personal style. But if you like, then read through to know the way I set up mine.

## Solutions to some problems I encountered along the way

You probably feel frustrated during the process, so did I. This section is primary for quick lookups when intstalling debian.

If you haven't installed debian yet, feel free to skip this part.

- Network after installation for those who installed a minimal system:
https://unix.stackexchange.com/questions/430717/how-to-use-apt-to-install-specific-packages-from-within-debian-installer

- Installing missing firmwares (thank god I found this): https://forums.debian.net/viewtopic.php?t=129781
- Setting up i3 and such: https://andjey.info/debian-10-install-and-configure-i3wm/
- config for i3 (mine takes heavy inspiration from this): https://github.com/jvscholz/dotfiles/blob/master/config
- config for the rest (emacs, vim, i3status, urxvt, ...): https://github.com/rexim/dotfiles

Here are the programs I use the most on my computer:
- emacs: my main text editor
- vim: another editor I use
- astyle: for indenting C/C++ files in emacs
- urxvt: terminal emulator of my choice
- gcc/g++: compiler (there are a few others, such as nim, fpc for pascal, python3, node, ...), it really depends on the language(s) you work with
- git: version control system I use
- chromium: browser
- thunar: file browser
- i3statusbar: status bar
- i3: tiling window manager
- scrot/flameshot: screenshoting
- mypaint, krita: for drawing and visualizing when studying
- mupdf: light, fast, and simple pdf viewer

## Debian installation in brief

1. Download the ISO from [debian official site](https://www.debian.org/).
2. Use tool(s) like [balena etcher](https://www.balena.io/) to burn the ISO to the usb thumbdrive.
3. Attach the usb to your computer and change the boot order so that you are booting from the usb drive, not the internal storage.
4. Follow the graphical installation guide. You will more than likely come across problems during this process so be sure to stay calm and open-minded as it could get tough.
5. Well done, now install the additional programs and config it accordingly.

In general, the hardest part is `4`, if you can finish that part, welcome to the world of Unix as you have experience the core philosophy of this operating system: the do it yourself part.

## Stay calm

My first time installing debian was not smooth. I tried to installed it before using a virtual machine on a laptop running Windows. The process was amazing, but not when you do it for real. Welcoming me was not an installed and ready to use system but tons of missing drivers and no internet connection. I was so annoyed in fact, that I postponed re-installing it for a week. When coming back with a fresh mindset, tackling problems is still tedious, however, I was more open to solving it rather than turning away.

My advice for those interested in installing debian (I can't speak of other OSes as I have only tried one) is that be ready for the challenges that you will face, they are hard, but doable, so long you willing to continue.
