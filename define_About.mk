## Short and long name of this production and the name of its author:
# Filename stub for source and target files
PROD_NAME=about
# A "full" name of the production, used in zip package name
PROD_NAME_FULL=About_this_Workshop_4k
# Handle of the author, also included in the zip package name
PROD_AUTHOR=The_Old_Dude
# Path to source files of this production.
# Must-have files: $(PROD_SRC_PATH)/($PROD_NAME){.js,_song.js,.nfo}
PROD_SRC_PATH=./prods

# These work for Paavo only, sry.. will fix later:
CLOS=java -jar /home/nieminen/files/hacking/closure-compiler/closure-compiler-v20170218.jar
PNGIN=ruby /home/nieminen/files/hacking/pnginator/pnginator.rb
