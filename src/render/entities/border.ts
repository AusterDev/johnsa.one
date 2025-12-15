import Entity from "../entity";

export class Border extends Entity {
    async update(dt: number): Promise<void> {
        // this.position.x = this.screen.canvas.width;
        // this.position.y = this.screen.canvas.height - 10;

        // console.log(this.position)
    }

    protected async drawShape(ctx: CanvasRenderingContext2D): Promise<void> {
        ctx.fillStyle = "black";
        ctx.fillRect(0, Math.round(this.position.y), Math.round(this.position.x), 10);
    }
}