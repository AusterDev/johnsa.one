import type { EntityStyle } from "../entity";
import { KinematicBody } from "../physical/kinematic";
import { Screen } from "../screen";

export default class Ball extends KinematicBody {
    private gravity = 1200; // px/s^2
    private rest_velocity = 30; // px/s


    constructor(screen: Screen, id: string, x: number, y: number, style: EntityStyle, w?: number, h?: number) {
        super(screen, id, x, y, style, w, h)

    }
    public async update(dt: number): Promise<void> {
        this.acceleration.y = this.gravity;
        
        this.velocity.y += this.acceleration.y * dt;

        this.position.x += (this.velocity.x * dt)
        this.position.y += (this.velocity.y *dt)

        const impactSpeed = Math.abs(this.velocity.y);

        for (const en of this.screen.entities) {
            if (en.id !== "border") continue;

            const radius = this.width / 2;
            const borderTop = en.position.y;
            const pointOfContact = this.position.y + radius;

            if ((pointOfContact >= borderTop) && this.velocity.y >= 0) {
                this.position.y = borderTop - radius;

                if (impactSpeed < this.rest_velocity) {
                    this.velocity.y = 0;
                    this.acceleration.y = 0;
                } else {
                    this.velocity.y *= -1.0;
                }
            }
        }
    }

    protected async drawShape(ctx: CanvasRenderingContext2D): Promise<void> {
        const radius = this.width / 2;
        ctx.fillStyle = this.style.color || "red";
        ctx.beginPath();
        ctx.arc(this.position.x + radius, this.position.y + radius, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}