# This script will download external tools and package everything in
# one zip for workshop participants to download and start creating.

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

EXAMPLEFILES="example0/README.txt \
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
          external/closure-compiler.jar \
	  external/windows-sed.exe \
	  external/jsexe.exe"

# Download external tools..
# Links and names are latest versions as of 2023-03-01.

# Closure compiler is needed for minification on all platforms.
if [[ ! -e external/closure-compiler.jar ]]
then
   curl https://repo1.maven.org/maven2/com/google/javascript/closure-compiler/v20230206/closure-compiler-v20230206.jar > external/closure-compiler.jar
fi

# Windows users will need sed from somewhere because it is used for some shoveling
if [[ ! -e external/windows-sed.exe ]]
then
    wget -O - https://github.com/mbuilov/sed-windows/raw/master/sed-4.9-x64.exe > external/windows-sed.exe
fi

# Windows users will get simplest js executable with jsexe
if [[ ! -e external/jsexe.exe ]]
then
    pushd external
    wget -O - https://files.scene.org/get/resources/tools/windows/adinpsz_-_jsexe.zip > jsexe.zip
    unzip jsexe.zip jsexe.exe
    rm jsexe.zip
    popd
fi


# Tools for building the library itself
# Shader minifier is needed for minifying the WebGL shaders
if [[ ! -e external/shader_minifier.exe ]]
then
    # Github didn't like default curl so use wget here:
    wget -O - https://github.com/laurentlb/Shader_Minifier/releases/download/1.3.6/shader_minifier.exe > external/shader_minifier.exe
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

# Add documentation only if it has been created
if [[ -e documentation ]]
then
  cp -r documentation "${VERSION}"
else
    echo "NO DOCUMENTATION FOUND. Skipping."
fi

# # TODO: this is new .. and not done... I put win stuff in 'external' too
# cp -r winext "${VERSION}"


# Remove earlier version, and re-zip:
rm -f "${VERSION}.zip"
zip -r "${VERSION}.zip" "${VERSION}"
