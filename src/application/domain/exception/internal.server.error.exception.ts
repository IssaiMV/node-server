import { Exception } from './exception'

/**
 * Internal Server Error.
 *
 * @extends {Exception}
 */
export class InternalServerErrorException extends Exception {
    /**
     * Creates an instance of Internal Server Error.
     *
     * @param message Short message
     * @param description Detailed message
     */
    constructor(message: string, description?: string) {
        super(message, description)
        this.name = InternalServerErrorException.name

        Object.setPrototypeOf(this, InternalServerErrorException.prototype)
    }
}
