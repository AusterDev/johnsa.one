import type { KeyInputProcessor } from "../processor/input.processor";
import Ball from "./entities/balls";
import { Border } from "./entities/border";
import Entity from "./entity";
import type { KinematicBody } from "./physical/kinematic";

export class Screen {
    public canvas: HTMLCanvasElement;
    public entities: Entity[];
    private lastFrameTime: number;
    public keyboard: KeyInputProcessor;

    constructor(canvas: HTMLCanvasElement, keyboard: KeyInputProcessor) {
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.entities = [new Border(this, "border", canvas.width, canvas.height - 10, {}), new Ball(this, "ball", 0, 0, {}, 32, 30), new Ball(this, "ball", 90, 0, { color: "green" }, 32, 30), new Ball(this, "ball", 50, 0, { color: "blue" }, 32, 30)];

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
                await entity.process(ctx, Math.min(dt, 0.033));
            }
            requestAnimationFrame(tick);
        };

        await tick();
    }
}