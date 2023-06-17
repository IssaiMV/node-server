import { Exception } from './exception'

/**
 * Not Implemented exception.
 *
 * @extends {Exception}
 */
export class NotImplementedException extends Exception {
    /**
     * Creates an instance of NotImplementedException.
     *
     * @param message Short message
     * @param description Detailed message
     */
    constructor(message: string, description?: string) {
        super(message, description)
        this.name = NotImplementedException.name

        Object.setPrototypeOf(this, NotImplementedException.prototype)
    }
}
