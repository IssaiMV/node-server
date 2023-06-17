import { injectable } from "inversify"
import { Entity } from "../../../application/domain/model/entity"
import { IRepository } from "../../port/repository.interface"
import { ILogger } from "../../../utils/custom.logger"
import { IDBConnection } from "../../port/db.connection.interface"
import { IQuery } from "../../port/query.interface"
import { ValidationException } from "../../../application/domain/exception/validation.exception"
import { RepositoryException } from "../../../application/domain/exception/repository.exception"
import { ConflictException } from "../../../application/domain/exception/conflict.exception"
import { IEntityMapper } from "../../entity/mapper/entity.mapper.interface"

@injectable()
export abstract class BaseRepository<T extends Entity, TModel> implements IRepository<T> {
    public constructor(
        protected readonly Model: any,
        protected readonly mapper: IEntityMapper<T, TModel>,
        protected readonly _mssql: IDBConnection,
        private readonly _logger: ILogger
    ) {
    }

    public create(item: T): Promise<T> {
        const itemNew: TModel = this.mapper.transform(item)
        return new Promise<T>((resolve, reject) => {
            this._mssql?.getConn()
                .createQueryBuilder()
                .insert()
                .into(this.Model.name)
                .values([itemNew])
                .execute()
                .then((result: any) => {
                    item.setId(JSON.stringify(result.identifiers[0].id))
                    resolve(item)
                })
                .catch((err: any) => reject(this.PgsqlErrorListener(err)))
        })
    }

    public find(query: IQuery): Promise<Array<T>> {
        const q: any = query.serialize()
        return new Promise<Array<T>>((resolve, reject) => {
            this._mssql?.getConn()
                .getRepository(this.Model.name)
                .createQueryBuilder()
                .select(query.fields)
                .orderBy(q.ordination)
                .skip(Number((q.pagination.limit * q.pagination.page) - q.pagination.limit))
                .take(Number(q.pagination.limit))
                .execute()
                .then((result: Array<TModel>) => {
                    resolve(result.map((item: TModel) => this.mapper.transform(item)))
                })
                .catch((err: any) => reject(this.PgsqlErrorListener(err)))
        })
    }

    public findOne(query: IQuery): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._mssql?.getConn()
                .getRepository(this.Model.name)
                .createQueryBuilder()
                .where(query.serialize().filters)
                .getOne()
                .then((result: TModel) => {
                    // @ts-ignore
                    if (!result) return resolve(undefined)
                    return resolve(this.mapper.transform(result))
                })
                .catch((err: any) => reject(this.PgsqlErrorListener(err)))
        })
    }

    public update(item: T): Promise<T> {
        const itemUp: T = this.mapper.transform(item)
        itemUp.setId(undefined)
        return new Promise<T>((resolve, reject) => {
            this._mssql.getConn()
                .createQueryBuilder()
                .update(this.Model.name)
                .set(itemUp)
                .where("id = :id", { id: item.getId() })
                .execute()
                .then((result: any) => {
                    // @ts-ignore
                    if (!result) return resolve(undefined)
                    return resolve(item)
                })
                .catch((err: any) => reject(this.PgsqlErrorListener(err)))
        })
    }

    public delete(id: string | number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._mssql.getConn()
                .createQueryBuilder()
                .softDelete()
                .from(this.Model.name)
                .where("id = :id", { id: id })
                .execute()
                .then((result: any) => {
                    if (!result) return resolve(false)
                    resolve(true)
                })
                .catch((err: any) => reject(this.PgsqlErrorListener(err)))
        })
    }

    public count(query: IQuery): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._mssql.getConn()
                .getRepository(this.Model.name)
                .createQueryBuilder()
                .select(query.serialize().fields)
                .findAndCount()
                .then((result: any) => resolve(Number(result)))
                .catch((err: any) => reject(this.PgsqlErrorListener(err)))
        })
    }

    // TODO
    protected PgsqlErrorListener(err: any): ValidationException | ConflictException | RepositoryException {
        if (err && err.name) {
            this._logger.error(err.message)

            if (err.name === 'ValidationError') {
                return new ValidationException('Required fields were not provided!', err.message)
            }

            if (err.name === 'CastError') {
                return new ValidationException('The given ID is not in valid format.',
                    'A 12 bytes hexadecimal ID similar to this')
            }

            if (err.name === 'ObjectParameterError') {
                return new ValidationException('Invalid query parameters!')
            }
        }
        return new RepositoryException('An internal error has occurred in the database!',
            'Please try again later...')
    }
}

