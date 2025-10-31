import Ball from "./entities/balls";
import Entity from "./entity";

export class Screen {
    public canvas: HTMLCanvasElement;
    private entities: Entity[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.entities = [new Ball(this, "ball", 0, 0, { color: "black" })];
    }

    public async frame() {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported");

        const render = async () => {
            ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            for (const entity of this.entities) {
                await entity.draw2D(ctx);
                await entity.limitMovement();
            }
            requestAnimationFrame(render);
        };

        await render();
    }    
}