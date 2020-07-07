/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-07 09:41:10
 * @LastEditors: STC
 * @LastEditTime: 2020-07-07 14:22:45
 */ 

import define from "../Core/defined";
import Scene from "../Scene/Scene";
import { GetWindowSize } from "../Util/ElementUT"; 
export interface IViewerCfg{
    [key: string]: any;
}

const defaultCfg = {

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
                const winSize = GetWindowSize();
                sceneCanvas.width = winSize.width;
                sceneCanvas.height = winSize.height;
                innerContainerDiv.appendChild(sceneCanvas);
                containerEle.appendChild(innerContainerDiv);
                this.Scene = new Scene(sceneCanvas, {
                    width: winSize.width,
                    height: winSize.height
                });
            }
        }
    }
}