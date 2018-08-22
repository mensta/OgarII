const stringBoolValues = ["true", "on", "false", "off"];

class Settings {
    constructor() {
        /** @type {Indexed<AnySetting>} */
        this.store = { };
    }

    /** @param {AnySetting[]} items */
    register(...items) {
        for (let i = 0, l = items.length; i < l; i++) {
            const setting = items[i];
            if (this.store.hasOwnProperty(setting.id))
                throw new Error(`${id}: already registered`);
            this.store[setting.id] = setting;
            this[setting.id] = setting.current = setting.default;
        }
    }

    /**
     * @param {SettingIdType[]=} ids
     */
    reset(...ids) {
        ids = ids.length > 0 ? ids : Object.keys(this.store);
        for (let i = 0, l = ids.length, setting; i < l; i++)
            setting = this.get(ids[i]), this[setting.id] = setting.current = setting.default;
    }
    /**
     * @param {SettingIdType} id
     */
    get(id) {
        if (!this.store.hasOwnProperty(id))
            throw new Error(`${id}: not registered`);
        return this.store[id];
    }
    /**
     * @param {SettingIdType} id
     * @param {AnySettingValue} value
     */
    set(id, value) {
        if (!this.store.hasOwnProperty(id))
            throw new Error(`${id}: not registered`);
        const setting = this.store[id];
        let problem = "", index;
        switch (setting.type) {
            case "int":
                if (value == null) problem = `value cannot be null for type int`;
                else {
                    if (typeof value === "string") value = parseInt(value);
                    else if (typeof value !== "number" || isNaN(value)) problem = `value '${value}' is not applicable for int type`;
                    else if (!isNaN(value = Math.floor(value)) && setting.minimum != null && value < setting.minimum)
                        problem = `value ${value} is below minimum of setting ${setting.minimum}`;
                    else if (setting.maximum != null && value > setting.maximum)
                        problem = `value ${value} is above maximum of setting ${setting.maximum}`;
                }
                break;
            case "float":
                if (value == null) problem = `value cannot be null for type float`;
                else {
                    if (typeof value === "string") value = parseFloat(value);
                    else if (typeof value !== "number" || isNaN(value)) problem = `value '${value}' is not applicable for int type`;
                    else if (setting.minimum != null && value < setting.minimum)
                        problem = `value ${value} is below minimum of setting ${setting.minimum}`;
                    else if (setting.maximum != null && value > setting.maximum)
                        problem = `value ${value} is above maximum of setting ${setting.maximum}`;
                }
                break;
            case "bool":
                if (value == null) problem = `value cannot be null for type bool`;
                else if (typeof value === "string") {
                    index = stringBoolValues.indexOf(value);
                    if (index === -1) problem = `value '${value}' is not applicable for boolean type - use true, false, "true", "false", "on", "off"`;
                    else value = index >= 2 ? false : true;
                }
                break;
            case "string":
                if (value == null) problem = `value cannot be null for type string`;
                break;
            case "option":
                if (value == null) problem = `value cannot be null for type option`;
                index = setting.options.indexOf(value);
                if (index === -1) problem = `value '${value}' is not applicable for options [${setting.options.join(", ")}]`;
                break;
            case "set":
                if (value == null) value = [];
                if (!(value instanceof Array)) problem = `value cannot be null for type set`;
                for (let i = 0; i < value.length; i++)
                    if (typeof value[i] !== "string") { problem = `value '${value[i]}' is not applicable for type set`; break; }
                break;
        }
        if (problem) throw Object.assign(new Error(`${id}: ${problem}`), { value: value, setting: setting });
        this[id] = this.store[id].current = value;
    }

    /**
     * @param {SerializedSettings} data
     */
    import(data) {
        let keysS = Object.keys(data), keysD = Object.keys(this.store);
        for (let i = 0, l = keysS.length; i < l; i++) {
            this.set(keysS[i], data[keysS[i]]);
            keysD.splice(keysD.indexOf(keysS[i]), 1);
        }
        if (keysD.length > 0) throw new Error(`${keysD.join(", ")}: these settings do not have their values`);
    }

    /**
     * @returns {SerializedSettings}
     */
    export() {
        const mapped = { };
        for (let keys = Object.keys(this.store), i = 0, l = keys.length; i < l; i++)
            mapped[keys[i]] = this.store[keys[i]].current;
        return mapped;
    }
}

module.exports = Settings;
