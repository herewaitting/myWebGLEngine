/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-07 10:35:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-14 19:31:56
 */ 
import defined from "../Core/defined";
import { DeveloperError } from "../Core/DeveloperError";
import Event from "../Core/Event";

export interface ISceneCfg {
    width: number;
    height: number;
    [key: string] : any;
}

export interface ISceneOpt{
    canvas: Element;
    [key: string] : any;
}

const defaultContextAtt = {
    alpha: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: true,
    powerPreference: "default",
    premultipliedAlpha: true,
    preserveDrawingBuffer: true,
    stencil: true
}

const create3DContext = (canvas: Element) => {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = (canvas as any).getContext(names[ii], defaultContextAtt);
      } catch(e) {}
      if (context) {
        break;
      }
    }
    return context;
}

export default class Scene {
    public contextGL: any;
    public beforeRender: Event = new Event(); 
    public beforePostPrecess: Event = new Event();
    public renderError: Event = new Event();
    constructor(canvas: Element, config: ISceneCfg) {
        if (!defined(canvas)) {
            throw new DeveloperError("options and options.canvas are required.");
        }
        this.contextGL = create3DContext(canvas);
        if (!defined(this.contextGL)) {
            throw new DeveloperError("创建canvas上下文失败！");
        }
    }
}
