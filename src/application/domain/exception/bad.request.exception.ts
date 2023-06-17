import { Exception } from './exception'

/**
 * Bad request exception.
 *
 * @extends {Exception}
 */
export class BadRequestException extends Exception {
    /**
     * Creates an instance of BadRequestException.
     *
     * @param message Short message
     * @param description Detailed message
     */
    constructor(message: string, description?: string) {
        super(message, description)
        this.name = BadRequestException.name

        Object.setPrototypeOf(this, BadRequestException.prototype)
    }
}
