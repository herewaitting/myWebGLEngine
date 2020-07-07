export interface ISceneCfg {
    [key: string]: any;
}
export interface ISceneOpt {
    canvas: Element;
    [key: string]: any;
}
export default class Scene {
    constructor(canvas: Element, config: ISceneCfg);
}
