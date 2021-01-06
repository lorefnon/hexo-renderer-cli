import renderer from "./renderer";
import { Record, String, Array, Static, Boolean, Undefined } from "runtypes";

const CLIRendererConfig = Record({
  executable: String,
  args: Array(String),
  streamInput: Boolean.Or(Undefined),
  sourceExtensions: Array(String),
  targetExtension: String,
});

export type CLIRendererConfig = Static<typeof CLIRendererConfig>;

const CLIRendererConfigArr = Array(CLIRendererConfig);

if (hexo.config.cli_renderer) {
  const configArr = hexo.config.cli_renderer as CLIRendererConfig[];
  CLIRendererConfigArr.check(configArr);
  for (const config of configArr) {
    hexo.log.debug('Identified hexo renderer cli config', config);
    for (const extension of config.sourceExtensions) {
      hexo.extend.renderer.register(extension, config.targetExtension, renderer(config));
    }
  }
}
