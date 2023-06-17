import { Exception } from './exception'

/**
 * Unauthorized exception.
 *
 * @extends {Exception}
 */
export class UnauthorizedException extends Exception {
    /**
     * Creates an instance of UnauthorizedException.
     *
     * @param message Short message
     * @param description Detailed message
     */
    constructor(message: string, description?: string) {
        super(message, description)
        this.name = UnauthorizedException.name

        Object.setPrototypeOf(this, UnauthorizedException.prototype)
    }
}
