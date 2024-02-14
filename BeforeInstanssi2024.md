# How to prepare for the LMAD1 workshop at Instanssi 2024

Most participants are Finns, but they'll do fine with English instructions, I'm
sure. We're inclusive, and gladly accept international participants, of course.

## What you do not need

What you do **not need** to do:

- You don't need to fork, clone, or download this library. A snapshot "starter
  package" will be provided at the event. Using this development version at the
  event would be counter-productive.

- You don't need to take a preparatory programming course or worry about knowing
  how to program or do graphics. We'll learn as we do stuff at the event.

- You don't have to practice with the library... Perhaps better not to. I might
  have a couple of hours time right before the workshop which could revamp
  anything or everything in the library - for the better, of course, but it
  might confuse you if you had done a lot of work on the current one.

## What you absolutely need

What you **absolutely need**:

- You need **your own laptop** and power supply to participate. Go shop if
  necessary. It doesn't need to be super powerful - a very basic or refurbished
  used laptop will do just fine.

- Your laptop needs **free system space for tools** even if you don't
  install anything beforehand. It is not fun to spend the workshop time just
  figuring out what to delete in order to make space for tools.

- You need **headphones** (any kind will do). There will be many participants
  previewing their demos each with their own audio track - no, we don't want to
  hear them all at once from loudspeakers at the workshop area!

## What would really help

What you **should do** if you have the time:

- Download and **install the larger platforms** and tools that are required: see
  the list and short notes below for your laptop. We'll do this at the event
  before going forward, but there is a lot to download and the wireless network
  at the workshop area might not be set up yet when we start. The more people
  have installed beforehand, the less time we need to spend downloading at the
  party!

  + On **Windows** you first need: Windows subsystem for linux (WSL). The
    default Ubuntu distribution for WSL seems to be fine. Follow the official
    installation instructions carefully and make sure you have a normal user
    account and not use only a super-user / root account on WSL. Instead, use
    'sudo' commands when doing maintenance inside your WSL.

    The following guide seems useful:
    https://learn.microsoft.com/en-us/windows/wsl/install

    Then, for the rest of this story and the workshop, you will be using WSL
    which is essentially Linux.

  + On **Mac** you may or may not end up needing Homebrew and GNU toolset. I'll
    have more information when I see somebody using a Mac at the workshop. We'll
    figure it out, no worries.

  + On all systems (WSL, Linux, Mac) you need: GNU Software development tools
    (at least GNU make, bash, sed), Java run-time environment, ruby

  + Would be helpful: zopfli

  + Could be needed: Chrome browser (the only browser I can verify to
    work with my codes today because that's the one I normally use)

  + Probably some small things that I forgot here, but the above are the most
    massive downloads that have been a bit of a nuisance on earlier workshop
    start evenings

  Software installations can be tricky - don't worry if it doesn't work on the
  first try. If you don't find installation help before the workshop, we'll try
  to install everything together when we start.

## Further preparations for a smoother experience

What you **can do** to make things go even smoother:

- **Plan a concept** for your entry: What kind of idea or mood would you like to
  aim for? What is the main idea you want your audience to grasp? **Mentally
  prepare to let go** of lots of details or execute your concept in a different
  way than could be done in dreams! This workshop deliberately brings tough
  constraints to visual elements, and we only have a couple of days and nights
  to make your concept live.

  Examples:

  + [Demoilijan Käsikirja (PDF, In finnish)](https://www.postimuseo.fi/wp-content/uploads/2023/08/demoilijan_kasikirja_0623_A5_N.pdf)
    is a general newcomer guide to demoscene. In a short workshop, it is best to
    aim at one scene (20-40 seconds) in which a story can be told by putting
    together quite simple graphical elements. Start with the idea / mood /
    story. I promise **we can get creative** with the implementation using just
    cubes and spheres.

  + My own [design documents](http://users.jyu.fi/~nieminen/juttuja/pasilawoods_design_papers.jpg)
    for my latest 1k intro. The main idea is on the topmost paper with a
    storyboard, timeline, and enough visual detail to carry out.

  + My own [design documents](http://users.jyu.fi/~nieminen/courselogo_plan.jpg)
    for the 4k intro that was an intro to an intro course in graphics and later
    became this workshop. The course logo was a main 'asset' that needed careful
    thought. Underneath there is once again a paper with a timeline or 'sync
    track'.

  Ideas happen in your mind. I recommend putting them on paper first. When we
  later go to the computer, the paper helps us to not lose focus on the ideas.

- **Create a preliminary soundtrack** using [SoundBox](https://sb.bitsnbites.eu),
  or have a musical friend do one for you. Save often as URL. **Do not**
  use any recognizable melodies or pieces
  from any copyrighted songs! It is safest to just do your own, completely
  original soundtrack.

  SoundBox must be used because the lmad1 library is wired to use it as the
  sound engine.
  
  **Mentally prepare to let go** of parts and instruments also
  in the soundtrack. Two reasons: To keep the final demo interesting with
  graphics, its running length might have to be reduced. To be able to
  participate in the 4k competition category, there is a hard trade-off between
  graphics content and audio content. They must both suffer to make an entry in
  4k. The song doesn't have to be very long or sophisticated - we're here to
  have fun. Just press some of the white keys in sequence, it's fine...

  **TODO (if I have time):** Link to some tutorial about SoundBox.. I think
  it needs a few pointers to get a newbie tracking successfully without
  frustration..

- **Check out earlier productions** that have been created at the workshop, so
  you'll know what to expect, more or less. You may contrast these to high-end
  4k intros by experienced programmers using their mad skills and more elaborate
  tools than my simple library. We can't suddenly become pros at a new thing.
  This workshop is for your very first step towards demo programming, so you'll
  start with simple things that you can master. Crawl before you walk or run, so
  to speak... That said, you are allowed to do more elaborate stuff at the
  workshop and possibly get help for what you try to accomplish -- but always
  with lesser priority than first-timers using the lmad1 library!

  Direct links to videos of some earlier lmad1-productions in Instanssi streams (mind your ears and speakers - audio tracks make some unpleasant surprises here):

  + Entries from 2 to 7 at Instanssi 2023 were made in the workshop: [Full compo
    stream in YouTube](https://www.youtube.com/watch?v=bu7VoU3IrAU)

  + Instanssi 2020 had numerous workshop productions, too: [YouTube](https://www.youtube.com/watch?v=iBWlcQw-EYc)

  Further examples of very creative ideas with limited number of elements, many executed during a 3-day party workshop:
  
  + Assembly Summer 2019 One Scene compo: [YouTube](https://www.youtube.com/watch?v=3ciW4HLmYCc)

Looking forward to Instanssi 2024 and this year's workshop,

Paavo "The Old Dude" Nieminen
