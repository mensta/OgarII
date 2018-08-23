class Settings {
    store: Indexed<AnySetting>;
    [id: string]: AnySettingValue

    constructor();

    register(...items: AnySetting[]): void;
    reset(...ids?: SettingIdType[]): void;
    get(id: SettingIdType): AnySetting;
    set(id: SettingIdType, value: AnySettingValue): void;
    import(data: SerializedSettings): void;
    export(data: SerializedSettings): void;
}

export = Settings;
