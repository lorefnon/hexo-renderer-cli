# About

Experimental renderer plugin for Hexo that transforms content through any utility that exposes a CLI & can stream transformed content to stdout.

# Install

```sh
cd my-blog
yarn add hexo-renderer-cli 
# or 
npm install hexo-renderer-cli
```

# Sample Configuration

## Sass:

```
npm install sass # dart-sass transpiled to js
```

(Or install the native cli through `brew install sass` for better performance)

```
cli_renderer:
  - executable: sass # The executable to run (must be present in $PATH)
    streamInput: false
    sourceExtensions:
      - sass
    targetExtension: css
    args:
      - "--load-path=node_modules"
      - "--load-path=themes/experimental/source/css"
      - "{{{filePath}}}" 
```

This will transform every sass file in the source directory through dart sass cli 

# License

MIT
