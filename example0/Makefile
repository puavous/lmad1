.PHONY: clean cleaner veryclean
# To use this makefile, you need to install:
#  - Java runtime platform and the Closure compiler for Javascript minification
#  - ruby interpreter, and the PNGinator program for Deflate compression
#  - basic GNU tools (make, bash, sed, ...)

include Settings.mk

# The above included file should be edited to set a couple of things.
# When the Settings.mk file and referenced sources are OK (and
# the tool programs installed), Workshop participants can just "make
# $(PROD_NAME_FULL)_by_$(PROD_AUTHOR).zip" and upload the resulting
# zip file to the compo system at a party place.

# While creating your intro, you can try new things quickly with "make
# $(PROD_NAME).debug.html" and then reload the debug version in your
# browser.

# Every now and then, you should "make $(PROD_NAME).compo.html" to see
# how big your compo entry is, and that it still works even when
# minimized. It will take a longer time to build that one because of
# all the minification and compression needed, so you don't want to do
# that after each small change to your entry...


# Compo entry package:
$(PROD_NAME_FULL)_by_$(PROD_AUTHOR).zip: $(PROD_NAME).compo.html $(PROD_NAME).debug.html $(NFO_NAME)
	zip -j $@ $^

# Order matters because of catenation etc:
COMMONSRC=$(LMAD1)/lib/library.js \
          $(LMAD1)/lib/shaders_simple.js \
          $(LMAD1)/lib/minified_shaders.js \
          $(LMAD1)/external/player-small.js

COMPOSRC=$(LMAD1)/lib/glconstants.js $(COMMONSRC)
DEBUGSRC=$(COMMONSRC)

tmp.bulk.compo.js: $(COMPOSRC) song.js prod.js $(LMAD1)/lib/main.js
	echo "(function (){" > $@
	cat $^ >> $@
	echo "})();" >> $@


# Compo target: Remove all debugging code, minify and pack everything.
$(PROD_NAME).compo.html: tmp.bulk.compo.js
	cat tmp.bulk.compo.js | sed -f $(LMAD1)/tools/prep.sed | sed -f $(LMAD1)/tools/shortengl.sed | sed -f $(LMAD1)/tools/shortenplayer.sed | $(CLOS) > tmp.closured.js
	$(PNGIN) tmp.closured.js $@

#Some compression profiling for fun - if you wanna you canna.. results are approximate, not same as Pnginator output.
	gzip -c tmp.closured.js > $@.gz
	$(DEFDB) $@.gz
	$(GZTHERM) -n $@.gz


# Debug target: just catenate stuff to an HTML file:
$(PROD_NAME).debug.html: $(DEBUGSRC) song.js prod.js $(LMAD1)/lib/main.js
	echo "<html><head /><body><h1>Click to start show<script>" > $@
	echo "(function (){" >> $@
	cat $^ >> $@
	echo "})();" >> $@
	echo "</script></body></html>" >> $@

clean:
	-rm *~ tmp.* *.closured.js

cleaner: clean
	-rm *.compo.html
	-rm *.debug.html
	-rm gzthermal-result.png
	-rm *.gz

veryclean: cleaner
	-rm *_by_*.zip


# The above might be GNU make -specific; it is in my long-term plan
# to possibly make it in more standard.
# An English explanation of how an end product using lmad1 is created:
#
#  1. Create a JavaScript file containing "(function(){BULK})();"
#     where BULK is a catenation of the library, the soft-synth, code
#     specific to artistic production, and *last of all* the main
#     "on-load code".
# 
#  2. <!-- To run in "debug mode", create an HTML file containing
#     "<html><head /><body><script>JS</script></body></html>" where JS
#     is the JavaScript produced in step 1. Open in a browser that
#     happens to accept the beast. -->
# 
#  3. To produce a minified "intro competition" version, Remove
#     debugging code and other redundant
#     functionality (lines that end with "DEBUG". Feed into a
#     JavaScript minifier like Closure. Then pack with PNGinator or
#     JSExe or similar. Recently Brotli compression has been allowed
#     in Assembly Summer intro competitions, de facto.
# 
#     TODO: Write some "batch file" for Windows users who don't want
#     to install WSL, MinGW or similar GNU toolset? So far, I see no
#     point in not wanting to do that, though... so the priority is
#     low or none.
