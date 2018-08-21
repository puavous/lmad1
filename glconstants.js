/**
 * GL constants with "gl_" prepended.
 *
 * The rumors say that these have not changed much between WebGL
 * versions :). The rumors say that the following dirty trick is used
 * often in demoscene intro minification. Me too, me too!
 *
 * Usage, by an example: transform "gl.ALPHA_BITS" to "gl_ALPHA_BITS"
 * in the actual source (I have a sed script for that). Insert this
 * file before the actual GL code before feeding the resulting bulk to
 * the Closure compiler.
 *
 * Result: Closure automatically outputs "3413" instead of
 * gl.ALPHA_BITS, which is 9 bytes shorter even before
 * compression. Supposedly, and seemingly, the numeric constants work
 * accross current WebGL implementations...
 *
 */
var gl_ACTIVE_ATTRIBUTES = 35721;
var gl_ACTIVE_TEXTURE = 34016;
var gl_ACTIVE_UNIFORMS = 35718;
var gl_ALIASED_LINE_WIDTH_RANGE = 33902;
var gl_ALIASED_POINT_SIZE_RANGE = 33901;
var gl_ALPHA = 6406;
var gl_ALPHA_BITS = 3413;
var gl_ALWAYS = 519;
var gl_ARRAY_BUFFER = 34962;
var gl_ARRAY_BUFFER_BINDING = 34964;
var gl_ATTACHED_SHADERS = 35717;
var gl_BACK = 1029;
var gl_BLEND = 3042;
var gl_BLEND_COLOR = 32773;
var gl_BLEND_DST_ALPHA = 32970;
var gl_BLEND_DST_RGB = 32968;
var gl_BLEND_EQUATION = 32777;
var gl_BLEND_EQUATION_ALPHA = 34877;
var gl_BLEND_EQUATION_RGB = 32777;
var gl_BLEND_SRC_ALPHA = 32971;
var gl_BLEND_SRC_RGB = 32969;
var gl_BLUE_BITS = 3412;
var gl_BOOL = 35670;
var gl_BROWSER_DEFAULT_WEBGL = 37444;
var gl_BUFFER_SIZE = 34660;
var gl_BUFFER_USAGE = 34661;
var gl_BYTE = 5120;
var gl_CCW = 2305;
var gl_CLAMP_TO_EDGE = 33071;
var gl_COLOR_BUFFER_BIT = 16384;
var gl_COLOR_CLEAR_VALUE = 3106;
var gl_COLOR_WRITEMASK = 3107;
var gl_COMPILE_STATUS = 35713;
var gl_COMPRESSED_TEXTURE_FORMATS = 34467;
var gl_CONSTANT_ALPHA = 32771;
var gl_CONSTANT_COLOR = 32769;
var gl_CONTEXT_LOST_WEBGL = 37442;
var gl_CULL_FACE = 2884;
var gl_CULL_FACE_MODE = 2885;
var gl_CURRENT_PROGRAM = 35725;
var gl_CURRENT_VERTEX_ATTRIB = 34342;
var gl_CW = 2304;
var gl_DECR = 7683;
var gl_DECR_WRAP = 34056;
var gl_DELETE_STATUS = 35712;
var gl_DEPTH_ATTACHMENT = 36096;
var gl_DEPTH_BITS = 3414;
var gl_DEPTH_BUFFER_BIT = 256;
var gl_DEPTH_CLEAR_VALUE = 2931;
var gl_DEPTH_COMPONENT = 6402;
var gl_DEPTH_FUNC = 2932;
var gl_DEPTH_RANGE = 2928;
var gl_DEPTH_STENCIL = 34041;
var gl_DEPTH_STENCIL_ATTACHMENT = 33306;
var gl_DEPTH_TEST = 2929;
var gl_DEPTH_WRITEMASK = 2930;
var gl_DITHER = 3024;
var gl_DONT_CARE = 4352;
var gl_DST_ALPHA = 772;
var gl_DST_COLOR = 774;
var gl_DYNAMIC_DRAW = 35048;
var gl_ELEMENT_ARRAY_BUFFER = 34963;
var gl_ELEMENT_ARRAY_BUFFER_BINDING = 34965;
var gl_EQUAL = 514;
var gl_FASTEST = 4353;
var gl_FLOAT = 5126;
var gl_FRAGMENT_SHADER = 35632;
var gl_FRAMEBUFFER = 36160;
var gl_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
var gl_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
var gl_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
var gl_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
var gl_FRAMEBUFFER_BINDING = 36006;
var gl_FRAMEBUFFER_COMPLETE = 36053;
var gl_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
var gl_FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
var gl_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
var gl_FRAMEBUFFER_UNSUPPORTED = 36061;
var gl_FRONT = 1028;
var gl_FRONT_AND_BACK = 1032;
var gl_FRONT_FACE = 2886;
var gl_FUNC_ADD = 32774;
var gl_FUNC_REVERSE_SUBTRACT = 32779;
var gl_FUNC_SUBTRACT = 32778;
var gl_GENERATE_MIPMAP_HINT = 33170;
var gl_GEQUAL = 518;
var gl_GREATER = 516;
var gl_GREEN_BITS = 3411;
var gl_HIGH_FLOAT = 36338;
var gl_HIGH_INT = 36341;
var gl_IMPLEMENTATION_COLOR_READ_FORMAT = 35739;
var gl_IMPLEMENTATION_COLOR_READ_TYPE = 35738;
var gl_INCR = 7682;
var gl_INCR_WRAP = 34055;
var gl_INT = 5124;
var gl_INVALID_ENUM = 1280;
var gl_INVALID_FRAMEBUFFER_OPERATION = 1286;
var gl_INVALID_OPERATION = 1282;
var gl_INVALID_VALUE = 1281;
var gl_INVERT = 5386;
var gl_KEEP = 7680;
var gl_LEQUAL = 515;
var gl_LESS = 513;
var gl_LINEAR = 9729;
var gl_LINEAR_MIPMAP_LINEAR = 9987;
var gl_LINEAR_MIPMAP_NEAREST = 9985;
var gl_LINE_LOOP = 2;
var gl_LINES = 1;
var gl_LINE_STRIP = 3;
var gl_LINE_WIDTH = 2849;
var gl_LINK_STATUS = 35714;
var gl_LOW_FLOAT = 36336;
var gl_LOW_INT = 36339;
var gl_LUMINANCE = 6409;
var gl_LUMINANCE_ALPHA = 6410;
var gl_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
var gl_MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
var gl_MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
var gl_MAX_RENDERBUFFER_SIZE = 34024;
var gl_MAX_TEXTURE_IMAGE_UNITS = 34930;
var gl_MAX_TEXTURE_SIZE = 3379;
var gl_MAX_VARYING_VECTORS = 36348;
var gl_MAX_VERTEX_ATTRIBS = 34921;
var gl_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
var gl_MAX_VERTEX_UNIFORM_VECTORS = 36347;
var gl_MAX_VIEWPORT_DIMS = 3386;
var gl_MEDIUM_FLOAT = 36337;
var gl_MEDIUM_INT = 36340;
var gl_MIRRORED_REPEAT = 33648;
var gl_NEAREST = 9728;
var gl_NEAREST_MIPMAP_LINEAR = 9986;
var gl_NEAREST_MIPMAP_NEAREST = 9984;
var gl_NEVER = 512;
var gl_NICEST = 4354;
var gl_NO_ERROR = 0;
var gl_NONE = 0;
var gl_NOTEQUAL = 517;
var gl_ONE = 1;
var gl_ONE_MINUS_CONSTANT_ALPHA = 32772;
var gl_ONE_MINUS_CONSTANT_COLOR = 32770;
var gl_ONE_MINUS_DST_ALPHA = 773;
var gl_ONE_MINUS_DST_COLOR = 775;
var gl_ONE_MINUS_SRC_ALPHA = 771;
var gl_ONE_MINUS_SRC_COLOR = 769;
var gl_OUT_OF_MEMORY = 1285;
var gl_PACK_ALIGNMENT = 3333;
var gl_POINTS = 0;
var gl_POLYGON_OFFSET_FACTOR = 32824;
var gl_POLYGON_OFFSET_FILL = 32823;
var gl_POLYGON_OFFSET_UNITS = 10752;
var gl_RED_BITS = 3410;
var gl_RENDERBUFFER = 36161;
var gl_RENDERBUFFER_ALPHA_SIZE = 36179;
var gl_RENDERBUFFER_BINDING = 36007;
var gl_RENDERBUFFER_BLUE_SIZE = 36178;
var gl_RENDERBUFFER_DEPTH_SIZE = 36180;
var gl_RENDERBUFFER_GREEN_SIZE = 36177;
var gl_RENDERBUFFER_HEIGHT = 36163;
var gl_RENDERBUFFER_INTERNAL_FORMAT = 36164;
var gl_RENDERBUFFER_RED_SIZE = 36176;
var gl_RENDERBUFFER_STENCIL_SIZE = 36181;
var gl_RENDERBUFFER_WIDTH = 36162;
var gl_RENDERER = 7937;
var gl_REPEAT = 10497;
var gl_REPLACE = 7681;
var gl_RGB = 6407;
var gl_RGBA = 6408;
var gl_SAMPLE_ALPHA_TO_COVERAGE = 32926;
var gl_SAMPLE_BUFFERS = 32936;
var gl_SAMPLE_COVERAGE = 32928;
var gl_SAMPLE_COVERAGE_INVERT = 32939;
var gl_SAMPLE_COVERAGE_VALUE = 32938;
var gl_SAMPLER_CUBE = 35680;
var gl_SAMPLES = 32937;
var gl_SCISSOR_BOX = 3088;
var gl_SCISSOR_TEST = 3089;
var gl_SHADER_TYPE = 35663;
var gl_SHADING_LANGUAGE_VERSION = 35724;
var gl_SHORT = 5122;
var gl_SRC_ALPHA = 770;
var gl_SRC_ALPHA_SATURATE = 776;
var gl_SRC_COLOR = 768;
var gl_STATIC_DRAW = 35044;
var gl_STENCIL_ATTACHMENT = 36128;
var gl_STENCIL_BACK_FAIL = 34817;
var gl_STENCIL_BACK_FUNC = 34816;
var gl_STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
var gl_STENCIL_BACK_PASS_DEPTH_PASS = 34819;
var gl_STENCIL_BACK_REF = 36003;
var gl_STENCIL_BACK_VALUE_MASK = 36004;
var gl_STENCIL_BACK_WRITEMASK = 36005;
var gl_STENCIL_BITS = 3415;
var gl_STENCIL_BUFFER_BIT = 1024;
var gl_STENCIL_CLEAR_VALUE = 2961;
var gl_STENCIL_FAIL = 2964;
var gl_STENCIL_FUNC = 2962;
var gl_STENCIL_PASS_DEPTH_FAIL = 2965;
var gl_STENCIL_PASS_DEPTH_PASS = 2966;
var gl_STENCIL_REF = 2967;
var gl_STENCIL_TEST = 2960;
var gl_STENCIL_VALUE_MASK = 2963;
var gl_STENCIL_WRITEMASK = 2968;
var gl_STREAM_DRAW = 35040;
var gl_SUBPIXEL_BITS = 3408;
var gl_TEXTURE = 5890;
var gl_TEXTURE_BINDING_CUBE_MAP = 34068;
var gl_TEXTURE_CUBE_MAP = 34067;
var gl_TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
var gl_TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
var gl_TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
var gl_TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
var gl_TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
var gl_TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
var gl_TEXTURE_MAG_FILTER = 10240;
var gl_TEXTURE_MIN_FILTER = 10241;
var gl_TEXTURE_WRAP_S = 10242;
var gl_TEXTURE_WRAP_T = 10243;
var gl_TRIANGLE_FAN = 6;
var gl_TRIANGLES = 4;
var gl_TRIANGLE_STRIP = 5;
var gl_UNPACK_ALIGNMENT = 3317;
var gl_UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
var gl_UNPACK_FLIP_Y_WEBGL = 37440;
var gl_UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
var gl_UNSIGNED_BYTE = 5121;
var gl_UNSIGNED_INT = 5125;
var gl_UNSIGNED_SHORT = 5123;
var gl_VALIDATE_STATUS = 35715;
var gl_VENDOR = 7936;
var gl_VERSION = 7938;
var gl_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
var gl_VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
var gl_VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
var gl_VERTEX_ATTRIB_ARRAY_POINTER = 34373;
var gl_VERTEX_ATTRIB_ARRAY_SIZE = 34339;
var gl_VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
var gl_VERTEX_ATTRIB_ARRAY_TYPE = 34341;
var gl_VERTEX_SHADER = 35633;
var gl_VIEWPORT = 2978;
var gl_ZERO = 0;
