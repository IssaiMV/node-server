import { inject, injectable } from "inversify"
import { IUserService } from "../port/user.service.interface"
import { Identifier } from "../../di/identifiers"
import { IUserRepository } from "../../infrastructure/port/user.repository.interface"
import { User } from "../domain/model/user"
import { IQuery } from "../../infrastructure/port/query.interface"
import { ConflictException } from "../domain/exception/conflict.exception"
import { UserValidator } from "../domain/validator/user.validator"

/**
 * Implementing User Service.
 *
 * @implements {IUserService}
 */
@injectable()
export class UserService implements IUserService {
    constructor(@inject(Identifier.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {
    }

    /**
     * Adds a new user.
     * Before adding, it is checked whether the user already exists.
     *
     * @param {User} user
     * @returns {(Promise<User>)}
     * @throws {ConflictException | RepositoryException} If a data conflict occurs, as an existing user.
     */
    public async add(user: User): Promise<User> {
        await UserValidator.validate(user)
        const userExist = await this._userRepository.checkExist(user)
        if (userExist) throw new ConflictException('User already has an account...')
        return this._userRepository.create(user)

    }

    /**
     * Get the data of all users in the infrastructure.
     *
     * @param query Defines object to be used for queries.
     * @return {Promise<Array<User>>}
     * @throws {RepositoryException}
     */
    public async getAll(query: IQuery): Promise<Array<User>> {
        return this._userRepository.find(query)
    }

    /**
     * Get the user data in the infrastructure.
     *
     * @param id Unique identifier.
     * @param query Defines object to be used for queries.
     * @return {Promise<User>}
     * @throws {RepositoryException}
     */
    public async getById(id: string | number, query: IQuery): Promise<User> {
        query.filters = { id: id }
        return this._userRepository.findOne(query)
    }

    /**
     * Get the user data in the infrastructure.
     *
     * @param email Unique identifier.
     * @param query Defines object to be used for queries.
     * @return {Promise<User>}
     * @throws {RepositoryException}
     */
    public async getByEmail(email: string, query: IQuery): Promise<User> {
        query.filters = { email: email }
        return this._userRepository.findOne(query)
    }

    /**
     * Update user data.
     *
     * @param user - User containing the data to be updated
     * @return {Promise<User>}
     * @throws {ConflictException | RepositoryException}
     */
    public async update(user: User): Promise<User> {
        return this._userRepository.update(user)
    }

    /**
     * Remove the user according to their unique identifier.
     *
     * @param id - Unique identifier.
     * @return {Promise<boolean>}
     * @throws {ValidationException | RepositoryException}
     */
    public async remove(id: string | number): Promise<boolean> {
        return this._userRepository.delete(id)
    }
}

