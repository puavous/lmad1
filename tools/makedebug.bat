@REM For the Windows command line user: this builds a debug version.

@REM TODO: Batch files for compo version and entry package. Better configuration.

@REM Path to lmad1 location in your system (can be ".." if you work in a subdirectory of the example package)
@SET LMAD1=..

@REM Basically, the following part should need no changes..
@REM ---------------------------------------------------------

@REM Order of files matters because of catenation etc:
@SET LMAD1_COMMONSRC=%LMAD1%\lib\library.js %LMAD1%\lib\shaders_simple.js %LMAD1%\lib\minified_shaders.js %LMAD1%\external\player-small.js

@echo ^<html^>^<head /^>^<body^>^<p^>Click to start playback^</p^>^<script^> > debug_version.html
@echo (function (){ >> debug_version.html
@type %LMAD1_COMMONSRC% song.js prod.js %LMAD1%\lib\main.js >> debug_version.html
@echo })(); >> debug_version.html
@echo ^</script^>^</body^>^</html^> >> debug_version.html


