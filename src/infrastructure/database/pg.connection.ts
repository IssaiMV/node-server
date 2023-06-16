import { inject, injectable } from "inversify"
import { DataSource } from "typeorm"
import { Identifier } from "../../di/identifiers"
import { IConnectionFactory } from "../port/connection.factory.interface"
import { ILogger } from "../../utils/custom.logger"
import { IDBConnection } from "../port/db.connection.interface"

/**
 * Implementation of the interface that provides connection with MSSQL.
 * To implement the MSSQL abstraction the typeorm library was used.
 *
 * @see {@link https://typeorm.io/data-source} for more details.
 * @implements {IDBConnection}
 */
@injectable()
export class PgConnection implements IDBConnection {
    private _connection?: DataSource

    constructor(
        @inject(Identifier.PG_CONNECTION_FACTORY) private readonly _connectionFactory: IConnectionFactory,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public getConn(): DataSource | any {
        return this._connection
    }

    /**
     * Once connected, the reconnection policy is managed by the MSSQL driver,
     * the values set in the environment variables or in the default file are
     * used for the total number of retries and intervals between them.
     *
     * In case MSSQL is initially not available for a first connection,
     * a new attempt will be made every 2 seconds. After the successful
     * connection, reconnection will be automatically managed by the MSSQL driver.
     *
     * @return {Promise<void>}
     */
    public async tryConnect(): Promise<any> {
        const _this = this
        await this._connectionFactory.createConnection()
            .then((connection: DataSource) => {
                this._connection = connection
                this.connectionStatusListener(this._connection)
                return this._connection
            })

            .catch((_err) => {
                setTimeout(() => {
                    _this.tryConnect().then()
                }, 2000)
            })
    }

    /**
     * Initializes connected and disconnected listeners.
     *
     * @param connection
     */
    // @ts-ignore
    private connectionStatusListener(connection: DataSource | undefined): void {
        if (connection?.isInitialized) return this._logger.info("Database connection successfully")
        else return this._logger.info("Database connection failed")
    }

    /**
     * Releases the resources.
     *
     * @return {Promise<void>}
     */
    public async dispose(): Promise<void> {
        if (this._connection) await this._connection.destroy()
        this._connection = undefined
    }
}

