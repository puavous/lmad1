@REM For the Windows command line user: this builds the compo version.

@REM TODO: Batch files for compo version and entry package. Better configuration.

@REM Path to lmad1 location in your system (can be ".." if you work in a subdirectory of the example package)
@SET LMAD1=..

@REM Basically, the following part should need no changes..
@REM ---------------------------------------------------------

@REM Order of files matters because of catenation etc:
@SET LMAD1_COMMONSRC=%LMAD1%\lib\library.js %LMAD1%\lib\shaders_simple.js %LMAD1%\lib\minified_shaders.js %LMAD1%\external\player-small.js

@SET sed=%LMAD1%\winext\sedbin\sed.exe
@SET closurecomp=java -jar %LMAD1%\external\closure-compiler.jar
@SET jsexe=%LMAD1%\winext\jsexe.exe

@echo (function (){ > tmp.bulk.compo.js
@type %LMAD1%\lib\glconstants.js %LMAD1_COMMONSRC% song.js prod.js %LMAD1%\lib\main.js >> tmp.bulk.compo.js
@echo })(); >> tmp.bulk.compo.js

@type tmp.bulk.compo.js | %sed% -f %LMAD1%\tools\prep.sed | %sed% -f %LMAD1%\tools\shortengl.sed | %sed% -f %LMAD1%\tools\shortenplayer.sed | %closurecomp% > tmp.closured.js

@%jsexe% -nc tmp.closured.js compo_version.html

@REM TODO: Should %zip% here..
