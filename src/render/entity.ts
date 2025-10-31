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
    public vector2D: Vector2D;
    public style: EntityStyle;
    public width: number;
    public height: number;
    public speed: number;

    protected lockMovements: boolean = false;

    private screen: Screen;

    constructor(screen: Screen, id: string, x: number, y: number, style: EntityStyle, speed: number = 10, w: number = 20, h: number = 20) {
        this.screen = screen;

        this.id = id;
        this.vector2D = new Vector2D(x, y);
        this.style = style;

        this.width = w;
        this.height = h;
        this.speed = speed;
    }

    public async process(): Promise<void> { }

    protected async drawShape(ctx: CanvasRenderingContext2D) { }

    protected async clearShape(ctx: CanvasRenderingContext2D) { }

    public move(dx: number, dy: number) {
        this.vector2D.move(dx, dy);
    }

    public async draw2D(ctx: CanvasRenderingContext2D) {
        if (this.style.color) ctx.fillStyle = this.style.color;
        if (this.style.stroke) ctx.strokeStyle = this.style.stroke;


        await this.process();
        await this.drawShape(ctx);
        await this.clearShape(ctx);
    }

    public async limitMovement() {

        if (this.vector2D.x >= (this.screen.canvas.width - 10) || this.vector2D.y >= (this.screen.canvas.height - 10)) {
            this.lockMovements = true;
        }

    }
}