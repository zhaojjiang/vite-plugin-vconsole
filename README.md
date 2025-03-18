# vite-plugin-vconsole

A Vite plugin to inject vconsole into your project during build.

## Usage

```shell
npm install --save-dev @zhaojjiang/vite-plugin-vconsole
npm install vconsole
```

**vite.config**

```ts
plugins: [
  condition && pluginVconsole(options)
],
```

## Options

- enable: boolean - default `true`. You should control it outside plugin
- options: VConsoleOptions
- entry: string | string[] - default `['src/main.ts', 'src/main.js']`. Absolute path or relative to vite config root
