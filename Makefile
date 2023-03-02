.PHONY: clean cleaner veryclean
#
# This is under construction:
#
#  - separating the library from compo entries..
#



# To use this makefile, you need to install:
#  - the Closure compiler for Javascript minification
#  - ruby interpreter, and the PNGinator program for Deflate compression
#  - basic GNU tools (make, bash, sed, ...)

include Current_build.mk

# The above included file should set a couple of things (see the
# examples). When the included file and referenced sources are OK (and
# the tool programs installed), Linux users can just "make
# $(PROD_NAME_FULL)_by_$(PROD_AUTHOR).zip" and upload the resulting
# zip file to the compo system at a party place.

## Commands to find your installations (change paths to suit your setup):
# FIXME: These were put in Current_build.mk as a quick fix in Instanssi 2019
#CLOS=java -jar /home/nieminen/files/hacking/closure-compiler/closure-compiler-v20170218.jar
PNGIN=ruby tools/pnginator_modified.rb
#PNGIN=ruby /home/nieminen/files/hacking/pnginator/pnginator.rb

## Optional (not used at Instanssi 2019):
DEFDB=/home/nieminen/files/hacking/defdb_04b/defdb
GZTHERM=/home/nieminen/files/hacking/gzthermal_04c/gzthermal
#DEFDB=echo "You may optionally download the defdb program and use it here with args:"
#GZTHERM=echo "You may optionally download the gzthermal program and use it here with args:"

## Even more optional (for library development and documentation)
SHMIN=mono external/shader_minifier.exe
JSDOC=jsdoc


# Compo entry package:
$(PROD_NAME_FULL)_by_$(PROD_AUTHOR).zip: $(PROD_NAME).compo.html $(PROD_NAME).debug.html $(PROD_SRC_PATH)/$(PROD_NAME).nfo
	zip -j $@ $^

# Order matters because of catenation etc:
COMMONSRC=lib/library.js lib/shaders_simple.js lib/minified_shaders.js external/player-small.js
COMPOSRC=lib/glconstants.js $(COMMONSRC)
DEBUGSRC=$(COMMONSRC)

# Compo target: Remove all debugging code, minify and pack everything.
$(PROD_NAME).compo.html: $(COMPOSRC) $(PROD_SRC_PATH)/$(PROD_NAME)_song.js $(PROD_SRC_PATH)/$(PROD_NAME).js lib/main.js
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
$(PROD_NAME).debug.html: $(DEBUGSRC) $(PROD_SRC_PATH)/$(PROD_NAME)_song.js $(PROD_SRC_PATH)/$(PROD_NAME).js lib/main.js
	echo "<html><head /><body><script>" > $@
	echo "(function (){" >> $@
	cat $^ >> $@
	echo "})();" >> $@
	echo "</script></body></html>" >> $@

#FIXME: Experimental at Instanssi 2019.. not used yet.
# Minify shaders:
SHADER_JS_NAMES=test_frag.js test_vert.js noisy_frag.js noisz_frag.js

%_frag.js : shaders/%.frag
	$(SHMIN) --format js --field-names rgba \
		--preserve-externals -o $@ $<

%_vert.js : shaders/%.vert
	$(SHMIN) --format js --field-names rgba \
		--preserve-externals -o $@ $<

lib/minified_shaders.js: $(SHADER_JS_NAMES)
	cat  $(SHADER_JS_NAMES) > $@

# Auto-generate documentation.. I'm totally newbie to JS documentation, so do what I can...
# imitate javadoc and sorts, using jsdoc.js - something that Google showed me..
# Currently trying with jsdoc-toolkit of the WSL Ubuntu ..
documentation: $(DEBUGSRC)
	$(JSDOC) -d=./documentation/ lib/

# I used to use some jsdoc.js earlier that had a little bit different options... 
#       $(JSDOC) -d ./documentation/ -c tools/jsdoc_conf.json -r README.md lib/

clean:
	-rm *~ tmp.* *.closured.js

cleaner: clean
	-rm *.compo.html
	-rm *.debug.html
	-rm gzthermal-result.png
	-rm *.gz

veryclean: cleaner
	-rm $(SHADER_JS_NAMES)
	-rm *_by_*.zip

# The workshop starter package

lmad1_workshop_Instanssi2023.zip:
	-rm -r lmad1_workshop_Instanssi2023
	bash tools/create_starter_pack.sh Instanssi2023

# Quick'n'dirty

publish: lmad1_workshop_Instanssi2020.zip
	scp $< nieminen@halava.cc.jyu.fi:~/html/
