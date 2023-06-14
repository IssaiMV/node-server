import 'reflect-metadata'
import cors from 'cors'
import qs from 'query-strings-parser'
import express, { Application, Request, Response } from 'express'
import { Container, inject, injectable } from "inversify"
import { Identifier } from './di/identifiers'
import { ILogger } from './utils/custom.logger'
import { DI } from './di/di'
import HttpStatus from 'http-status-codes'
import { InversifyExpressServer } from 'inversify-express-utils'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { ApiException } from './ui/exceptions/api.exception'

/**
 * Implementation of class Index.
 * You must initialize all application settings,
 * such as dependency injection and middleware settings.
 */
@injectable()
export class Index {
    private readonly container: Container
    private express: Application

    /**
     * Origin configuration for CORS.
     * If you have more origins you would like to add, you can add them to the array below.
     */
    readonly allowedOrigins = ['*']
    readonly allowedMethods = ['*']
    readonly allowedHeaders = ['*']
    readonly options: cors.CorsOptions = {
        origin: this.allowedOrigins,
        methods: this.allowedMethods,
        allowedHeaders: this.allowedHeaders
    }

    /**
     * Creates an instance of Index.
     */
    constructor(@inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
        this.express = express()
        this.container = DI.getInstance().getContainer()
        this.bootstrap()
    }

    /**
     * Get express instance.
     *
     * @return {Application}
     */
    public getExpress(): Application {
        return this.express
    }

    /**
     * Initialize app settings.
     *
     * @private
     * @return void
     */
    private bootstrap(): void {
        this.middleware()
    }

    /**
     * Initialize middleware.
     *
     * @private
     * @return void
     */
    private middleware(): void {
        const inversifyExpress: InversifyExpressServer = new InversifyExpressServer(
            this.container, null, { rootPath: '/api/v1' })



        inversifyExpress.setConfig((app) => {
            // for handling query strings
            // {@link https://www.npmjs.com/package/query-strings-parser}
            app.use(qs({ use_page: true, default: { pagination: { limit: 20 }, sort: { created_at: 'desc' } } }))

            // helps you secure your Express apps by setting various HTTP headers.
            // {@link https://www.npmjs.com/package/helmet}
            app.use(helmet())

            // onfiguration for CORS
            app.use(cors(this.options))

            // create application/json parser
            // {@link https://www.npmjs.com/package/body-parser}
            app.use(bodyParser.json())
            // create application/x-www-form-urlencoded parser
            app.use(bodyParser.urlencoded({ extended: false }))

            app.use(morgan(':remote-addr :remote-user ":method :url HTTP/:http-version" ' +
                ':status :res[content-length] :response-time ms ":referrer" ":user-agent"', {
                stream: { write: (str: string) => this._logger.info(str) }
            }
            ))

        })
        this.express = inversifyExpress.build()
        this.handleError()
    }

    /**
     * Initializes error routes available in the application.
     *
     * @private
     * @return void
     */
    private handleError(): void {
        // Handle 404
        this.express.use((req: Request, res: Response) => {
            const errorMessage: ApiException = new ApiException(404, `${req.url} not found.`,
                `Specified resource: ${req.url} was not found or does not exist.`)
            res.status(HttpStatus.NOT_FOUND).send(errorMessage.toJson())
        })

        // Handle 500
        this.express.use((err: any, _req: Request, res: Response) => {
            res.locals
            const errorMessage: ApiException = new ApiException(err.code, err.message, err.description)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorMessage.toJson())
        })
    }

}
