import Scene from "../Scene/Scene";
export interface IViewerCfg {
    [key: string]: any;
}
export default class Viwer {
    Scene: Scene;
    constructor(container: string | Element, option: IViewerCfg);
}
