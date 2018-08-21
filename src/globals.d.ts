interface Position {
    x: number;
    y: number;
}
interface Range extends Position {
    w: number;
    h: number;
}
interface Quadrant {
    t: boolean;
    b: boolean;
    l: boolean;
    r: boolean;
}
interface ViewArea extends Range {
    s: number;
}
interface Color {
    r: number;
    g: number;
    b: number;
}
interface Boost {
    dx: number;
    dy: number;
    d: number;
}
interface Spawner {
    pelletCount: number;
}

interface ChatSource {
    name: string;
    isServer: string;
    color: Color;
}
interface FFALeaderboardEntry {
    name: string;
    highlighted: boolean;
    cellId: number;
    position: number;
}
interface WorldStats {
    limit: number;
    internal: number;
    external: number;
    playing: number;
    spectating: number;
    name: string;
    gamemode: string;
    loadTime: number;
    uptime: number;
}

declare type SettingIdType = string;
interface Setting<T> {
    id: SettingIdType;
    name: string;
    type: SettingType;
    current: T;
    default: T;
}
interface IntSetting extends Setting<number> {
    type: "int";
    minimum: number;
    maximum: number;
}
interface FloatSetting extends Setting<number> {
    type: "float";
    minimum: number;
    maximum: number;
}
interface BoolSetting extends Setting<boolean> {
    type: "bool";
}
interface StringSetting extends Setting<string> {
    type: "string";
}
interface OptionSetting extends Setting<string> {
    type: "option";
    options: string[];
}
interface SetSetting extends Setting<string[]> {
    type: "set";
}
declare type AnySetting = SettingTypes[SettingType];
declare type AnySettingValue = number | boolean | string;

declare type SettingType = "int" | "float" | "bool" | "string" | "option" | "set";
declare type SettingTypes = {
    "int": IntSetting;
    "float": FloatSetting;
    "bool": BoolSetting;
    "string": StringSetting;
    "option": OptionSetting;
    "set": SetSetting;
};

interface CommandGeneratorInfo {
    name: string;
    args: string;
    desc: string;
    exec: CommandExecutor;
}

declare type LogEvent = (date: Date, level: "DEBUG" | "ACCESS" | "INFO" | "WARN" | "ERROR" | "FATAL", message: string) => void;
declare type LogMessageData = any[];

/**
 * 0 None, 1 Rigid, 2 Eat, 3 EatInvd
 */
declare type CellEatResult = 0 | 1 | 2 | 3;
/**
 * -1 Idle, 0 Playing, 1 Spectating, 2 Roaming
 */
declare type PlayerState = -1 | 0 | 1 | 2;

declare type LeaderboardType = "ffa" | "pie" | "text";
declare type LeaderboardDataType = {
    "ffa": FFALeaderboardEntry,
    "pie": number,
    "text": string
};

declare type IPAddress = string;
declare type Indexed<T> = { [name: string]: T };
declare type Identified<T> = { [id: number]: T };
declare type Counter<T> = { [item: string]: number };
