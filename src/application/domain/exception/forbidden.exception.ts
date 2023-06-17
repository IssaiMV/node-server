import { Exception } from './exception'

/**
 * Forbidden exception.
 *
 * @extends {Exception}
 */
export class ForbiddenException extends Exception {
    /**
     * Creates an instance of ForbiddenException.
     *
     * @param message Short message
     * @param description Detailed message
     */
    constructor(message: string, description?: string) {
        super(message, description)
        this.name = ForbiddenException.name

        Object.setPrototypeOf(this, ForbiddenException.prototype)
    }
}
