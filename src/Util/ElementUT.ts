/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-07 10:14:56
 * @LastEditors: STC
 * @LastEditTime: 2020-07-07 14:12:23
 */ 

export interface ICanvasOpt {
    id: string;
}

export const CreateCanvas = () => {
    
}

export const GetWindowSize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}
