# lmad1: "Let's Make a Demo 1.1" workshop base code

This is a twisted and obscure piece of code, yes. It is my first
attempt at creating a JavaScript library (of any kind...) with the
intention of it being used in the production of very small
browser-executable files called "intros" in the demoscene parlance.

I am trying to make it very simple and easy for total beginners to
*use* this library to make some simple and creative 3D graphics and
participate in a 4k intro competition with their own entries.

This is a work-in-progress that surfaced in March 2019, for the second
time, in the beginner-friendly demoparty called Instanssi held in
Jyväskylä, Finland. The next Instanssi will happen February 27th to
March 1st, 2020. With a very high probability the party schedule will
offer a programming workshop on top of this code, once again. More
information will be given, when available, at https://instanssi.org/

So, Instanssi 2018 and 2019 party programs contained a workshop called
"Let's Make a Demo". This is the current instantiation of the "Version
1 series" customized for Instanssi. Versions 2.0 and 2.1 took place in
Assembly Summer 2018 and 2019, together with Graffathon crew and a
totally different approach and toolset. While looking forward to
possibly repeating the version 2 workshop once again with Graffathon
people and the Processing tool, this "Version 1 series" continues
strictly on the track of 4k intros and with my own base code.

Documentation is generated with the default settings of JSDoc, and not
much is written as of yet. My bad. Might improve over time, or might
not.

WARNING: The interface may change any time, so for productions you
will want to stick with one snapshot version of the library until
you've made it to the compo in question!

Author: Paavo Nieminen - known as "The Old Dude" for Instanssi people
and "qma" for the greater demoscene community. (My identity crisis
with nicknames still persists since the 1990's and being called Flex of
The Blues Boys group).

Let's Make a Demo 1.1 party coding workshop at Instanssi 2019 was
sponsored, among others, by the Faculty of Information Technology,
University of Jyväskylä, employer of The Old Dude.

## Goal? Purpose of existence?

In Instanssi "Let's make a demo 1.1", the goal is to enable each
participant to create their own entry in one of two possible
competition categories: 4k intro ("pikkiriikkinen" in Finnish) or
demo.

The entries will be made from scratch, at the party place, with
guidance. The target audience is first-time demo
programmers. "Seasoned veterans" are most welcome, but I hope they'll
mostly help in guiding the newcomers, having done their homework (own
compo entries) mostly before the party starts.

Previous experience in computer graphics is not required of the
participants. Programming experience would help, but is not strictly
required. **Interest and a curious attitude** towards demo programming
and **willingness to work hard towards that goal** are most necessary,
and also sufficient.

In order to actually make it to the competition before deadline, it is
absolutely necessary to allocate **dozens of hours** of time during
the demoparty to also independent programming between the guided hours
of the workshop. (Some 4 hours of guidance will be provided each day on
Thursday, Friday, and Saturday of the Instanssi 2020 party.)

## Example of workshop schedule in a 4-day demo party

The following example schedule assumes the compo deadline to be 6pm on
Saturday. If the deadline is earlier, everybody has to wake up earlier
to the sessions :). Guidance is given 4 hours per day, so that also
the teacher(s) can enjoy the party and finalize their own compo
entries. Participants should be prepared to work hard between the
sessions - otherwise there is little chance of finishing in time.

```
    Thursday
      18:00  Introduction session on screen: live-coding with starter package
             (NB: Instanssi 2020 has this at 19:00 and 1st workshop session 19:30-23:30)
      19:00  Guided workshop session:
             * meet the people; launch a channel in some instant message sys.
             * install tools and make sure they work on everybody's laptop
	     * make sure everybody knows how to modify the starter codes and
	       preview results
	     * brainstorm ideas for everybody's own entry: what can / cannot
	       be done in 3 days.
      23:00- Independent working

    Friday
      14:00  Guided workshop session:
             * attend to problems; discuss details
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
     18:00- Enjoy compos and the own entry on screen.
```

## Current status as of 1.1 (working towards 1.2)

"Version 1.0" of this library was successfully used to produce some 4
productions in Instanssi 2018 compos, most of them 4k intros. After
some hours of free time during the following year, I tried to make
this much more beginner-friendly, in the spirit of the
beginner-friendly event that Instanssi is. In Instanssi 2019 this was
already quite workable with guidance. There might be some improvements
again before Instanssi 2020. It all depends on the time I can
spare. On my TODO-list would be the following, in priority order:

1. Make it easier and faster to install tools and start
   modifying the example entry.

2. Improve documentation to make it easier to work between the guided
   workshop hours, or use this even for self-study (in the far, far,
   future).

3. Make material parameters more intuitive

4. Make it easier to work with different shaders and light sources

5. New features

As of yet, there are quite a few undocumented nuts and bolts around,
and it is probably very difficult to go about using this without
face-to-face guidance. You have been warned...

In a workshop such as those held in Instanssi 2018-2019 and Assembly
Summer 2018-2019, there is enough time to sort out any technical
issues together before the compo deadlines.
