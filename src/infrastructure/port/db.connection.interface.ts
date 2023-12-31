import { IDisposable } from "./disposable.interface"

export interface IDBConnection extends IDisposable {
    tryConnect(): any
    getConn(): any
}
