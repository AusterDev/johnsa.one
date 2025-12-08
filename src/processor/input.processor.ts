/**
 * Map a key to a single function.
 */
export type KeyMap = {
    label: string;
    engaged: boolean;
    fnEngage: () => Promise<void>;
    fnRelease: () => Promise<void>;
    key: string;
}

export class KeyInputProcessor {
    public map: Map<string, KeyMap>;

    constructor() {
        this.map = new Map();
    }

    public onkeyDown(e: KeyboardEvent) {
        console.log(e.code)
        const obj = this.map.get(e.code);

        if (obj) {
            (async () => {
                await obj.fnEngage();
                obj.engaged = true;
            })()
        }
    }

    public onKeyUp(e: KeyboardEvent) {
        console.log(e.code)
        const obj = this.map.get(e.code);

        if (obj) {
            (async () => {
                await obj.fnRelease();
                obj.engaged = false;
            })()
        }
    }
}