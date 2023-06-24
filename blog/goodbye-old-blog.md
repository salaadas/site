---
title: A coup de grâce to my old site
description: You served me well GatsbyJS, it's time for you to rest.
tags:
    - final blow
    - migration
date: "2023-06-11"
series: revamp
---

<salaadas-hero ai='Waifu Diffusion' prompt='pop art, landscape, snow, mountain, hiking, windy, hoodie, 1girl, walking up, sun, ambience, black hair' file='snow'></salaadas-hero>

*Sometimes, you just want some good ol' REST api with dynamic HTML*
-- React Developer

# Motif

I used to implement most of my webapps with React, delving into its core as a framework, and used to make my own version of React after reading OReilly's [Learning React](https://www.oreilly.com/library/view/learning-react/9781491954614/). It was an end-all-be-all, a panacea for all developers. Buzz words were including it; you see ReactJS vs *<insert-your-js-framework>* everywhere. I think everyone must have gone through that phase.

Truth be told, as I started to emerge myself deeper into the whole emulation scene and low-level stuff, I starts to appreciates web as its core more: Wasm, JS, HTML, and more. And REST Api doesn't sound half-bad to me. That's when I started to rewrite my own blog in ExpressJS/NestJS. They are essentially the same thing; however, I chose the latter since it has Typescript compatibility without much hassle. Another reason for me to make another blog is because GatsbyJS failed to load some images while I was making blogs. It was infuriating; even more so when the community told me to pick another framework rather than give some pointers. So I did; I switched.

# Hosting

Now, being virtually an api, the server needs somewhere to be hosted on. I went with [Adaptable.io](https://adaptable.io/) since it is free and requires no credit card. A bit of context here, Azure services promised not to charged any free upon registering, so I initially tried Azure. **Microsoft proceeds to charge me $1 right after I logged in**. Also, Azure integration with Git is a total joke, and I can't stand it.

The only gripe going with something free like Adaptable or its equivalent (AWS Lambda, *and other free-tier serverless services*) is that you would one way or another suffer from cold-starts. With the one I'm using, it takes around 10 seconds to load from cold. Welp, I have a solution for that!

I make my own cronjob pinging the site every 5 minutes, so you will always be serve something warm.

make a script somewhere, I chose to do it in my `/usr/local/bin/prevent_coldstart`

```shell
#!/bin/sh

curl -k https://thuctran.adaptable.app/
```

make it an executable

```shell
chmod +x /usr/local/bin/prevent_coldstart
```

that's it, you only need to add it to crontab and you are set

```shell
$ crontab -e
```

and then add this line to it

```shell
*/5 * * * * /usr/local/bin/prevent_coldstart
```

OR, you can run it and see it clears itself with

```shell
$ watch -n 300 /usr/local/bin/prevent_coldstart
```

# Features of the new blog

I have made some new changes to the site, so I will go through them briefly:

- 2 color themes for light and dark mode, dependant on your system theme.
- a tweets section, where I will post more informal content compare to blogs.
- resume, being auto-generated with [Typst](https://typst.app/).
- overall nicer UI.

what I'm thinking of implementing:

- VODS section, where I will post my streams and drumming sessions.
- schedule, for ease of mind.
- integration with my other projects (maybe some web games?).

And that's my first log of this new site, there are several more to come, especially when I implement something new. Stay tune!
