const StyleDictionary = require("style-dictionary");

const validTypes = [
  "dimension",
  "custom-spacing",
  "custom-radius",
  "custom-shadow",
];

StyleDictionary.registerFilter({
  name: "validToken",
  matcher(token) {
    return (
      validTypes.includes(token.type) &&
      !fontPaths.includes(token.path[0]) &&
      token.path[0] !== "typography" &&
      token.path[0] !== "core"
    );
  },
});

const colorTypes = ["color", "custom-gfontPathsradient"];

StyleDictionary.registerFilter({
  name: "colorToken",
  matcher(token) {
    return colorTypes.includes(token.type);
  },
});

const fontPaths = ["saans", "title", "mono", "body"];

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
    interToVariable: {
      type: "value",
      matcher(token) {
        return token.value === "Inter";
      },
      transformer() {
        return "InterVariable";
      },
    },
    regularTo430: {
      type: "value",
      matcher(token) {
        return token.value === 400 && token.path[0] === "body";
      },
      transformer() {
        return 430;
      },
    },
  },
  transformGroup: {
    "custom/json": StyleDictionary.transformGroup.css.concat([
      "size/rem",
      "interToVariable",
      "regularTo430",
    ]),
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
