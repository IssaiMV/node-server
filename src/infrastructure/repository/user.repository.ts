import { inject, injectable } from "inversify"
import { BaseRepository } from "./base/base.repository"
import { User } from "../../application/domain/model/user"
import { UserEntity } from "../entity/user.entity"
import { Identifier } from "../../di/identifiers"
import { IEntityMapper } from "../entity/mapper/entity.mapper.interface"
import { ILogger } from "../../utils/custom.logger"
import { IQuery } from "../port/query.interface"
import { Query } from "./query/query"
import { IDBConnection } from "../port/db.connection.interface"
import { IUserRepository } from "../port/user.repository.interface"

/**
 * Implementation of the user repository.
 *
 * @implements {IUserRepository}
 */
@injectable()
export class UserRepository extends BaseRepository<User, UserEntity> implements IUserRepository {
    constructor(
        @inject(Identifier.USER_ENTITY) protected readonly userModel: any,
        @inject(Identifier.USER_ENTITY_MAPPER) protected readonly userMapper: IEntityMapper<User, UserEntity>,
        @inject(Identifier.PG_CONNECTION) protected readonly _pgsql: IDBConnection,
        @inject(Identifier.LOGGER) protected readonly logger: ILogger
    ) {
        super(userModel, userMapper, _pgsql, logger)
    }

    /**
     * @override
     */
    public create(item: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            super.create(item)
                .then(result => {
                    resolve(this.mapper.transform(result))
                })
                .catch((err: any) => reject(super.PgsqlErrorListener(err)))
        })
    }

    /**
     * Retrieves the user by his email.
     *
     * @param email User email.
     * @param query Defines object to be used for queries.
     * @return {Promise<User>}
     * @throws {RepositoryException}
     */
    public async getByEmail(email: string, query: IQuery): Promise<User> {
        query.filters = { email: email }
        return super.findOne(query)
    }

    /**
     * Checks if a user already has a registration.
     * What differs one user to another is his email.
     *
     * @param user
     * @return {Promise<boolean>} True if it exists or False, otherwise.
     * @throws {ValidationException | RepositoryException}
     */
    public checkExist(user: User): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const email: any = user.getEmail() ? user.getEmail() : ''
            this.getByEmail(email, new Query())
                .then((result: User) => {
                    if (result) return resolve(true)
                    return resolve(false)
                }).catch((err: any) => reject(super.PgsqlErrorListener(err)))
        })
    }
}

