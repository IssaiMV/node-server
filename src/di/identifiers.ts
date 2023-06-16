/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')

    // Background Services
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')
    public static readonly PG_CONNECTION_FACTORY: any = Symbol.for('PgConnectionFactory')
    public static readonly PG_CONNECTION: any = Symbol.for('PgConnection')


    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
