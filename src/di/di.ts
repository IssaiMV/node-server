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
import { UserEntityMapper } from '../infrastructure/entity/mapper/user.entity.mapper'
import { User } from '../application/domain/model/user'
import { UserEntity } from '../infrastructure/entity/user.entity'
import { IEntityMapper } from '../infrastructure/entity/mapper/entity.mapper.interface'
import { IUserRepository } from '../infrastructure/port/user.repository.interface'
import { UserRepository } from '../infrastructure/repository/user.repository'
import { UserService } from '../application/service/user.service'
import { IUserService } from '../application/port/user.service.interface'
import { UserController } from '../ui/controllers/user.controller'

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
        this.container.bind<UserController>(Identifier.USER_CONTROLLER).to(UserController).inSingletonScope()

        // Services
        this.container.bind<IUserService>(Identifier.USER_SERVICE).to(UserService).inSingletonScope()

        // Repositories
        this.container
            .bind<IUserRepository>(Identifier.USER_REPOSITORY)
            .to(UserRepository).inSingletonScope()

        // Models
        this.container.bind(Identifier.USER_ENTITY).toConstantValue(UserEntity)

        // Mappers
        this.container
            .bind<IEntityMapper<User, UserEntity>>(Identifier.USER_ENTITY_MAPPER)
            .to(UserEntityMapper).inSingletonScope()

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