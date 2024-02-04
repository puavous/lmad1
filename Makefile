.PHONY: draft clean cleaner veryclean
# This main Makefile is now for just packaging the lib and the starter pack.
# The starter pack will have a separate Makefile, based on example0/Makefile.
# The idea is that in a workshop, total newbies just say "make my_entry"
# and be happy (with an instructor present to solve all random problems
# that will certainly appear.)
#
# This makefile is for creating a workshop starter code pack that contains
# the library, some example code to get started, and tools needed for building
# the tiny end products.
#
# You do NOT need this to participate in the workshop using the starter code.
#
# To use this makefile, you need to have:
#  - ShaderMinifier
#  - basic GNU tools (make, bash, sed, ...)

# To also create tiny JS executables, i.e., "compo productions", you need:
#  - basic GNU tools (make, bash, sed, ...)
#  - Java RTE, and the Closure compiler for Javascript minification
#  - ruby interpreter, and the PNGinator program for Deflate compression

## External tools needed for library development and documentation
# Set up paths for your installation if need be:
SHMIN=mono external/shader_minifier.exe
JSDOC=jsdoc

# Preliminary quick testing of the example without building whole starter pack:
draft:
	cd example0; make -B Example_4k_by_The_Old_Dude.zip
	ls -lat example0

# FIXME: Experimental at Instanssi 2019.. not used yet.
# Minify shaders:
SHADER_JS_NAMES=test_frag.js test_vert.js noisy_frag.js noisz_frag.js

%_frag.js : shaders/%.frag
	$(SHMIN) --format js --field-names rgba \
		--preserve-externals -o $@ $<

%_vert.js : shaders/%.vert
	$(SHMIN) --format js --field-names rgba \
		--preserve-externals -o $@ $<

lib/minified_shaders.js: $(SHADER_JS_NAMES)
	printf '/** @fileOverview Automatically minified shaders. */' > $@
	cat  $(SHADER_JS_NAMES) >> $@

# Auto-generate documentation.. I'm totally newbie to JS documentation, so do what I can...
# imitate javadoc and sorts, using jsdoc.js - something that Google showed me..
# Currently trying with jsdoc-toolkit of the WSL Ubuntu .. (version 2.4)
COMMONSRC=lib/library.js lib/shaders_simple.js lib/minified_shaders.js external/player-small.js
documentation: $(COMMONSRC)
	$(JSDOC) -d=./documentation/ lib/

# I used to use some jsdoc.js earlier that had a little bit different options... 
#       $(JSDOC) -d ./documentation/ -c tools/jsdoc_conf.json -r README.md lib/

clean:
	-rm *~ tmp.* *.closured.js

cleaner: clean

veryclean: cleaner
	-rm $(SHADER_JS_NAMES)
	cd example0; make veryclean

# The workshop starter package

lmad1_workshop_Instanssi2023.zip:
	-rm -r lmad1_workshop_Instanssi2023
	bash tools/create_starter_pack.sh Instanssi2023
