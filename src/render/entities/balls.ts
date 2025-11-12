import Entity from "../entity";
import Vector2D from "../vector";

export default class Ball extends Entity {
    private speed = 5;
    private direction = new Vector2D(1, 0);

    public async update(dt: number): Promise<void> {
        if (!this.lockMovements) {
            const nrmalised = this.direction.normalise();
            console.log(nrmalised)
            this.acceleration = nrmalised.scale(this.speed * 0.5);
            console.log(this.acceleration)
            this.velocity.x += this.acceleration.x * dt;
            this.velocity.y += this.acceleration.y * dt;

            this.position.x += (this.velocity.x * dt)
            this.position.y += (this.velocity.y * dt)
            console.log(this.position)
            return
        } 
    }

    protected async drawShape(ctx: CanvasRenderingContext2D): Promise<void> {
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