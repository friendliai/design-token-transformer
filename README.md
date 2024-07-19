# Design Token Transformer

This package is supposed to be used together with the [Design Tokens plugin for Figma](https://github.com/lukasoppermann/design-tokens).
It transforms the exported design tokens using [Amazon style dictionary](https://amzn.github.io/style-dictionary/#/).

## How to build

```sh
npm install # install dependencies
npm run transform-tokens # generates parsed JSON outputs in build
```

This repo has dispatch event action which is call via [Design Tokens plugin for Figma](https://github.com/lukasoppermann/design-tokens).
Please refer to related [confluence page](https://friendliai.atlassian.net/wiki/spaces/FS/pages/48267381/Figma) for more details and configurations.
