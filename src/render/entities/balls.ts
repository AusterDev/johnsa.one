import Entity from "../entity";

export default class Ball extends Entity {
    public async process(): Promise<void> {
        if (!this.lockMovements) {
            this.move(10, 10);
        } 
    }

    protected async drawShape(ctx: CanvasRenderingContext2D): Promise<void> {
        const radius = this.width / 2;
        ctx.beginPath();    
        ctx.arc(this.vector2D.x + radius, this.vector2D.y + radius, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    protected async clearShape(ctx: CanvasRenderingContext2D): Promise<void> {
        // ctx.clearRect(this.vector2D.x, this.vector2D.y, this.width, this.height)
    }
}