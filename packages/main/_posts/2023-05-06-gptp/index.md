---
title: Revisiting GPTP - the Starcraft modding toolkit
---

One of the first PC games I played was Starcraft and the expansion Starcraft: Broodwar. We didn’t have a PC, so I had to play it on a friend’s computer, but I remember being immersed in the real-time strategy gameplay.

Later, I would get a PC and bought my own copy of Starcraft. This was years later, but the community for the game was still impressive. Joining one of the older Starcraft forums, I discovered “mods” for the game. The most popular ones were just graphical changes, but that concept of changing a game to display your own graphics was so interesting to me. I’m not sure how I stumbled on it, but I found [http://www.staredit.net/](http://www.staredit.net/) (yes, it’s still active!) and I learned that you could do so much more than just change the graphics of Starcraft with mods. There were people in the community working on hooking into existing Starcraft code to modify the gameplay and graphics using C++.

## Diving deep

In order to create these mods, we needed to know the hex address of different functions that Starcraft would call during them game. And to do anything meaningful, we also needed to know the structure of units and sprites and where those were stored as well. A lot of this base work required using tools like OllyDbg to analyze the assembly of the Starcraft executable, and ArtMoney for analyzing the memory of the game while it was executing.

I used OllyDbg to find what functions Starcraft would call during execution – from common functions like the game-loop, to highly specialized functions like checking supply limits. ArtMoney let us determine how structures like units were laid out – where each unit’s health was stored, how much damage each weapon would do, and more.

Most of this information was shared in forums, chat rooms, and a few disparate sites for looking up hex addresses. Of course, no write up about modding Starcraft is complete without mentioning all the work from ShadowFlare (check out [ShadowFlare’s realm](https://sfsrealm.hopto.org/) for all the work they did), the great people at Staredit.Net, and plenty of others who built amazing tools to work with Starcraft files. All these sites were amazing resources for figuring out file specs and working with the Starcraft engine.

However, each time I wanted to write a new mod or experiment with an idea, I’d have to look up all of this information across all of these sites.

## Bringing it together

The goal with GPTP (General Plugin Template Project), was to take all of this work that the amazing modding community had done and bring it together into a C++ Visual Studio project that could be copied for a new mod.

My initial idea was simple: take all of the code for injecting new function hooks into Starcraft and wrap it in some very friendly functions. When a modder would come in to create a new project, they would have three functions exposed to them to work with: gameStart, gameLoop, gameEnd (I don’t remember the exact names I gave them at the time).

I released the initial GPTP back in 2008-2009. This included the project setup for compiling and producing a QDP file that could be loaded into Starcraft. Additionally, it contained known structures and hex addresses that developers could use to build their mod. The Intellisense autocomplete feature really helped developers leverage these structures.

## The power of open source

I made the original version of GPTP back in high school, but I didn’t have time to continue to work on it when I went to university. I returned to the community a decade later, and found that not only was the community still alive and working on mods, but that they were using GPTP. At this point, GPTP was unrecognizable from my original work; the goal was the same, but the quality of the code was greatly improved and the number of hooks, known structures, and addresses was much more impressive.

You can view the project on Github: [general-plugin-template-project](https://github.com/SCMapsAndMods/general-plugin-template-project).

I’d like to thank open source for this sort of development. The amount of work that has been continually added onto this project couldn’t have been done without all the contributions from the community.

## Does it still work?

I recently went back to Starcraft modding as a fun little project. I wanted to hop in and see how easy or difficult it would be to create a mod in 2020.

One of the harder things to do in 2020 is find all the tools and initial setup for modding Starcraft. Some of the modding sites are down for good, and with them the knowledge they contained.

But, I pulled together the tools (thanks PyMS), pulled together tutorials and other instructions into a Notion document, and created my first Starcraft mod!

Gathering all the tools was the hard part. After that, it was actually very straightforward creating a new GPTP template and mod. All of the known structures and hooks are pretty self-explanatory and I was able to even add my own hooks once I found the hex addresses using OllyDbg.

## Looking forward

Starcraft modding is like an ancient art at this point. There isn’t a large audience for it, so in general, any new mod will be played by maybe 10 people. But to me, it’s a combination of nostalgia, hard work, tinkering, discovery, and creation that makes it so much fun. That feeling of finding a new function to hook onto, writing C++ code that injects itself into it, and then running the code in the Starcraft engine and seeing it work is a special kind of rewarding experience.

## Thanks

I’d like to give thanks to everyone who has ever contributed to the modding community for Starcraft. There are so many names that I couldn’t possibly name them all, but please check of [http://staredit.net](http://staredit.net) if any of this interests you.
