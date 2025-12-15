import { KinematicBody } from "../physical/kinematic";
import Vector2D from "../vector";

export default class Ball extends KinematicBody {
    private speed = 120;
    private direction = new Vector2D(0, 1);
    private gravity = 1200; // px/s^2
    private rest_velocity = 30; // px/s

    public async update(dt: number): Promise<void> {
        let collided = false;

        for (const en of this.screen.entities) {
            if (en.id !== "border") continue;

            const borderTop = en.position.y;
            const ballBottom = this.position.y + this.height;

            if ((borderTop <= ballBottom) && this.velocity.y > 0) {
                collided = true;

                this.position.y = borderTop - this.height;

                if (Math.abs(this.velocity.y) < this.rest_velocity) {
                    this.velocity.y = 0;
                    this.acceleration.y = 0;
                    console.log("killed")
                } else {
                    this.velocity.y *= -0.9;
                }
            }
        }

        if (!collided) {
            this.acceleration.y = this.gravity;

            this.velocity.x += this.acceleration.x * dt;
            this.velocity.y += this.acceleration.y * dt;

        }

        this.position.x += (this.velocity.x * dt)
        this.position.y += (this.velocity.y * dt)
    }

    protected async drawShape(ctx: CanvasRenderingContext2D): Promise<void> {
        const radius = this.width / 2;
        ctx.fillStyle = this.style.color || "red";
        ctx.beginPath();
        ctx.arc(Math.round(this.position.x + radius), Math.round(this.position.y + radius), radius, 0, Math.PI * 2);
        ctx.fill();
    }

    protected async clearShape(ctx: CanvasRenderingContext2D): Promise<void> {
        // ctx.clearRect(this.vector2D.x, this.vector2D.y, this.width, this.height)
    }
}