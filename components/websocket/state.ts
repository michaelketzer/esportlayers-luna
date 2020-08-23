import dayjs from 'dayjs';
import { BetRoundStats } from '@streamdota/shared-types';

enum ACTIONS {
    NEW_MESSAGE = 'NEW_MESSAGE',
}

export enum MessageType {
    chat = 'chat',
    gamestate = 'gamestate',
    connected = 'connected',
    winner = 'winner',
    betting = 'betting',
    roshan = 'roshan',
    pause='pause',
}

export interface BaseMessage {
    type: MessageType;
    date: number;
}

export enum GameState {
    DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD = 'DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD',
    DOTA_GAMERULES_STATE_HERO_SELECTION = 'DOTA_GAMERULES_STATE_HERO_SELECTION',
    DOTA_GAMERULES_STATE_STRATEGY_TIME = 'DOTA_GAMERULES_STATE_STRATEGY_TIME',
    DOTA_GAMERULES_STATE_TEAM_SHOWCASE = 'DOTA_GAMERULES_STATE_TEAM_SHOWCASE',
    DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD = 'DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD',
    DOTA_GAMERULES_STATE_PRE_GAME = 'DOTA_GAMERULES_STATE_PRE_GAME',
    DOTA_GAMERULES_STATE_GAME_IN_PROGRESS = 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS',
    DOTA_GAMERULES_STATE_POST_GAME = 'DOTA_GAMERULES_STATE_POST_GAME'
}

export interface GameStateMessage extends BaseMessage {
    type: MessageType.gamestate;
    value: GameState;  
};

export interface WinnerMessage extends BaseMessage {
    type: MessageType.winner;
    value: boolean;
}

export interface ChatMessage extends BaseMessage  {
    type: MessageType.chat;
    value: {
        user: string;
        message: string;
    };
}
export interface BettingMessage extends BaseMessage {
    type: MessageType.betting;
    value: BetRoundStats;
}
export interface ConnectedMessage extends BaseMessage {
    type: MessageType.connected;
    value: boolean;
}
export interface RoshanMessage extends BaseMessage {
    type: MessageType.roshan;
    value: {
        state: 'alive' | 'respawn_base' | 'respawn_variable' | 'aegis';
        remaining: number;
    };
}
export interface PauseMessage extends BaseMessage {
    type: MessageType.pause;
    value: boolean;
}

export type Message =  GameStateMessage | WinnerMessage | ChatMessage | BettingMessage | ConnectedMessage | RoshanMessage | PauseMessage;

export function isRoshanMessage(msg: Message): msg is RoshanMessage {
    return msg.type === MessageType.roshan;
}

export function isWinnerMessage(msg: Message): msg is WinnerMessage {
    return msg.type === MessageType.winner;
}

export function isPauseMessage(msg: Message): msg is PauseMessage {
    return msg.type === MessageType.pause;
}

export function isConnectedMessgae(msg: Message): msg is ConnectedMessage {
    return msg.type === MessageType.connected;
}

export function isGameStateMessage(msg: Message): msg is GameStateMessage {
    return msg.type === MessageType.gamestate;
}

interface NewMessageAction {
    type: typeof ACTIONS.NEW_MESSAGE;
    message: Message;
}

export interface State {
    messages: Array<Message>;
}

export const initialState: State = {
    messages: [],
};

export const reducer = (state: State, action: NewMessageAction) => {
    switch (action.type) {
        case ACTIONS.NEW_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.message,
                ],
            };
        default:
            return state;
    }
};

export function newMessage(message: Message): NewMessageAction {
    return {
        message: {
            ...message,
            date: dayjs().unix(),
        },
        type: ACTIONS.NEW_MESSAGE,
    };
}