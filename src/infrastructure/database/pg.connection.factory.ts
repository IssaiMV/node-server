import * as dotenv from 'dotenv'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { Default } from '../../utils/default'
import { ILogger } from '../../utils/custom.logger'
import { IConnectionFactory } from '../port/connection.factory.interface'
import { entities } from '../../utils/entity.list'

dotenv.config()

@injectable()
export class PgConnectionFactory implements IConnectionFactory {
    constructor(
        @inject(Identifier.LOGGER) protected readonly _logger: ILogger
    ) {
    }

    private dataSourceOptions: DataSourceOptions & SeederOptions = {
        type: "postgres",
        host: this.getDBUri(),
        port: this.getDBPort(),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: this.getDBLoggingConfiguration(),
        entities: entities,
        subscribers: [],
        migrations: ["migrations/*.ts"],
        migrationsTableName: process.env.DB_MIGRATION_TABLE,
        migrationsRun: this.getAutorunConfiguration(),
        seeds: ['seeds/*.seeder.ts'],
        factoriesLoad: false,
        extra: {
            trustServerCertificate: true
        },
    }

    public createConnection(): Promise<any> {
        const AppDataSource = new DataSource(this.dataSourceOptions)

        return AppDataSource.initialize()
            .then((result: DataSource) => {
                this._logger.info('Database connection status: ' + result.isInitialized)
                return result
            })
            .catch(err => this._logger.error(err))
    }

    /**
     * Get dataSourceOptions
     *
     * @return {DataSourceOptions}
     */
    // @ts-ignore
    public getDataSourceOptions(): DataSourceOptions {
        return this.dataSourceOptions
    }

    /**
     * Retrieve the URI for connection to MSSQL.
     *
     * @return {string}
     */
    // @ts-ignore
    private getDBUri(): string {
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
            return process.env.DB_HOST_URI_TEST || Default.DB_HOST_URI_TEST
        }
        return process.env.DB_HOST_URI || Default.DB_HOST_URI
    }

    /**
     * Retrieve the DB Port.
     *
     * @return {number}
     */
    // @ts-ignore
    private getDBPort(): number {
        return Number(process.env.DB_PORT) || Default.DB_PORT
    }

    /**
     * Retrieve the autorun migration configuration.
     *
     * @return {boolean}
     */
    // @ts-ignore
    private getAutorunConfiguration(): boolean {
        if (process.env.DB_AUTORUN_MIGRATIONS == "true") return true
        else return false
    }

    /**
     * Retrieve the Logging Configuration.
     *
     * @return {boolean}
     */
    // @ts-ignore
    private getDBLoggingConfiguration(): boolean {
        if (process.env.DB_LOGGING_ENABLED == "true") return true
        else return false
    }
}

