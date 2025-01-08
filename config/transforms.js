// @ts-check

export const pxToRemTransform = {
  filter(token) {
    return token.type === 'dimension';
  },
  transform(token) {
    return `${token.value / 16}rem`;
  },
};

export const interToVariableTransform = {
  filter(token) {
    return token.value === 'Inter';
  },
  transform() {
    return 'InterVariable';
  },
};

export const body400to430Transform = {
  filter(token) {
    return (
      token.path[0] === 'typography' &&
      token.path[1] === 'body' &&
      token.value === 400
    );
  },
  transform(_) {
    return 430;
  },
};

export const customShadowTransform = {
  filter(token) {
    return token.type === 'custom-shadow';
  },
  transform(token) {
    const { shadowType, radius, color, offsetX, offsetY } =
      token.original.value;

    return `drop-shadow(${offsetX}px ${offsetY}px ${radius}px ${color})`;
  },
};
