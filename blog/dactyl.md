---
title: Ergonomics? What about a keyboard?
description: Dear hackers! To future-proof ourselves from RSI, let's consider a keyboard.
tags:
    - ergonomics
    - keyboard
    - handwiring
    - 3d-printing
date: "2022-09-09"
---

<salaadas-hero ai='Stable Diffusion' prompt='mojave, island, noon, blue sky, rain' file='mojave'></salaadas-hero>

*You can check out the files here*

The quarantine period has led me to discover a new hobby: Mechanical Keyboards. It isn't just any keyboards, but those curvy and spaceship-resembled ones. Around the time I learned to touch-type properly, I started to developed an addiction to type on the site [monketype](https://monkeytype.com). Trust me.

Long story short, I was hooked when browsing around pictures in [r/ErgoMechKeyboards](https://www.reddit.com/r/ErgoMechKeyboards/top/?t=all) then longing to make one. I then caught up in a no-return journey of watching people typing and finding the best design.

I knew people could make keyboards for cheap with 3d-printed parts and do handwiring for the switches. And this puts me even deeper inside the rabbit-hole.

## Design

### 1. Must be unibody

<salaadas-img path='blog/dactyl/mib'></salaadas-img>

I was a fan of the Kinesis Advantage from the very start, especially the polarizing unibody with the curve keywells. Plus, it was featured in the original Man In Black series.

### 2. Must fit my hands (?)

<salaadas-img path='blog/dactyl/typing'></salaadas-img>

Everyone's hands are structured differently one way or another, and I want my keyboard to be personalized as much as possible to maximize comforts. With the help of design generators, I could quickly get the STLs for 2 halves of the Dactyl Manuform. Half of the way, right? I would only need to merge them together and I could get the case file to print.

[This](https://dactyl.mbugert.de/) was the generator I used. Since then, there has been many more tools to go with, so fiddle around and pick your poison.

## Adding the merge

Opening up our trutee Fusion 360, and after a bit of magic we get this:

<salaadas-img path='blog/dactyl/edge'></salaadas-img>

We also need to make the backplate, so here it is:

<salaadas-img path='blog/dactyl/bottom-1'></salaadas-img>

making the lip, then the bottom part:

<salaadas-img path='blog/dactyl/bottom-2'></salaadas-img>

don't forget the usb port!

<salaadas-img path='blog/dactyl/port'></salaadas-img>

...and that's it. Now the printing part!

## Printing

I don't own a 3D-printer unfortunately, so I had to go asked my neighbor to print it out. Thanks a bunch if you are reading this! He only had yellow PETG left so I decided to sand it and paint it grey to look more like an old keyboard.

Also, around this time I bought a set of japanese keycaps. Hiragana legends look nice.

<salaadas-img path='blog/dactyl/yellow'></salaadas-img>

Picture was taken after 3 hours of removing supports.

<salaadas-img path='blog/dactyl/keycaps'></salaadas-img>

Keycaps arrived in-person

I could only say that the sanding and painting part definitely did not take 2 days :). _How silly of me trying to fulfill this keyboard enthusiasm_

## Handwiring

To be updated, for now, you may want to check out [Masterzen's guide](https://www.masterzen.fr/2018/12/16/handwired-keyboard-build-log-part-1/) on how to do it. He goes really deep into explaining what matrices, qmk, and wiring techniques.

## Demo

Here is the end product, looks kinda neet:

<salaadas-img path='blog/dactyl/without-keycaps'></salaadas-img>
<salaadas-img path='blog/dactyl/real-port'></salaadas-img>

Additionally, I have hastily made 2 typing videos starring this creation and you can check them out here:

- <iframe width="600" height="400" src="https://www.youtube.com/embed/ynct2PkjRnI" title="one" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- <iframe width="600" height="400" src="https://www.youtube.com/embed/EorXOQtYoSk" title="one" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
