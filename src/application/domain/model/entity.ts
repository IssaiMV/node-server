export class Entity {
    private id?: string
    private createdAt?: Date
    private updatedAt?: Date
    private updatedBy?: string
    private deletedAt?: Date

    protected constructor(id?: string, createdAt?: Date, updatedAt?: Date, updatedBy?: string, deletedAt?: Date) {
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.updatedBy = updatedBy
        this.deletedAt = deletedAt
    }

    public getId(): string | undefined {
        return this.id
    }

    public setId(value: string | undefined) {
        if (value) {
            this.id = value
        }
    }

    public getCreatedAt(): Date | undefined {
        return this.createdAt
    }

    public setCreatedAt(value: Date | undefined) {
        if (value) {
            this.createdAt = value
        }
    }

    public getUpdatedAt(): Date | undefined {
        return this.updatedAt
    }

    public setUpdatedAt(value: Date | undefined) {
        if (value) {
            this.updatedAt = value
        }
    }

    public getUpdatedBy(): string | undefined {
        return this.updatedBy
    }

    public setUpdatedBy(value: string | undefined) {
        if (value) {
            this.updatedBy = value
        }
    }

    public getDeletedAt(): Date | undefined {
        return this.deletedAt
    }

    public setDeletedAt(value: Date | undefined) {
        if (value) {
            this.deletedAt = value
        }
    }
}

