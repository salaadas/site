---
title: I made another keyboard
description: Ever heard about the HHKB? It's too expensive so I made one myself
tags: ["keyboard", "part one"]
date: "2022-11-12"
---

<salaadas-img path='blog/my-own-hhkb/og-hhkb'></salaadas-img>

<em classname="img-caption">The Happy Hacking Keyboard -- also called HHKB -- with a whopping price tag of ~$210 USD for the base model</em>

## Motives

I started using Emacs a year ago and eversince then, I have never feel the need to switch to another editor. This could be my *Emacs addiction* but I'm sure there's a reason why people like Linus Torvalds/Richard Stallman/Mark Zuckerberg also use this piece of software.

<span classname="reader">But how is Emacs relatable to the keyboard you are making?</span>

If you haven't already known, Emacs is similar to Vim in that uses combinations of keys for various tasks like cutting, pasting texts, or even playing  Tetris (yes, you can do this). Additionally, the Emacs keybindings rely heavily on the `Ctrl` key; hence, many choose to switch up the position of it with the `Capslock` key. Having adopted this into my workflow since day 1 using Emacs, I can safely say the habit of hitting `Ctrl` to the left of my left pinkie has ingrained into my brain :))). Even when using Vim at times turns out to be difficult for me.

What makes the HHKB keyboard more special than ordinary ones is that it houses a *Unix* layout, take a look for yourself:

<salaadas-img path='blog/my-own-hhkb/unix-layout'></salaadas-img>

<em classname="img-caption">The Unix layout with 60 keys. Ctrl, Alt, Backspace placements have been changed for reachability</em>

The elegance and simplicity of the layout successfully captivate me. But I was taken aback when seeing how much they charge for one :(((.

Fortunately, my CAD skills have been growing stronger, enough for me to make my own **copy** of the original. And personally, I'm not sold by the whole Topre switch thing as I find typing on MX switches are not so bad compare to my old membrane keyboards (Yes, I like my Keytronic membrane keyboards more but paying above $200 for it is absurd).

## Actuarial planning 😰

For reference, prices will be listed in USD.

Here are the B.O.M (Build Of Material) and their finanical damage 💸:
- Plate: ~$17.00 for 5 pieces (minimum quantity for pcb ordering)
- Pcb: ~$15.00 for 5 pieces
- Backplate: Laser-cutted for $7.00 at a local shop
- Diodes 1N4148: 100 pieces for $0.8
- Arduino Pro Micro: for the keyboard's firmware, usually go for $8.00 where I live
- Switches: I chose Gateron Yellow because they are cheap at $0.16 per switch -> total = 0.16 * 65 = $10.4 (ordered 5 extra in case one breaks)
- Keycaps: You may choose any set that fits you best, and the price also varies (I picked mine up for $30.00, it was a nice one tho)
- Pcb mount stabilizers: make sure to get the correct type (pcb mount) with 7u spacebar wire, the stabilizer set is around $9.00
- M2 screws and standoffs: dirt cheap

That's it, mine was ~$95.00 at the end, but if you only take prices of 1 plate and pcb, the total would be ~$70.00 USD. So asking your friend to order with you could save up quite a bit.

## Making the Pcb and Plate

I followed [ruiqimao's guide](https://github.com/ruiqimao/keyboard-pcb-guide) for designing the pcb and plate. It has been extremely helpful during the prototyping stage. As he has described it so well, what I would recommend best is to read through his write-up and learn from there.

Additionally, if you are interested in designing one for yourself, the [wiki section](https://www.reddit.com/r/MechanicalKeyboards/wiki/customkeyboards/#wiki_making_a_pcb) on the r/Mechanicalkeyboards is pretty useful.

This project is also a gift for my brother, who loves watching anime. I have only watched a couple, but I think it would be nice to have some graphics on the pcb and plate for him to enjoy building his first keyboard more.

<salaadas-img path='blog/my-own-hhkb/kicad-pcb'></salaadas-img>

<em classname="img-caption">Pcb with Rei Ayanami from Neon Genesis Evangelion graphics. Beautiful, isn't she?</em>

<salaadas-img path='blog/my-own-hhkb/render-pcb'></salaadas-img>

<em classname="img-caption">"We'll do the rest when you get back."</em>

Now for the switch plate:

<salaadas-img path='blog/my-own-hhkb/kicad-plate'></salaadas-img>

<em classname="img-caption">I wanted to support multiple layouts like ISO enter, split left shift and full size backspace, ...; hence the wide cuts in some parts of the plate</em>

Overall, the hardest part is getting the pcb and plate done right. Everything else would be a breeze once these two things are finished.

Until I confirm that the final keyboard is working properly, I will update this section and include the link to the open-sourced files to the pcb and plate.

## Deciding on the miscellaneous

<salaadas-img path='blog/my-own-hhkb/gmk-heavy-industry'></salaadas-img>
<em classname="img-caption">Here is the set I went with this keyboard -- the GMK Heavy Industry</em>

*Tip: Don't get caught up so much in the keycaps,  as they are just for looks. What important is the switches; they make up the majority of your typing experience*

The switches I went with are the Gateron Yellows. At a very cheap price, they offer you a smooth travel and nice weighting for programming or prolonged typing sessions.

<salaadas-img path='blog/my-own-hhkb/gat'></salaadas-img>

<em classname="img-caption">Close up look of the switch</em>

That's it for the first part of building my HHKB's clone keyboard. I will do a follow-up post when the pcb and plate are deliverd to my house (probably 1-2 weeks). In the next post, I will go more in-depth into how you should build your own keyboard and flashing the firmware onto the Pro Micro MCU.
