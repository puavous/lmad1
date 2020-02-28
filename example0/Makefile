.PHONY: clean cleaner veryclean
# To use this makefile, you need to install:
#  - Java runtime platform and the Closure compiler for Javascript minification
#  - ruby interpreter, and the PNGinator program for Deflate compression
#  - basic GNU tools (make, bash, sed, ...)

include Settings.mk

# The above included file should set a couple of things (see the
# examples). When the included file and referenced sources are OK (and
# the tool programs installed), Linux users can just "make
# $(PROD_NAME_FULL)_by_$(PROD_AUTHOR).zip" and upload the resulting
# zip file to the compo system at a party place.

# While developing, you can try new things quickly with "make
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

