# lmad1: "Let's Make a Demo 1.3" workshop base code

It is now official: There will be an instance of this workshop at Instanssi
2023, March 2-5! I'll try to find some spare time before that to make sure
everything still works as fine as it did already back in 2020.

This is a twisted and obscure piece of code, yes. It was my first
attempt at creating a JavaScript library (of any kind...) with the
intention of it being used in the production of very small
browser-executable files called "intros" in the demoscene parlance.

I am trying to make it very simple and easy for total beginners to
*use* this library to make some simple and creative 3D graphics and
participate in a 4k intro competition with their own entries.

This is a work-in-progress that surfaced in March 2019, for the second
time, in the beginner-friendly demoparty called Instanssi held in
Jyväskylä, Finland. It was then used in Instanssi 2020 and after some COVID-19 hassle, again in Instanssi 2023. More information will be given, when available, at https://instanssi.org/

So, Instanssi 2018, 2019, and 2020 party programs contained a workshop called
"Let's Make a Demo". This is the current instantiation of the "Version 1 series"
customized for Instanssi. Even though we've had much fun also with other demo
tools in other workshops in other events, this "Version 1 series" continues
strictly on the track of 4k intros and with my own base code.

Documentation is generated with the default settings of JSDoc, and not
much is written as of yet. My bad. Might improve over time, or might
not.

WARNING: The interface may change any time, so for productions you
will want to stick with one snapshot version of the library until
you've made it to the compo in question!

Author: Paavo Nieminen - known as "The Old Dude" for Instanssi people
and "qma" for the wider demoscene community. (My identity crisis
with nicknames still persists since the 1990's and being called Flex of
The Blues Boys group).

## Goal? Purpose of existence?

In Instanssi "Let's make a demo 1.x", the goal is to enable each
participant to create their own entry in one of two possible
competition categories: 4k intro ("pikkiriikkinen" in Finnish) or
demo.

The entries will be made from scratch, at the party place, with guidance. The
target audience is first-time demo programmers. "Seasoned veterans" are most
welcome to hang around at the workshop area, but I hope they'll mostly help in
guiding the newcomers, having done their homework (i.e., their own compo
entries) mostly before the party starts.

Previous experience in computer graphics is not required of the
participants. Programming experience would help, but is not strictly
required. **Interest and a curious attitude** towards demo programming
and **willingness to work hard towards that goal** are most necessary,
and also sufficient.

In order to actually make it to the competition before deadline, it is
absolutely necessary to allocate **dozens of hours** of time during
the demoparty to also **independent programming** between the guided hours
of the workshop. (Some 4 hours of guidance will be provided each day on
Thursday, Friday, and Saturday of the Instanssi 2023 party.)

## Tools and equipment needed to participate

What is needed in the workshop:

- Laptop with current Linux, Mac or Windows is required.

- Headphones will help with creating music without distracting others.

- Some software will be needed and installed in the first session:

  + GNU software development tools (Linux, Windows Subsystem for Linux, or GNU tools for Mac)

  + Decent code editor such as VSCode

  + A browser that can preview the obfuscated Javascript executable. Tested recently with Chrome Version 110.0.5481.105 (Official Build) (64-bit)

  + Starter package with a barebones example will be made available to participants on-site as a downloadable ZIP file. **No need at all** to clone or fork this git repository in order to participate! The starter package will contain a snapshot of everything.

## Example of workshop schedule in a 4-day demo party

The following example schedule assumes the compo deadline to be 6pm on Saturday
and the event opening on Thursday around 6pm. If the deadline is earlier,
everybody has to wake up earlier to the sessions :). Guidance is given 4 hours
per day, so that also the teacher(s) can enjoy the party, mingle, and finalize
their own compo entries. Participants should be prepared to work hard between
the sessions - otherwise there is little chance of finishing in time.

```
    Thursday
      18:00  (Assume the party opens for visitors; allow some settling time)
      19:30  Introduction session in main hall: live-coding with starter package
      20:00  Guided workshop session:
             * meet the people; launch a channel in some instant message sys.
             * install tools and make sure they work on everybody's laptop
             * make sure everybody knows how to modify the starter codes and
               preview results
             * brainstorm ideas for everybody's own entry: what can / cannot
               be done in 3 days.
      00:00- Independent working

    Friday
      14:00  Guided workshop session:
             * attend to problems encountered in independent work; discuss details
             * clarify the creative concepts and re-work them according to
               schedule
             * assess the size limits, decide on intro/demo compo for each entry
             * try making an entry, possibly test on compo machine if possible
             * tool assistance
      18:00- Independent working

   Saturday
     14:00  Guided workshop session:
            * finalize
            * make sure entries are in the compo system
     18:00  Deadline
     18:00- Enjoy compos and everyone's own entries on screen.
```

## Current status as of 1.3

"Version 1.0" of this library was successfully used to produce some 4
productions in Instanssi 2018 compos, most of them 4k intros. After some hours
of free time during the following year, I tried to make this much more
beginner-friendly, in the spirit of the beginner-friendly event that Instanssi
is. In Instanssi 2019, "version 1.1" was already quite workable with guidance.
In Instanssi 2020, "version 1.2" was pretty smooth to carry out. There might be
some improvements again before Instanssi 2023. I better promise nothing, though;
it all depends on the time I can spare. On the current TODO-list would be the
following, in priority order:

1. Make it easier and faster to install tools and start
   modifying the example entry.

2. Improve documentation to make it easier to work between the guided
   workshop hours, or use this even for self-study (in the far, far, far
   future maybe).

3. Make material parameters more intuitive

4. Make it easier to work with different shaders and light sources

5. New features

As of yet, there are quite a few undocumented nuts and bolts around,
and it is probably very difficult to go about using this without
face-to-face guidance. You have been warned...

In a workshop such as those held in Instanssi 2018-2023, there is enough time to
sort out any technical issues together before the compo deadlines.
