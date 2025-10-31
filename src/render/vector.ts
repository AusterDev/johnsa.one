/**
 * Position vector that describes the position of an entity.
 */
export default class Vector2D {
    public x: number;
    public y: number;

    constructor(initialX: number, initialY: number) {
        this.x = initialX;
        this.y = initialY;
    }

    /**
     * Update the x-position of the vector.
     * @param x Signed number — add to the current x-position.
     */
    public moveX(dx: number) {
        this.x += dx;
    }

    /**
     * Update the y-position of the vector.
     * @param y Signed number — add to the current y-position.
     */
    public moveY(dy: number) {
        this.y += dy;
    }

    public move(dx: number, dy: number) {
        this.moveX(dx);
        this.moveY(dy);
    }
}
