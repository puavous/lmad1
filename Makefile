.PHONY: draft clean cleaner veryclean
#
# This is under construction (almost finished) as of Instanssi 2023:
#
#  - separating the library from compo entries..

# This makefile is for creating the library and a workshop starter code pack.
#
# To use this makefile, you need to have:
#  - ShaderMinifier
#  - basic GNU tools (make, bash, sed, ...)

# To also create tiny JS executables, i.e., "compo productions", you need:
#  - the Closure compiler for Javascript minification
#  - ruby interpreter, and the PNGinator program for Deflate compression


## Commands to find your installations (change paths to suit your setup):
# Tools needed for tiny production development are only in tiny productions..
# They have a separate Makefile, based on example0/Makefile.
# This main Makefile is now for just packaging the lib and the starter pack.
# The idea is that in a workshop, total newbies just say "make my_entry" and be happy
# (with an instructor present to solve all problems that are likely to appear...)

## External tools needed for library development and documentation
SHMIN=mono external/shader_minifier.exe
JSDOC=jsdoc


# Preliminary quick testing:
draft:
	cd example0; make -B Example_4k_by_The_Old_Dude.zip
	ls -lat example0


# Order matters because of catenation etc:
COMMONSRC=lib/library.js lib/shaders_simple.js lib/minified_shaders.js external/player-small.js
COMPOSRC=lib/glconstants.js $(COMMONSRC)
DEBUGSRC=$(COMMONSRC)

# (Debug, compo, and entry targets to be built per-production;
# removed from this Makefile. Use "make draft" for quick try-outs of lib)

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

publish: lmad1_workshop_Instanssi2023.zip
	scp $< nieminen@halava.cc.jyu.fi:~/html/
