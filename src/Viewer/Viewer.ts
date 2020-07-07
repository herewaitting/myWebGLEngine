/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-07 09:41:10
 * @LastEditors: STC
 * @LastEditTime: 2020-07-07 13:37:42
 */ 

import define from "../Core/defined";
import Scene from "../Scene/Scene";
export interface IViewerCfg{
    [key: string]: any;
}

const defaultCfg = {

}

const create3DContext = (canvas: Element, opt_attribs: any) => {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = (canvas as any).getContext(names[ii], opt_attribs);
      } catch(e) {}
      if (context) {
        break;
      }
    }
    return context;
}

//window.devicePixelRatio

export default class Viwer{
    public Scene!: Scene;
    constructor(container: string | Element, option: IViewerCfg) {
        if (!define(container)) {
            return;
        }
        if (typeof container === "string") {
            const containerEle = document.getElementById(container);
            if (containerEle) {
                const innerContainerDiv = document.createElement("div");
                innerContainerDiv.className = "stc-gl-innerDiv";
                const sceneCanvas = document.createElement("canvas");
                innerContainerDiv.appendChild(sceneCanvas);
                containerEle.appendChild(innerContainerDiv);
                this.Scene = new Scene(sceneCanvas, {});
            }
        }
    }
}