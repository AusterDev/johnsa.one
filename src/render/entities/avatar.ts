import Entity, { type EntityStyle } from "../entity";
import type { Screen } from "../screen";

/**
 * A static entity that displays my avatar/profile picture in the center.
 */
export class Avatar extends Entity {
    constructor(screen: Screen) {
        
        super(screen, "avatar", screen.canvas.width / 2, screen.canvas.height / 2, { }, 120, 120);
    }
}