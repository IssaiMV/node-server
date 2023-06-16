import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {

    constructor(entity?: unknown) {
        if (entity) Object.assign(this, entity)
    }

    @PrimaryGeneratedColumn({
        name: "id"
    })
    public id!: number

    @CreateDateColumn({
        name: 'created_at'
    })
    public createdAt?: Date

    @UpdateDateColumn({
        name: 'updated_at'
    })
    public updatedAt?: Date

    @Column({
        name: 'updated_by'
    })
    public updated_by?: string

    @DeleteDateColumn({
        name: 'deleted_at'
    })
    public deletedAt?: Date

    public setId(id: number): void {
        this.id = id
    }
}
