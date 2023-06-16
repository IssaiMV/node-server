/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 *
 * @abstract
 */
export abstract class Default {
    public static readonly APP_NAME: string = 'The Editors Connection'
    public static readonly NODE_ENV: string = 'development' // development, test, production
    public static readonly PORT_HTTP: number = 80
    public static readonly PORT_HTTPS: number = 443

    // Microsoft SQL Server
    public static readonly DB_ENGINE: string = 'postgres'
    public static readonly DB_HOST_URI: string = 'localhost'
    public static readonly DB_HOST_URI_TEST: string = 'localhost'
    public static readonly DB_PORT: number = 5432



    // Log
    public static readonly LOG_DIR: string = 'logs'
}