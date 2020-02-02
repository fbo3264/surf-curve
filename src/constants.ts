import {Point} from "./app/player/Point";

export const FIELD_WIDTH = 600;
export const FIELD_HEIGHT = 400;

export const ROTATION_STEP = 5;
export const TRANSLATION_STEP = 2;
export const ROTATE_BOOST_DURATION: number = 3000;
export const ROTATE_BOOST_FACTOR = 3;

export const GAME_LOOP_INTERVAL = 30;

export enum INPUT_ACTION {
    ROTATE_LEFT, ROTATE_RIGHT, ROTATE_BOOST
}

export interface KeyAction {
    code: string;
    action: INPUT_ACTION;
}

export const DEFAULT_KEYMAP: Record<number, KeyAction[]> = {
    0: [{code: '37', action: INPUT_ACTION.ROTATE_LEFT}, {code: '39', action: INPUT_ACTION.ROTATE_RIGHT}, {
        code: '187',
        action: INPUT_ACTION.ROTATE_BOOST
    }],
    1: [{code: '65', action: INPUT_ACTION.ROTATE_LEFT}, {code: '68', action: INPUT_ACTION.ROTATE_RIGHT}],
    2: [{code: '77', action: INPUT_ACTION.ROTATE_LEFT}, {code: '78', action: INPUT_ACTION.ROTATE_RIGHT}],
    3: [{code: '', action: INPUT_ACTION.ROTATE_LEFT}, {code: '68', action: INPUT_ACTION.ROTATE_RIGHT}]
};

const startPosX = FIELD_WIDTH / 2;
const startPosY = FIELD_HEIGHT / 2;
export const START_POSITIONS: any[] = [{point: {x: startPosX, y: startPosY}, angle: 90},
    {point: {x: startPosX, y: startPosY}, angle: 0},
    {point: {x: startPosX, y: startPosY}, angle: 180},
    {point: {x: startPosX, y: startPosY}, angle: 270},
];

export const COLORS = ["red", "green", "black", "blue"];