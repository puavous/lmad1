.PHONY: externals clean veryclean
# To use this makefile, you need to install:
#  - the Closure compiler for Javascript minification
#  - ruby interpreter, and the PNGinator program for Deflate compression
#  - basic GNU tools (make, bash, sed, ...)

# Name of this production and its author:
PRODNAME=scrolltext
PRODNAME_FULL=Scrolling_text
PRODAUTHOR=qma

# Commands to find your installations (change paths to suit your setup):
CLOS=java -jar /home/nieminen/files/hacking/closure-compiler/closure-compiler-v20170218.jar
PNGIN=ruby /home/nieminen/files/hacking/pnginator/pnginator.rb

# Optional:
DEFDB=/home/nieminen/files/hacking/defdb_04b/defdb
GZTHERM=/home/nieminen/files/hacking/gzthermal_04c/gzthermal
SHMIN=mono /home/nieminen/files/hacking/shader_minifier/shader_minifier.exe

#DEFDB=echo "You may optionally download the defdb program and use it here with args:"
#GZTHERM=echo "You may optionally download the gzthermal program and use it here with args:"

# Compo entry package:
$(PRODNAME_FULL)_by_$(PRODAUTHOR).zip: $(PRODNAME).compo.html $(PRODNAME).debug.html $(PRODNAME).nfo
	zip $@ $^

# Order matters because of catenation etc:
COMMONSRC=library.js shaders_simple.js minified_shaders.js player-small.js
COMPOSRC=glconstants.js $(COMMONSRC)
DEBUGSRC=$(COMMONSRC)

# Compo target: Remove all debugging code, minify and pack everything.
$(PRODNAME).compo.html: $(COMPOSRC) $(PRODNAME)_song.js $(PRODNAME).js
	echo "(function (){" > tmp.bulk.js
	cat $^ >> tmp.bulk.js
	echo "})();" >> tmp.bulk.js
	cat tmp.bulk.js | sed -f prep.sed | sed -f shortengl.sed | sed -f shortenplayer.sed | $(CLOS) > tmp.closured.js
	$(PNGIN) tmp.closured.js $@

#Some compression profiling for fun - if you wanna you canna..
	gzip -c tmp.closured.js > $@.gz
	$(DEFDB) $@.gz
	$(GZTHERM) -n $@.gz


# Debug target: just catenate stuff to an HTML file:
$(PRODNAME).debug.html: $(DEBUGSRC) $(PRODNAME)_song.js $(PRODNAME).js
	echo "<html><head /><body><script>" > $@
	echo "(function (){" >> $@
	cat $^ >> $@
	echo "})();" >> $@
	echo "</script></body></html>" >> $@

# Minify shaders:
SHADER_JS_NAMES=test_frag.js test_vert.js noisy_frag.js

%_frag.js : %.frag
	$(SHMIN) --format js --field-names rgba \
		--preserve-externals -o $@ $<

%_vert.js : %.vert
	$(SHMIN) --format js --field-names rgba \
		--preserve-externals -o $@ $<


minified_shaders.js: $(SHADER_JS_NAMES)
#	$(SHMIN) --format js --field-names rgba \
#		--preserve-externals -o test_frag.js test.frag
#	$(SHMIN) --format js --field-names rgba \
#		--preserve-externals -o test_vert.js test.vert
	cat  $(SHADER_JS_NAMES) > $@

clean:
	-rm *~ tmp.* *.closured.js
	-rm $(SHADER_JS_NAMES)

veryclean: clean
	-rm $(PRODNAME).compo.html $(PRODNAME).debug.html
	-rm gzthermal-result.png
	-rm $(PRODNAME_FULL)_by_$(PRODAUTHOR).zip
	-rm *.gz

externals: player-small.js

# Download stuff. Needs Internet connection, obviously.
# Removes "use strict", btw.
player-small.js:
	curl http://sb.bitsnbites.eu/player-small.js | sed "s/\"use strict\";//g" > player-small.js
