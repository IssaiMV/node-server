import { inject, injectable } from "inversify"
import { Identifier } from "../di/identifiers"
import { IDBConnection } from "../infrastructure/port/db.connection.interface"
import { CustomLogger } from "../utils/custom.logger"

@injectable()
export class BackgroundService {

    constructor(
        @inject(Identifier.PG_CONNECTION) private _pgsql: IDBConnection,
        @inject(Identifier.LOGGER) private _logger: CustomLogger,
    ) { }

    public async startServices(): Promise<void> {
        this._logger.debug('startServices()')
        try {
            await this._pgsql.tryConnect()
        } catch (err: any) {
            this._logger.error('Error initializing services in background: '.concat(err.message))
        }
    }

    public async stopServices(): Promise<void> {
        this._logger.debug('stopServices()')
        try {
            await this._pgsql.dispose()
        } catch (err: any) {
            this._logger.error('Error stopping background services: '.concat(err.message))
        }
    }
}

