/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-07 10:35:32
 * @LastEditors: STC
 * @LastEditTime: 2020-07-07 10:41:28
 */ 

export interface ISceneCfg {
    [key: string] : any;
}

export interface ISceneOpt{
    canvas: Element;
    [key: string] : any;
}

export default class Scene {
    constructor(canvas: Element, config: ISceneCfg) {

    }
}
