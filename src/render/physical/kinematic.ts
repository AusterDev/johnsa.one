import Entity, { type EntityStyle } from "../entity";
import type { Screen } from "../screen";
import Vector2D from "../vector";

export class KinematicBody extends Entity {
    public velocity: Vector2D;
    public acceleration: Vector2D;

    constructor(screen: Screen, id: string, x: number, y: number, style: EntityStyle, w: number = 20, h: number = 20) {
        super(screen, id, x, y, style, w, h);

        this.body = "kinematic";
        
        this.velocity = new Vector2D(0, 0);
        this.acceleration = new Vector2D(0, 0);
    }

    public async limitMovement() {
        // if (this.position.x >= (this.screen.canvas.width - 10) || this.position.y >= (this.screen.canvas.height - 10)) {
        //     this.lockMovements = true;
        // }

    }
}