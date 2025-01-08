// @ts-check

import StyleDictionary from 'style-dictionary';

import { cssVarsPlugin, themeColors, preset } from './config/format.js';
import {
  filterColorTokens,
  filterTypoTokens,
  filterVariableTokens,
  filterEffectTokens,
} from './config/filters.js';
import {
  pxToRemTransform,
  interToVariableTransform,
  body400to430Transform,
  customShadowTransform,
} from './config/transforms.js';

// ⬇️ SHARED
StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  ...pxToRemTransform,
});

StyleDictionary.registerTransform({
  name: 'interToVariable',
  type: 'value',
  ...interToVariableTransform,
});

StyleDictionary.registerTransform({
  name: 'typo/body400to430',
  type: 'value',
  ...body400to430Transform,
});

StyleDictionary.registerTransform({
  name: 'custom-shadow',
  type: 'value',
  ...customShadowTransform,
});
// ⬆️ SHARED

// ⬇️ JSON CONFIGURATION
StyleDictionary.registerTransformGroup({
  name: 'json',
  transforms: [
    'size/pxToRem',
    'interToVariable',
    'typo/body400to430',
    'custom-shadow',
  ],
});

StyleDictionary.registerFilter({
  name: 'colorToken',
  filter: filterColorTokens,
});

StyleDictionary.registerFilter({
  name: 'typoToken',
  filter: filterTypoTokens,
});

StyleDictionary.registerFilter({
  name: 'variableToken',
  filter: filterVariableTokens,
});

StyleDictionary.registerFilter({
  name: 'shadowToken',
  filter: filterEffectTokens,
});
// ⬆️ JSON CONFIGURATION

// ⬇️ TAILWIND CONFIGURATION
StyleDictionary.registerTransformGroup({
  name: 'tailwind',
  transforms: [
    'name/kebab',
    'size/pxToRem',
    'interToVariable',
    'typo/body400to430',
    'custom-shadow',
  ],
});

StyleDictionary.registerFormat({
  name: 'tailwind/css-vars-plugin',
  format: cssVarsPlugin,
});

StyleDictionary.registerFormat({
  name: 'tailwind/theme-colors',
  format: themeColors,
});

StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format: preset,
});
// ⬆️ TAILWIND CONFIGURATION

/**
 * @type {import("style-dictionary").Config}
 */
export default {
  source: ['./tokens/**/*.json'],
  platforms: {
    tailwindPreset: {
      buildPath: 'build/tailwind/',
      transformGroup: 'tailwind',
      files: [
        {
          destination: 'cssVarsPlugin.js',
          format: 'tailwind/css-vars-plugin',
        },
        {
          destination: 'themeColors.js',
          format: 'tailwind/theme-colors',
        },
        {
          destination: 'preset.js',
          format: 'tailwind/preset',
        },
      ],
    },
    json: {
      buildPath: 'build/jsonv2/',
      transformGroup: 'json',
      files: [
        {
          destination: 'color.json',
          format: 'json/nested',
          filter: 'colorToken',
        },
        {
          destination: 'variables.json',
          format: 'json/nested',
          filter: 'variableToken',
        },
        {
          destination: 'typography.json',
          format: 'json/nested',
          filter: 'typoToken',
        },
        {
          destination: 'shadow.json',
          format: 'json/nested',
          filter: 'shadowToken',
        },
      ],
    },
  },
};
