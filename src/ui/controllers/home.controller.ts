import HttpStatus from 'http-status-codes'
import { controller, httpGet, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { inject } from 'inversify';
import { Identifier } from '../../di/identifiers';
import { ILogger } from '../../utils/custom.logger';

/**
 * Controller that implements Home feature operations.
 * @remarks
 * To define paths, we use library inversify-express-utils.
 *
 * @see {@link https://github.com/inversify/inversify-express-utils} for further information.
 */
@controller('/hola')
export class HomeController {

    /**
     * Creates an instance of RoleController.
     *
     * @param {ILogger} _logger
     */
    constructor(
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
    }

    /**
     * List APIRest information.
     *
     * @returns void
     */
    @httpGet('/')
    public getReference(@request() _req: Request, @response() res: Response) {
        this._logger.debug('Home Controller');
        return res.status(HttpStatus.OK).send('Hola')
    }
}

