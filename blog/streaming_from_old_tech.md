---
title: How to use your old camera as a webcam
description: It's time to put my dusty MiniDV camcorder into good use!
tags:
    - old-tech
    - minidv
    - streaming
date: "2023-06-24"
---

<salaadas-hero ai='imgmagick' prompt='soyjak meme with video calling apps' file='video_calling'></salaadas-hero>

As 2022 rolls around, I began to ditch my imac in favour of my old hp running debian. I started to get requests to turn my camera on while video conferencing, or even calling my relatives. Up till now, I have been content with the built-in webcam: it looks grainy, blueish, and pixelated, which I'm a fan of. In this blog, I will document my process in making my setup even more absurd.

Rationale? Here are some of it:
- Matt Johnson's films, after watching some of his works, I was after the old look, especially the VHS/miniDV look of his films.
- And countless other japanese/russian old movies.
- Lastly, I wanted to put the old camcorder into good use.

My camera is the Panasonic PV GS65, and it also comprises a mini USB port. So naturally, I was thinking: Camcorder + mini USB + laptop = webcam?

There is one problem, however. My camcorder came out in a time when people still uses tapes as their main medium. And mini USB is only suitable for transferfing images. With video, you have to use Firewire cables (remember this thing?)

Realistically thinking, I wouldn't be able to get this old camcorder into recording my face right?

*Or is it*

There exists a very useful software called *gphoto2*. With it, you could control its supported cameras at your fingertips. *Magical, am I right?*. To find you if yours is supported, you simply do:

```
$ gphoto2 --list-cameras | grep "YOUR_CAMERA_NAME"

// You should try taking photos from the gphoto2 utility by:

$ gphoto2 --capture-image-and-download

// You would then hear the shutter activate and the image will be saved in the current directory
```

My camera was not supported, but out of curiosity, I tried:

```
$ gphoto2 --capture-movie
```

and it worked.

Unfortunately, this was not enought to turn it into a webcam. You apparently need to assigned it to **/dev/video0**.

## How to do it?

For me, I used **mpv, ffmpeg, and gphoto2** to facilitate the process.

Here's how I did:

```
$ gphoto2 --stdout --capture-movie | ffmpeg -i --vcodec rawvideo -pix_fmt yuv420p -f v4l2 /dev/video0
```

Explanation:

The output of **gphoto2** was done with **--stdout** and then piped to ffmpeg, where we decode it and outputs the whole thing to **/dev/video0**.

Now try to see your camera:

```
$ mpv --profile=low-latency --untimed /dev/video0
```

## After-thoughts

Here are some of my thoughts after finishing this. Some of them may be pertinent, while others may not be:

- It wastes electricity
- Privacy concerns
- Sometimes it is laggy
- Does not starts on boot-up (fixable, just don't have the urge to do it currently)

I think that is it for today's tutorial sessions. Expecting more to come in the future as I tinker around with more of my stuffs.
