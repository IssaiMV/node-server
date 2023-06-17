import { injectable } from "inversify"
import { IEntityMapper } from "./entity.mapper.interface"
import { User } from "../../../application/domain/model/user"
import { UserEntity } from "../user.entity"

@injectable()
export class UserEntityMapper implements IEntityMapper<User, UserEntity> {
    public transform(item: any): any {
        console.log(item instanceof User);
        console.log(item instanceof UserEntity);
        if (item instanceof User) return this.modelToModelEntity(item)
        if (item instanceof UserEntity) return this.modelEntityToModel(item)
        return this.jsonToModel(item)
    }

    /**
     * Convert {User} for {UserEntity}.
     *
     * @see Before setting the value, it is important to verify that the type is valid.
     * Therefore, you do not run the risk that in an UPDATE / PATCH action type,
     * attributes that should not be updated are saved with null values.
     * @see Creation Date should not be mapped to the type the repository understands,
     * because this attribute is created automatically by the database.
     * Therefore, if a null value is passed at update time, an exception is thrown.
     * @param item
     */
    public modelToModelEntity(item: User): UserEntity {
        const result: UserEntity = new UserEntity()
        console.log(item);

        if (item.getId()) result.id = Number(item.getId())
        if (item.getName()) result.name = item.getName()
        if (item.getEmail()) result.email = item.getEmail()
        if (item.getCreatedAt()) result.createdAt = item.getCreatedAt()
        if (item.getUpdatedAt()) result.updatedAt = item.getUpdatedAt()
        if (item.getUpdatedBy()) result.updated_by = item.getUpdatedBy()
        if (item.getDeletedAt()) result.deletedAt = item.getDeletedAt()

        return result
    }

    /**
     * Convert {UserEntity} for {User}.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param item
     */
    public modelEntityToModel(item: UserEntity): User {
        console.log(item);
        const result: User = new User()

        result.setId(String(item.id))
        result.setName(item.name)
        result.setEmail(item.email)
        result.setCreatedAt(item.createdAt)
        result.setUpdatedAt(item.updatedAt)
        result.setUpdatedBy(item.updated_by)
        result.setDeletedAt(item.deletedAt)

        return result
    }

    /**
     * Convert JSON for {User}.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param json
     */
    public jsonToModel(json: any): User {
        const result: User = new User()
        if (!json) return result
        if (json.id !== undefined) result.setId(json.id)
        if (json.name !== undefined) result.setName(json.name)
        if (json.email !== undefined) result.setEmail(json.email)
        if (json.createdAt !== undefined) result.setCreatedAt(json.createdAt)
        if (json.updatedAt !== undefined) result.setUpdatedAt(json.updatedAt)
        if (json.updated_by !== undefined) result.setUpdatedBy(json.updated_by)
        if (json.deletedAt !== undefined) result.setDeletedAt(json.deletedAt)

        return result
    }
}

