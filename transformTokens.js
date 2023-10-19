const StyleDictionary = require("style-dictionary");

StyleDictionary.registerFilter({
  name: "validToken",
  matcher(token) {
    return [
      "dimension",
      "string",
      "number",
      "custom-spacing",
      "custom-fontStyle",
      "custom-radius",
    ].includes(token.type);
  },
});

StyleDictionary.registerFilter({
  name: "colorToken",
  matcher(token) {
    return ["color", "custom-gradient", "custom-shadow"].includes(token.type);
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
      ],
    },
  },
});

StyleDictionaryExtended.buildAllPlatforms();
