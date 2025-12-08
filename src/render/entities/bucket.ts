import type Entity from "../entity";
import type { EntityStyle } from "../entity";
import { KinematicBody } from "../physical/kinematic";
import { Screen } from "../screen";
import Vector2D from "../vector";

export default class Bucket extends KinematicBody {
    private speed = 5;

    constructor(screen: Screen, id: string, x: number, y: number, w: number = 20, h: number = 20) {
        const style: EntityStyle = {
            color: "red"
        }

        super(screen, id, x, y, style, w, h);
    }

    protected async drawShape(ctx: CanvasRenderingContext2D): Promise<void> {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    public async update(dt: number) {
        
    }


}