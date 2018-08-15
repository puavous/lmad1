# Short-hand names for SoundBox player.
# Use directly as a sed script. Works for player-small.js as
# downloaded in Nov 2017. Subject to changes in original.
# Observe that depending on the production, getData() method
# or some synth functionality may be additionally omitted,
# wave header can be precomputed when song length is fixed and so on..
#
s/this\.init/this.i/g
s/player\.init(/player.i(/g
s/this\.generate/this.g/g
s/player\.generate(/player.g(/g
s/this\.createWave/this.c/g
s/player\.createWave(/player.c(/g
s/songData/s/g
s/rowLen/rl/g
s/patternLen/pl/g
s/endPattern/ep/g
s/numChannels/nc/g

# Other size-optimizations which may affect output quality.

# Tuning frequency (exact value) of F3. Our karaoke version will be sharp.
s/0\.003959503758/0.004/g

# Below computation would yield 0.00307999186 (0.0030799925 with PI..)
s/43.23529 \* 3.141592 \/ 44100/0.00308/g

# just a little bit smaller 2pi. I'm assigning PI=Math.PI anyway.
s/6.283184/2*PI/g

# Have effects always active and delete all mention of checking it:
# (OBS: should check the code if this is only a performance optimization
# or could something go broken by disabling the test... ~26 bytes cost.)
s/, filterActive = false//g
s/filterActive = rsample \* rsample > 1e-5;//g
s/if (rsample || filterActive)/if (true)/g


# Hide getData() so that Closure can automatically nullify it as unused
# (Using this in a production would cost some ~74 bytes)
s/this\.getData = /var getData = /g

# Could do our own copies of Math functions.. but seems actually worse!
# (var Math_sin=Math .sin, Math_cos=Math .cos, Math_pow=Math .pow;)
#s/Math\.sin/Math_sin/g
#s/Math\.cos/Math_cos/g
#s/Math\.pow/Math_pow/g
