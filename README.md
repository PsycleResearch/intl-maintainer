# intl-maintainer

Easy update for your INTL files

## Usage

```
npx @psycle/intl-maintainer <command> [options] <parameters...>
```

| Command                                       | Description                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `help`                                        | Shows an help message                                                                                |
| `update [options] <source> <destinations...>` | Extract keys from source files and update destination files prompting the user to input translations |

### `update [options] <source> <destinations...>` Command

| Options           | Description                                |
| ----------------- | ------------------------------------------ |
| `-d`, `--dry-run` | Run the command without touching the files |
| `--output-to-cli` | Print the command output to the CLI        |

| Parameters          | Description                        |
| ------------------- | ---------------------------------- |
| `<source>`          | Source file for translations       |
| `<destinations...>` | Destination files for translations |

## Build

```
yarn build
```

## Test locally

You can test the tool by running :

```
yarn use
```

or

```
npx ts-node src/index.ts
```

## ROADMAP

-   [ ] More unit tests
-   [ ] Integration tests
-   [ ] Use [Format.JS Node API](https://formatjs.io/docs/tooling/cli/#node-api) to compile messages
-   [ ] Use prompt to allow user to write new translations in the CLI
    -   [ ] Use [Format.JS Node API](https://formatjs.io/docs/tooling/cli/#node-api) to check messages syntax
