.PHONY: externals clean veryclean
# To use this makefile, you need to install:
#  - the Closure compiler for Javascript minification
#  - ruby interpreter, and the PNGinator program for Deflate compression
#  - basic GNU tools (make, bash, sed, ...)

## Name of this production and its author:
# Filename stub for source and target files; requires
PROD_NAME=scrolltext
# A "full" name of the production, used in zip package name
PROD_NAME_FULL=Scrolling_text
# Handle of the author, also included in the zip package name
PROD_AUTHOR=qma
# Path to source files of this production.
# Must-have files: $(PROD_SRC_PATH)/($PROD_NAME){.js,_song.js,.nfo}
PROD_SRC_PATH=./prods

# When the above is set, and required sources are there, you can
# command "make $(PROD_NAME_FULL)_by_$(PROD_AUTHOR).zip" and upload
# the resulting file to the local compo system.

## Commands to find your installations (change paths to suit your setup):
CLOS=java -jar /home/nieminen/files/hacking/closure-compiler/closure-compiler-v20170218.jar
PNGIN=ruby /home/nieminen/files/hacking/pnginator/pnginator.rb

## Optional:
DEFDB=/home/nieminen/files/hacking/defdb_04b/defdb
GZTHERM=/home/nieminen/files/hacking/gzthermal_04c/gzthermal
SHMIN=mono /home/nieminen/files/hacking/shader_minifier/shader_minifier.exe

#DEFDB=echo "You may optionally download the defdb program and use it here with args:"
#GZTHERM=echo "You may optionally download the gzthermal program and use it here with args:"

# Compo entry package:
$(PROD_NAME_FULL)_by_$(PROD_AUTHOR).zip: $(PROD_NAME).compo.html $(PROD_NAME).debug.html $(PROD_SRC_PATH)/$(PROD_NAME).nfo
	zip -j $@ $^

# Order matters because of catenation etc:
COMMONSRC=library.js shaders_simple.js minified_shaders.js external/player-small.js
COMPOSRC=glconstants.js $(COMMONSRC)
DEBUGSRC=$(COMMONSRC)

# Compo target: Remove all debugging code, minify and pack everything.
$(PROD_NAME).compo.html: $(COMPOSRC) $(PROD_SRC_PATH)/$(PROD_NAME)_song.js $(PROD_SRC_PATH)/$(PROD_NAME).js
	echo "(function (){" > tmp.bulk.js
	cat $^ >> tmp.bulk.js
	echo "})();" >> tmp.bulk.js
	cat tmp.bulk.js | sed -f tools/prep.sed | sed -f tools/shortengl.sed | sed -f tools/shortenplayer.sed | $(CLOS) > tmp.closured.js
	$(PNGIN) tmp.closured.js $@

#Some compression profiling for fun - if you wanna you canna.. results are approximate, not same as Pnginator output.
	gzip -c tmp.closured.js > $@.gz
	$(DEFDB) $@.gz
	$(GZTHERM) -n $@.gz


# Debug target: just catenate stuff to an HTML file:
$(PROD_NAME).debug.html: $(DEBUGSRC) $(PROD_SRC_PATH)/$(PROD_NAME)_song.js $(PROD_SRC_PATH)/$(PROD_NAME).js
	echo "<html><head /><body><script>" > $@
	echo "(function (){" >> $@
	cat $^ >> $@
	echo "})();" >> $@
	echo "</script></body></html>" >> $@

# Minify shaders:
SHADER_JS_NAMES=test_frag.js test_vert.js noisy_frag.js

%_frag.js : shaders/%.frag
	$(SHMIN) --format js --field-names rgba \
		--preserve-externals -o $@ $<

%_vert.js : shaders/%.vert
	$(SHMIN) --format js --field-names rgba \
		--preserve-externals -o $@ $<

minified_shaders.js: $(SHADER_JS_NAMES)
	cat  $(SHADER_JS_NAMES) > $@

clean:
	-rm *~ tmp.* *.closured.js
	-rm $(SHADER_JS_NAMES)

cleaner: clean
	-rm *.compo.html
	-rm *.debug.html
	-rm gzthermal-result.png
	-rm *.gz

veryclean: cleaner
	-rm *_by_*.zip

externals: external/player-small.js

# Download stuff. Needs Internet connection, obviously.
# Removes "use strict", btw.
external/player-small.js:
#	curl http://sb.bitsnbites.eu/player-small.js | sed "s/\"use strict\";/\/\/(original by Geelnard was strict) \"use strict\"/g" > external/player-small.js
	curl http://sb.bitsnbites.eu/player-small.js > external/player-small.js
