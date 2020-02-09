export const ROTATION_STEP = 5;
export const TRANSLATION_STEP = 3;
export const GAP_STEP_SIZE = TRANSLATION_STEP * 3;
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
