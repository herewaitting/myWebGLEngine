import Event from "../Core/Event";
export interface ISceneCfg {
    width: number;
    height: number;
    [key: string]: any;
}
export interface ISceneOpt {
    canvas: Element;
    [key: string]: any;
}
export default class Scene {
    contextGL: any;
    beforeRender: Event;
    beforePostPrecess: Event;
    renderError: Event;
    constructor(canvas: Element, config: ISceneCfg);
}
