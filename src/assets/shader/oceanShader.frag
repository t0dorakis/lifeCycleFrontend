// Ported from https://www.otakhi.com/public/mfdesigner/Scenes/Ocean%20Waves
// Copyright unknown
precision highp float;
precision highp int;

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
varying vec4 HPosition;
varying vec2 UV;
varying vec3 T2WXf1;
varying vec3 T2WXf2;
varying vec3 T2WXf3;
varying vec2 bumpUV0;
varying vec2 bumpUV1;
varying vec2 bumpUV2;
varying vec3 WorldView;
varying float wh;

uniform float HDRMultiplier;
uniform float Kr;
uniform float FresnelBias;
uniform float FresnelExp;
uniform float KWater;
uniform vec3 DeepColor;
uniform vec3 ShallowColor;
uniform vec3 ReflTint;

uniform sampler2D normalMap;
uniform samplerCube envMap;

void main() {
	// sum normal map
	vec4 t0 = texture2D( normalMap, bumpUV0 )*2.0-1.0;
	vec4 t1 = texture2D( normalMap, bumpUV1 )*2.0-1.0;
	vec4 t2 = texture2D( normalMap, bumpUV2 )*2.0-1.0;
	vec3 Nt = t0.xyz + t1.xyz + t2.xyz;

	mat3 m;
	m[0] = T2WXf1;
	m[1] = T2WXf2;
	m[2] = T2WXf3;

	vec3 Nw = m * Nt;
	vec3 Nn = normalize(Nw);

	vec3 Vn = normalize( WorldView );
	vec3 R = reflect(-Vn, Nn);

	vec4 reflection = textureCube(envMap, R);
	reflection.rgb *= (1.0 + reflection.a*HDRMultiplier);

	float facing = 1.0 - max(dot(Vn, Nn), 0.0);

	float fres = Kr*(FresnelBias+(1.0 - FresnelBias)*pow(facing,FresnelExp));

	vec3 waterColor = KWater * mix(DeepColor, ShallowColor, facing);

	vec3 result =  mix(waterColor, (reflection.rgb * ReflTint), fres);

	gl_FragColor = vec4(result.rgb, 1.0);
}