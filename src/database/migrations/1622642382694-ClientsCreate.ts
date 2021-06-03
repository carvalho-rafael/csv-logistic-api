import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ClientsCreate1622642382694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "clients",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "birthday",
                    type: "date",
                },
                {
                    name: "value",
                    type: "float",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "operator_id",
                    type: "int"
                }
            ],
            foreignKeys: [
                {
                    name: 'ClientsOperator',
                    columnNames: ['operator_id'],
                    referencedTableName: 'operators',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients')
    }

}
