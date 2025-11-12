import Ball from "./entities/balls";
import Entity from "./entity";

export class Screen {
    public canvas: HTMLCanvasElement;
    private entities: Entity[];
    private lastFrameTime: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.entities = [new Ball(this, "ball", 0, 0, { color: "black" })];

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
                await entity.limitMovement();
            }
            requestAnimationFrame(tick);
        };

        await tick();
    }
}