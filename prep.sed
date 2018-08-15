/\/\/DEBUG *$/d
# Behavior of [A-Z] depends on locale. Set LC_ALL=C to be sure:
#s/gl\.\([A-Z][A-Z_]*\)/gl_\1/g
# Or, use this one:
s/gl\.\([ABCDEFGHIJKLMNOPQRSTUVWXYZ][A-Z_]*\)/gl_\1/g
