# Design Token Transformer

This repo stores Friendli's design tokens (`tokens/*.json`) exported from Figma.

## How tokens are updated

Design tokens are exported from Figma by the **Friendli Design Token Exporter** plugin, which opens a pull request against this repository with the updated `tokens/*.json` files. Review and merge the PR to publish the changes.

When a token PR is merged into `main`, the [`notify-web-repo`](.github/workflows/notify-web-repo.yml) workflow notifies the [`friendliai/web`](https://github.com/friendliai/web) repository to sync the latest tokens.

> **Deprecated:** The previous flow used the [Design Tokens plugin for Figma](https://github.com/lukasoppermann/design-tokens), which sent a `repository_dispatch` event to the [`transform-tokens`](.github/workflows/transform-tokens.yml) action to normalize the payload and open a PR. That workflow is disabled and kept only for history.

Please refer to the related [confluence page](https://friendliai.atlassian.net/wiki/spaces/FS/pages/48267381/Figma) for more details and configuration.
