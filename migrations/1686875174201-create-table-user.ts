import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUser1686875174201 implements MigrationInterface {

    private tableName = 'users'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isPrimary: false,
                    isNullable: true
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isPrimary: false,
                    isNullable: true
                },
                {
                    name: 'updated_by',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: true
                }
            ]
        })
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }


}
