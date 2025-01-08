// @ts-check

/**
 * @type {import("style-dictionary").Filter['filter']}
 */
export function filterColorTokens(token) {
  /**
   * @example core.color.grey.400
   * "400": {
   *   "type": "color",
   *   "value": "#bcccdcff",
   *   "blendMode": "normal"
   * },
   */
  return ['color'].includes(`${token.type}`);
}

/**
 * @type {import("style-dictionary").Filter['filter']}
 */
export function filterTypoTokens(token) {
  /**
   * @example token.path
   * [ 'color', 'fg', 'apiviolet', 'default', 'hover' ]
   * [ 'typography', 'saans', 'typography-saans-2xl', 'fontSize' ]
   */
  return (
    token.path[0] === 'typography' &&
    ['saans', 'title', 'mono', 'body'].includes(token.path[1])
  );
}

/**
 * @type {import("style-dictionary").Filter['filter']}
 */
export function filterVariableTokens(token) {
  return (
    token.path[0] !== 'typography' &&
    token.path[0] !== 'core' &&
    ['dimension'].includes(`${token.type}`)
  );
}

/**
 * @type {import("style-dictionary").Filter['filter']}
 */
export function filterEffectTokens(token) {
  return token.path[0] === 'effect';
}
