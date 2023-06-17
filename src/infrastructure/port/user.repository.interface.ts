import { User } from "../../application/domain/model/user"
import { IQuery } from "./query.interface"
import { IRepository } from "./repository.interface"

/**
 * Interface of the user repository.
 * Must be implemented by the user repository at the infrastructure layer.
 *
 * @see {@link UserRepository} for further information.
 * @extends {IRepository<User>}
 */
export interface IUserRepository extends IRepository<User> {
    /**
     * Retrieves the user by your email.
     *
     * @param email User email.
     * @param query Defines object to be used for queries.
     * @return {Promise<User>}
     * @throws {RepositoryException}
     */
    getByEmail(email: string | number, query: IQuery): Promise<User>

    /**
     * Checks if a user already has a registration.
     * What differs one user to another is his email.
     *
     * @param user
     * @return {Promise<boolean>} True if it exists or False, otherwise.
     * @throws {ValidationException | RepositoryException}
     */
    checkExist(user: User): Promise<boolean>
}

