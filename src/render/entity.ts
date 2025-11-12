import { Screen } from "./screen";
import Vector2D from "./vector";

export type EntityStyle = {
    color?: string | CanvasGradient | CanvasPattern,
    stroke?: string | CanvasGradient | CanvasPattern,
};

/**
 * Represent an entity in canvas/screen.
 * An entity is an abstract object with properties in the digtal landscape (in this sense, the canvas).
 */
export default class Entity {
    public id: string;
    public position: Vector2D;
    public style: EntityStyle;
    public width: number;
    public height: number;
    public velocity: Vector2D;
    public acceleration: Vector2D;

    protected lockMovements: boolean = false;

    private screen: Screen;

    constructor(screen: Screen, id: string, x: number, y: number, style: EntityStyle, w: number = 20, h: number = 20) {
        this.screen = screen;

        this.id = id;
        this.position = new Vector2D(x, y);
        this.style = style;

        this.width = w;
        this.height = h;
        this.velocity = new Vector2D(0, 0);
        this.acceleration = new Vector2D(0,0);
    }

    public async update(dt: number): Promise<void> { }

    protected async drawShape(ctx: CanvasRenderingContext2D) { }

    protected async clearShape(ctx: CanvasRenderingContext2D) { }

    public async process(ctx: CanvasRenderingContext2D, dt: number) {
        if (this.style.color) ctx.fillStyle = this.style.color;
        if (this.style.stroke) ctx.strokeStyle = this.style.stroke;


        await this.update(dt);
        await this.drawShape(ctx);
        await this.clearShape(ctx);
    }

    public async limitMovement() {
        if (this.position.x >= (this.screen.canvas.width - 10) || this.position.y >= (this.screen.canvas.height - 10)) {
            this.lockMovements = true;
        }

    }
}