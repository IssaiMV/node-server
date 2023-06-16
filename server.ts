import http from 'http'
import https from 'https'
import { Application } from "express"
import { DI } from "./src/di/di"
import { Identifier } from "./src/di/identifiers"
import { ILogger } from "./src/utils/custom.logger"
import { Default } from "./src/utils/default"
import { Index } from "./src"
import { BackgroundService } from './src/background/background.service'

/**
 * Used only in development or test to load environment variables.
 * NOTE:
 *  For the development and testing environment, create the .env file
 *  in the root directory of your project.
 */

if ((process.env.NODE_ENV || Default.NODE_ENV) !== 'production') {
    require(`dotenv`).config()
}

const logger: ILogger = DI.getInstance().getContainer().get<ILogger>(Identifier.LOGGER)
const app: Application = (DI.getInstance().getContainer().get<Index>(Identifier.APP)).getExpress()
const backgroundServices: BackgroundService = DI.getInstance().getContainer().get(Identifier.BACKGROUND_SERVICE)
const port_http = process.env.PORT_HTTP || Default.PORT_HTTP
const port_https = process.env.PORT_HTTPS || Default.PORT_HTTPS

/**
 * SSL certificate is generated.
 * When accessed HTTP, is redirected to HTTPS.
 * Note: Should be used only in the production environment,
 * for the development and testing environment, HTTP should be used.
 */
if ((process.env.NODE_ENV || Default.NODE_ENV) === 'production') {
    /**
     * Returns an instance of node-greenlock with additional helper methods.
     * See {@link https://github.com/Daplie/greenlock-express} for more details.
     */
    const lex = require('greenlock-express').create({
        // set to https://acme-v02.api.letsencrypt.org/directory in production
        // set to https://acme-staging-v02.api.letsencrypt.org/directory in dev
        server: 'https://acme-v02.api.letsencrypt.org/directory',
        version: '1.0.0',
        // When set to true, this always accepts the LetsEncrypt TOS. When a string it checks the agreement url first.
        agreeTos: true,
        // Can be either of:
        // An explicit array of allowed domains such as [ 'example.com', 'www.example.com' ]
        // A callback function (opts, certs, cb) { cb(null, { options: opts, certs: certs }) }
        // for setting email, agreeTos, domains, etc (as shown in usage example above)
        approveDomains: ['mydomain.com', 'www.mydomain.com']
    })

    http.createServer(lex.middleware(require('redirect-https'))).listen(port_http)

    // handles your app
    https.createServer(lex.httpsOptions, lex.middleware(app))
        .listen(port_https, () => {
            backgroundServices.startServices()
            initListener()
            logger.debug(`Server HTTP running on port ${port_https}`)
        })
} else { // Development environment, test and others
    /**
     * Up Server HTTP.
     * Accessing http will be redirected to https.
     */
    http.createServer(app)
        .listen(port_http, () => {
            backgroundServices.startServices()
            uncaughtExceptioHandler()
            initListener()
            logger.info(`Server HTTP running on port ${port_http}`)
        })
}


function initListener(): void {
    process.on('SIGINT', () => {
        backgroundServices.stopServices()
        process.exit()
    })
}

function uncaughtExceptioHandler(): void {
    process.on('uncaughtException', (error) => {
        logger.error(`There was an uncaught error ${error.message}`)
        // eslint-disable-next-line no-process-exit
        process.exit(1)
    })

    // if the Promise is rejected this will catch it
    process.on('unhandledRejection', (reason, p) => {
        logger.error(`Unhandled Rejection at: ${p}, reason: ${reason}`)

        throw reason
    })
}


