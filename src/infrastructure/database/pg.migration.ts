import { DataSource, DataSourceOptions } from "typeorm"
import { Identifier } from "../../di/identifiers"
import { ILogger } from "../../utils/custom.logger"
import { PgConnectionFactory } from "./pg.connection.factory"
import { DI } from "../../di/di"

const logger: ILogger = DI.getInstance().getContainer().get<ILogger>(Identifier.LOGGER)
const options: DataSourceOptions = new PgConnectionFactory(logger).getDataSourceOptions()

export const connectionSource = new DataSource(options)
