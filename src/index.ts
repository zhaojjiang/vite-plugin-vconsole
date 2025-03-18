import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import type { VConsoleOptions } from "../vconsole";

export type PluginOptions = {
  enable?: boolean;
  options?: VConsoleOptions;
  /** absolute path, or relative to root */
  entry?: string | string[];
};

/**
 * @description 通过 vite 自定义条件动态导入 vconsole
 * @description 参考 {@link https://github.com/vadxq/vite-plugin-vconsole/blob/main/src/main.ts}
 * @description VConsole 配置参考 {@link https://github.com/Tencent/vConsole/blob/dev/doc/a_doc_index_CN.md}
 */
export default function vitePluginVconsole(options?: PluginOptions): Plugin {
  let config: ResolvedConfig;
  let resolvedEntry: string[] = [];

  const {
    enable = true,
    options: _options = {},
    entry = ["src/main.ts", "src/main.js"],
  } = options || {};

  return {
    name: "vite:vconsole",
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
      resolvedEntry = (Array.isArray(entry) ? entry : [entry])
        .map((_) => path.resolve(config.root, _))
        .map((_) => _.replace(/\\/g, "/"));
    },
    enforce: "pre",
    transform(code: string, id: string) {
      if (enable && resolvedEntry.includes(id)) {
        code += `
        // eslint-disable-next-line
        import VConsole from 'vconsole'
        new VConsole(${JSON.stringify(_options)})
        `;
      }
      return { code, map: null };
    },
  };
}
