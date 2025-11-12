import Entity from "../entity";
import Vector2D from "../vector";

export default class Ball extends Entity {
    private speed = 10;
    private direction = new Vector2D(1, 0);

    public async update(dt: number): Promise<void> {
        if (!this.lockMovements) {
            this.acceleration = this.direction.normalise().scale(this.speed * 0.5);

            this.velocity.x += this.acceleration.x * dt;
            this.velocity.y += this.acceleration.y * dt;

            this.position.x += (this.velocity.x * dt)
            this.position.y += (this.velocity.y * dt)

            console.log("gg")
        } 
    }

    protected async drawShape(ctx: CanvasRenderingContext2D): Promise<void> {
        console.log(this.position.x, this.position.y);

        const radius = this.width / 2;
        ctx.fillStyle = "red";
        ctx.beginPath();    
        ctx.arc(this.position.x + radius, this.position.y + radius, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    protected async clearShape(ctx: CanvasRenderingContext2D): Promise<void> {
        // ctx.clearRect(this.vector2D.x, this.vector2D.y, this.width, this.height)
    }
}