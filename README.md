# intl-maintainer

## Build

```
yarn build
```

## Test locally

Ensure you have build the CLI and that you have the following line in your `.bashrc` (or `.zshrc`, ...):

```
export PATH="$PATH:`yarn global bin`"
```

If everything is ready, you can install the tool globally by running:

```
yarn link --global
```

You can now test the tool by running:

```
npx @psycle/intl-maintainer
```
