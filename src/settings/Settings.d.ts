class Settings {
    private store: Indexed<AnySetting>;
    public [id: string]: AnySettingValue;

    public register(...items: AnySetting[]): void;
    public reset(...ids?: SettingIdType[]): void;
    public get(id: SettingIdType): AnySetting;
    public set(id: SettingIdType, value: AnySettingValue): void;
    public import(data: SerializedSettings): void;
    public export(data: SerializedSettings): void;
}

export = Settings;
