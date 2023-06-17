import { ISerializable } from "../utils/serializable.interface"
import { Entity } from "./entity"

/**
 * Implementation of the user entity.
 *
 * @extends {Entity}
 * @implements {ISerializable<User>}
 */
export class User extends Entity implements ISerializable<User> {
    private name?: string
    private email?: string
    constructor(name?: string, email?: string, id?: string, createdAt?: Date, updatedAt?: Date, updatedBy?: string, _isDeleted?: boolean, deletedAt?: Date) {
        super(id, createdAt, updatedAt, updatedBy, deletedAt)
        this.setName(name)
        this.setEmail(email)
    }

    public getName(): string | undefined {
        return this.name
    }

    public setName(value: string | undefined) {
        this.name = value
    }

    public getEmail(): string | undefined {
        return this.email
    }

    public setEmail(value: string | undefined) {
        this.email = value
    }

    public toJSON(): string {
        return this.serialize()
    }

    /**
     * Convert this object to json.
     *
     * @returns {object}
     */
    public serialize(): any {
        return {
            id: super.getId(),
            createdAt: super.getCreatedAt(),
            updatedAt: super.getUpdatedAt(),
            updatedBy: super.getUpdatedBy(),
            deletedAt: super.getDeletedAt(),
            name: this.name,
            email: this.email
        }
    }

    /**
     * Transform JSON into User object.
     *
     * @param json
     */
    public deserialize(json: any): User {
        if (!json) return this
        if (typeof json === 'string') json = JSON.parse(json)

        if (json.id) this.setId(json.id)
        if (json.createdAt) this.setCreatedAt(json.createdAt)
        if (json.updatedAt) this.setUpdatedAt(json.updatedAt)
        if (json.updatedBy) this.setUpdatedBy(json.updatedBy)
        if (json.deletedAt) this.setDeletedAt(json.deletedAt)
        if (json.name) this.setName(json.name)
        if (json.email) this.setEmail(json.email)

        return this
    }
}

