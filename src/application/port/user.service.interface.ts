import { IQuery } from "../../infrastructure/port/query.interface"
import { User } from "../domain/model/user"
import { IService } from "./service.interface"

/**
 * User service interface.
 *
 * @extends {IService}
 */
export interface IUserService extends IService<User> {
    /**
    * Get the user data in the infrastructure.
    *
    * @param email Unique identifier.
    * @param query Defines object to be used for queries.
    * @return {Promise<UserDto>}
    * @throws {RepositoryException}
    */
    getByEmail(email: string, query: IQuery): Promise<User>
}

