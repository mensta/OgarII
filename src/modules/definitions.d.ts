declare type Scale = number;
declare type Tick = number;
declare type Timestamp = number;
declare type Identifier = string;
declare type IPAddress = string;

declare type Indexed<T> = { [name: string]: T };
declare type Identified<T> = { [id: number]: T };
declare type Counter<T> = { [item: string]: number };

interface Point {
    x: Scale;
    y: Scale;
}
interface Vector {
    dx: Scale;
    dy: Scale;
}
interface Boost extends Vector {
    d: Scale;
}
interface Circle extends Point {
    s: Scale;
}
interface Rect extends Point {
    w: Scale;
    h: Scale;
}
interface Bound {
    t: Scale;
    l: Scale;
    b: Scale;
    r: Scale;
}
interface Quadrant {
    t: boolean;
    l: boolean;
    b: boolean;
    r: boolean;
}

interface Color {
    r: Scale;
    g: Scale;
    b: Scale;
}

interface ViewArea extends Rect {
    s: Scale;
}

type LogMessageData = any[];
type LogEventLevel = "DEBUG" | "ACCESS" | "INFO" | "WARN" | "ERROR" | "FATAL"
type LogEventHandler = (date: Date, level: LogEventLevel, message: string) => void;

declare type CellType = number;
/**
 * 0 None, 1 Rigid, 2 Eat, 3 EatInvd
 */
declare type CellEatResult = 0 | 1 | 2 | 3;
/**
 * -1 Idle, 0 Playing, 1 Spectating, 2 Roaming
 */
declare type PlayerState = -1 | 0 | 1 | 2;

interface FFALeaderboardEntry {
    me: boolean;
    name: string;
    cell: number;
    rank: number;
}
declare type LeaderboardType = "ffa" | "pie" | "text";
declare type LeaderboardDataType = {
    "ffa": FFALeaderboardEntry,
    "pie": number,
    "text": string
};
