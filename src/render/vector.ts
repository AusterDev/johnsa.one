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

    public length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    public normalise() {
        const len = this.length();
        if (len === 0) return new Vector2D(0, 0);
        return new Vector2D(this.x / len, this.y / len);
    }

    public scale(scaler: number) {
        return new Vector2D(this.x * scaler, this.y * scaler)
    }
}

/**
 * Direction of the vector in a unit plane.
 */
export const Direction = {
    Right: [1, 0],
    Left: [-1, 0],
    Up: [0, 1],
    Down: [0, -1],
}