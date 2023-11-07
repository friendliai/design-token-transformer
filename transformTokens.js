const StyleDictionary = require("style-dictionary");

const validTypes = [
  "dimension",
  "string",
  "number",
  "custom-spacing",
  "custom-fontStyle",
  "custom-radius",
];

const fontPaths = ["articulat", "title", "mono", "body"];

const colorTypes = ["color", "custom-gfontPathsradient", "custom-shadow"];

StyleDictionary.registerFilter({
  name: "validToken",
  matcher(token) {
    return (
      validTypes.includes(token.type) && !fontPaths.includes(token.path[0])
    );
  },
});

StyleDictionary.registerFilter({
  name: "colorToken",
  matcher(token) {
    return colorTypes.includes(token.type);
  },
});

StyleDictionary.registerFilter({
  name: "typoToken",
  matcher(token) {
    return fontPaths.includes(token.path[0]);
  },
});

/**
 * @type {import("style-dictionary").Core}
 */
const StyleDictionaryExtended = StyleDictionary.extend({
  source: ["tokens/*.json"],
  // https://github.com/lukasoppermann/design-token-transformer/blob/main/src/web/index.js
  transform: {
    "size/rem": {
      type: "value",
      matcher(token) {
        return token.type === "dimension";
      },
      transformer(token) {
        return `${Number(token.original.value) / 16}rem`;
      },
    },
  },
  transformGroup: {
    "custom/json": StyleDictionary.transformGroup.css.concat(["size/rem"]),
  },
  platforms: {
    json: {
      buildPath: "build/",
      transformGroup: "custom/json",
      files: [
        {
          destination: "color.json",
          format: "json/nested",
          filter: "colorToken",
        },
        {
          destination: "variables.json",
          format: "json/nested",
          filter: "validToken",
        },
        {
          destination: "typography.json",
          format: "json/nested",
          filter: "typoToken",
        },
      ],
    },
  },
});

StyleDictionaryExtended.buildAllPlatforms();
