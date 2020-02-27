# This script will download external tools and package everything in
# one zip for workshop participants to download and start creating.

# TODO: Tool binaries for Windows users.

set -e

if [[ $# -lt 1 ]]
then
   echo Usage: $0 EVENT_ID
   echo where EVENT_ID will be appended to output directory name
   exit 1
fi

VERSION="lmad1_workshop_$1"

LIBFILES="lib/curve_presets.js \
  lib/glconstants.js \
  lib/library.js \
  lib/main.js \
  lib/minified_shaders.js \
  lib/shaders_simple.js"

EXAMPLEFILES="example0/example.nfo \
  example0/Makefile \
  example0/prod.js \
  example0/Settings.mk \
  example0/song.js"

TOOLFILES="tools/pnginator_modified.rb \
  tools/shortengl.sed \
  tools/prep.sed \
  tools/shortenplayer.sed \
  tools/makedebug.bat \
  tools/makecompo.bat"

EXTFILES="external/player-small.js \
          external/closure-compiler.jar"

# Download external tools..
# Closure compiler. Links and names work as of 2019-10-19.
if [[ ! -e external/closure-compiler.jar ]]
then
   curl https://dl.google.com/closure-compiler/compiler-latest.zip > external/compiler-latest.zip
   unzip -d external/ external/compiler-latest.zip 'closure-*.jar'
   mv external/closure-*.jar external/closure-compiler.jar
fi

# Some tools from a forum.. use at your own risk - I leave these in comments..
#curl https://encode.su/attachment.php?s=639690c9d6d38b7fe4d4200974e8611a&attachmentid=2934&d=1400449686 | tar xvz -O > external/defdb
#curl https://encode.su/attachment.php?attachmentid=3764&d=1437783457 | tar xvz -O > external/gzthermal


# Build directory structure
mkdir "${VERSION}"
mkdir "${VERSION}"/lib
mkdir "${VERSION}"/example
mkdir "${VERSION}"/tools
mkdir "${VERSION}"/external

cp $LIBFILES "${VERSION}/lib/"
cp $EXAMPLEFILES "${VERSION}/example/"
cp $EXTFILES "${VERSION}/external/"
cp $TOOLFILES "${VERSION}/tools/"
cp -r documentation "${VERSION}"
# TODO: this is new
cp -r winext "${VERSION}"


# Remove earlier version, and re-zip:
rm -f "${VERSION}.zip"
zip -r "${VERSION}.zip" "${VERSION}"
