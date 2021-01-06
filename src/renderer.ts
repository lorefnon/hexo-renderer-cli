import Hexo from "hexo";
import execa from "execa";
import { Readable } from "stream";
import Mustache from "mustache";
import { extend, isEmpty, negate } from "lodash";
import type { CLIRendererConfig } from "./index";

const renderer = (config: CLIRendererConfig) => {
  return async function (this: Hexo, data: Hexo.extend.RendererData) {
    const args: string[] = normalizeArgs(data, config.args);
    this.log.debug(`Spawning renderer process: ${config.executable} ${args.join(' ')}`);
    const spawned = execa(config.executable, args);
    if (config.streamInput) {
      const readable = Readable.from([data.text]);
      readable.pipe(spawned.stdin!);
    }
    try {
      const { stdout } = await spawned;
      return stdout;
    } catch (e) {
      const codeStr = e.code ? `(Code: ${e.code})` : '';
      console.error(`Rendering through ${config.executable} failed: ${e.message} ${codeStr}`);
      throw e;
    }
  };
};

const normalizeArgs = (data: Hexo.extend.RendererData, args: string[]) =>
  args
    .map(a =>
      Mustache.render(a, {
        filePath: data.path,
        env: process.env
      })
    )
    .filter(negate(isEmpty));

export default renderer;
