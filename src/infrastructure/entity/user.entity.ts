import { Column, Entity } from "typeorm"
import { BaseEntity } from "./base.entity"

@Entity('users')
export class UserEntity extends BaseEntity {

    @Column()
    public name?: string

    @Column()
    public email?: string
}
