const stringBoolValues = ["true", "on", "false", "off"];

class Settings {
    constructor() {
        /** @type {Indexed<SettingTypes[SettingType]>} */
        this.store = { };
    }

    /** @param {AnySetting[]} items */
    register(...items) {
        for (let i = 0, l = items.length; i < l; i++) {
            const setting = items[i];
            if (this.store.hasOwnProperty(setting.id))
                throw new Error(`a setting with id ${setting.id} already exists`);
            this.store[setting.id] = setting;
        }
    }

    /**
     * @param {SettingIdType[]=} ids
     */
    reset(...ids) {
        ids = ids.length > 0 ? ids : Object.keys(this.store);
        for (let i = 0, l = ids.length, setting; i < l; i++)
            setting = this.get(ids[i]), setting.current = setting.default;
    }
    /**
     * @param {SettingIdType} id
     */
    get(id) {
        if (!this.store.hasOwnProperty(id))
            throw new Error(`a setting with id ${id} doesn't exist`);
        return this.store[id];
    }
    /**
     * @param {SettingIdType} id
     * @param {AnySettingValue} value
     */
    getValue(id) {
        if (!this.store.hasOwnProperty(id))
            throw new Error(`a setting with id ${id} doesn't exist`);
        return this.store[id].current;
    }
    /**
     * @param {SettingIdType} id
     * @param {AnySettingValue} value
     */
    set(id, value) {
        if (!this.store.hasOwnProperty(id))
            throw new Error(`a setting with id ${id} doesn't exist`);
        const setting = this.store[id];
        let accepted = true, index;
        switch (setting.type) {
            case "int":
                if (value == null) accepted = false;
                else {
                    if (typeof value === "string") value = parseInt(value);
                    if (typeof value !== "number") accepted = false;
                    if (value > setting.maximum || value < setting.minimum)
                        accepted = false;
                }
                break;
            case "float":
                if (value == null) accepted = false;
                else {
                    if (typeof value === "string") value = parseFloat(value);
                    else if (typeof value !== "number") accepted = false;
                    else if (value > setting.maximum || value < setting.minimum)
                        accepted = false;
                }
                break;
            case "bool":
                if (value == null) accepted = false;
                else if (typeof value === "string") {
                    index = stringBoolValues.indexOf(value);
                    if (index === -1) accepted = false;
                    else value = index >= 2 ? false : true;
                }
                break;
            case "string": break;
            case "option":
                index = setting.options.indexOf(value);
                if (index === -1) accepted = false;
                break;
            case "set": break;
        }
        if (!accepted)
            throw new Error(`value '${value}' is not applicable for setting type ${setting.type}`);
        this.store[id].current = value;
    }

    /**
     * @param {Indexed<AnySettingValue>} data
     */
    loadSerialized(data) {

    }

    /**
     * @returns {Indexed<AnySettingValue>}
     */
    serializable() {
        const mapped = { };
        for (let keys = Object.keys(this.store), i = 0, l = keys.length ; i < l; i++)
            mapped[keys[i]] = this.store[keys[i]].current;
        return mapped;
    }
}

module.exports = Settings;
