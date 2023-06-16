import 'reflect-metadata'
import { Container } from 'inversify'
import { CustomLogger, ILogger } from '../utils/custom.logger'
import { Identifier } from './identifiers'
import { Index } from '..'
import { HomeController } from '../ui/controllers/home.controller'
import { IConnectionFactory } from '../infrastructure/port/connection.factory.interface'
import { PgConnectionFactory } from '../infrastructure/database/pg.connection.factory'
import { IDBConnection } from '../infrastructure/port/db.connection.interface'
import { PgConnection } from '../infrastructure/database/pg.connection'
import { BackgroundService } from '../background/background.service'

export class DI {
    private static instance: DI
    private readonly container: Container

    /**
     * Creates an instance of DI.
     *
     * @private
     */
    private constructor() {
        this.container = new Container()
        this.initDependencies()
    }

    /**
     * Recover single instance of class.
     *
     * @static
     * @return {Index}
     */
    public static getInstance(): DI {
        if (!this.instance) this.instance = new DI()
        return this.instance
    }

    /**
     * Get Container inversify.
     *
     * @returns {Container}
     */
    public getContainer(): Container {
        return this.container
    }

    /**
     * Initializes injectable containers.
     *
     * @private
     * @return void
     */
    private initDependencies(): void {
        this.container.bind(Identifier.APP).to(Index).inSingletonScope()

        // Controllers
        this.container.bind<HomeController>(Identifier.HOME_CONTROLLER).to(HomeController).inSingletonScope()

        // Background Services
        this.container
            .bind(Identifier.BACKGROUND_SERVICE)
            .to(BackgroundService).inSingletonScope()

        this.container
            .bind<IConnectionFactory>(Identifier.PG_CONNECTION_FACTORY)
            .to(PgConnectionFactory).inSingletonScope()
        this.container
            .bind<IDBConnection>(Identifier.PG_CONNECTION)
            .to(PgConnection).inSingletonScope()



        // Log
        this.container.bind<ILogger>(Identifier.LOGGER).to(CustomLogger).inSingletonScope()

    }
}