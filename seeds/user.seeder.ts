import { DataSource } from "typeorm"
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { UserEntity } from "../src/infrastructure/entity/user.entity"

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        _factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(UserEntity)
        await repository.insert([
            {
                name: 'Issai Mendoza',
                email: 'issai.mendoza@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                updated_by: '1',
            }
        ])
    }
}
