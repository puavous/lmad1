@REM For the Windows command line user: this builds the compo version.
@REM Local run will need insecure browser session. For Chrome:
@REM chrome.exe --disable-web-security --disable-gpu --user-data-dir=C:\\MyTemp\\chromeTemp

@REM NOTE: This isn't very good yet. In Instanssi 2023, we will be
@REM much better off by just installing Windows Subsystem For Linux
@REM and start creating!

@REM TODO: Easier configuration..

@REM Path to lmad1 location in your system (can be ".." if you work in a subdirectory of the example package)
@SET LMAD1=..

@REM Command to make a zip file.. example for 7-Zip in standard installation directory under C:\Program Files
@SET zip="c:\Program Files\7-Zip\7z" a 
@SET ZIPNAME=Example_entry.zip
@SET INFOFILE=example.nfo

@REM Basically, the following part should need no changes..
@REM ---------------------------------------------------------

@REM Order of files matters because of catenation etc:
@SET LMAD1_COMMONSRC=%LMAD1%\lib\library.js %LMAD1%\lib\shaders_simple.js %LMAD1%\lib\minified_shaders.js %LMAD1%\external\player-small.js

@SET sed=%LMAD1%\external\windows-sed.exe
@SET closurecomp=java -jar %LMAD1%\external\closure-compiler.jar
@SET jsexe=%LMAD1%\external\jsexe.exe

@echo (function (){ > tmp.bulk.compo.js
@type %LMAD1%\lib\glconstants.js %LMAD1_COMMONSRC% song.js prod.js %LMAD1%\lib\main.js >> tmp.bulk.compo.js
@echo })(); >> tmp.bulk.compo.js

@type tmp.bulk.compo.js | %sed% -f %LMAD1%\tools\prep.sed | %sed% -f %LMAD1%\tools\shortengl.sed | %sed% -f %LMAD1%\tools\shortenplayer.sed | %closurecomp% > tmp.closured.js

@%jsexe% -cn -pn tmp.closured.js compo_version.html

@REM TODO: Should %zip% here..
@%zip% %ZIPNAME% compo_version.html debug_version.html %INFOFILE%
