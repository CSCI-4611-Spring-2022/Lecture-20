#version 300 es

precision mediump float;

#define POINT_LIGHT 0
#define DIRECTIONAL_LIGHT 1

const int MAX_LIGHTS = 16;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 normalMatrix;
uniform vec3 eyePosition;

uniform int numLights;
uniform int lightTypes[MAX_LIGHTS];
uniform vec3 lightPositions[MAX_LIGHTS];
uniform vec3 ambientIntensities[MAX_LIGHTS];
uniform vec3 diffuseIntensities[MAX_LIGHTS];
uniform vec3 specularIntensities[MAX_LIGHTS];

uniform vec3 kAmbient;
uniform vec3 kDiffuse;
uniform vec3 kSpecular;
uniform float shininess;

in vec3 position;
in vec3 normal;
in vec4 color;

out vec4 vertColor;

void main()
{
    vec3 worldPosition = (modelMatrix * vec4(position, 1)).xyz;

    vec3 illumination = vec3(0, 0, 0);
    for(int i=0; i < numLights; i++)
    {
        // Ambient component
        illumination += kAmbient * ambientIntensities[i];

        vec3 n = normalize((normalMatrix * vec4(normal, 0)).xyz);

        vec3 l;
        if(lightTypes[i] == DIRECTIONAL_LIGHT)
            l = normalize(lightPositions[i]);
        else
            l = normalize(lightPositions[i] - worldPosition);

        // Diffuse component
        float diffuseComponent = max(dot(n, l), 0.0);
        illumination += kDiffuse * diffuseIntensities[i] * diffuseComponent;

        // Compute the vector from the vertex to the eye
        vec3 e = normalize(eyePosition - worldPosition);

        // Compute the light vector reflected about the normal
        vec3 r = reflect(-l, n);
        
        // Diffuse component
        float specularComponent = pow(max(dot(e, r), 0.0), shininess);
        illumination += kSpecular * specularIntensities[i] * specularComponent;
    }

    vertColor = vec4(illumination, 1) * color;
    gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition, 1);
}