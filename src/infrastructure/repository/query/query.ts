import { IPagination, IQuery } from "../../port/query.interface"
import { Pagination } from "./pagination"

export class Query implements IQuery {
    private _fields!: Array<string>
    private _ordination!: Map<string, string>
    private _pagination!: IPagination
    private _filters!: object | string

    /**
     * Creates an instance of Query.
     *
     * @param fields - Defines the attributes that should be returned.
     * @param ordination - Defines the attributes and how they should be sorted (ascending or descending).
     * @param pagination - Defines maximum page and number of data to be returned.
     * @param filters - Defines rules for filtering, such as filtering by some attribute.
     */
    constructor(fields?: Array<string>, ordination?: Map<string, string>,
        pagination?: IPagination, filters?: object | string) {
        this.fields = (fields) ? fields : []
        this.ordination = (ordination) ? ordination : new Map().set('created_at', 'desc')
        this.pagination = (pagination) ? pagination : new Pagination()
        this.filters = (filters) ? filters : {}
    }

    get fields(): Array<string> {
        return this._fields
    }

    set fields(value: Array<string>) {
        this._fields = value
    }

    get ordination(): Map<string, string> {
        return this._ordination
    }

    set ordination(value: Map<string, string>) {
        this._ordination = value
    }

    get pagination(): IPagination {
        return this._pagination
    }

    set pagination(value: IPagination) {
        this._pagination = value
    }

    get filters(): object | string {
        return this._filters
    }

    set filters(value: object | string) {
        this._filters = value
    }

    /**
     * Called as default when the object
     * is displayed in console.log()
     */
    public toJSON(): string {
        return JSON.stringify(this.serialize())
    }

    /**
     * Convert this object to json.
     * To the format that MongoDB understands.
     *
     * @returns {any}
     */
    public serialize(): any {
        return {
            fields: [...this.fields].reduce((obj: any, value: any, _key: any) => (obj[value] = 1, obj), {}),
            ordination: [...this.ordination.entries()].reduce((obj: any, [key, value]) => (obj[key] = value, obj), {}),
            pagination: this.pagination.serialize(),
            filters: this.filters
        }
    }

    /**
     * Transform JSON into Query object.
     *
     * @param json
     */
    public deserialize(json: any): IQuery {
        if (!json) return this

        if (json.fields) {
            this.fields = Object.keys(json.fields).map((elem) => elem, [])
        }

        if (json.sort || json.ordination) {
            const __ordination: Map<string, string> = new Map()
            Object.keys((json.sort || json.ordination))
                .reduce((_prev, elem) => __ordination.set(elem, (json.sort[elem] || json.ordination[elem])), {})
            this.ordination = __ordination
        }

        if (json.pagination) this.pagination = this.pagination.deserialize(json.pagination)
        if (json.filters) this.filters = json.filters

        return this
    }
}

