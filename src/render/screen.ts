import type { KeyInputProcessor } from "../processor/input.processor";
import Bucket from "./entities/bucket";
import Entity from "./entity";
import type { KinematicBody } from "./physical/kinematic";

export class Screen {
    public canvas: HTMLCanvasElement;
    private entities: Entity[];
    private lastFrameTime: number;
    public keyboard: KeyInputProcessor;

    constructor(canvas: HTMLCanvasElement, keyboard: KeyInputProcessor) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        
        this.entities = [new Bucket(this, "bucket", Math.round(canvas.width / 2), Math.round(canvas.height / 2), 10, 10)];

        this.lastFrameTime = Date.now();
    }

    public async frame() {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported");

        const tick = async () => {
            const dt = (Date.now() - this.lastFrameTime) / 1000;
            this.lastFrameTime = Date.now();

            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for (const entity of this.entities) {
                await entity.process(ctx, dt);
                
                if (entity.body === "kinematic") {
                    const body = entity as KinematicBody;
                    await body.limitMovement();
                }
            }
            requestAnimationFrame(tick);
        };

        await tick();
    }
}