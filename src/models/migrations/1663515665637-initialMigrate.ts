import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrate1663515665637 implements MigrationInterface {
    name = 'initialMigrate1663515665637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Redeems\` (\`id\` int NOT NULL AUTO_INCREMENT, \`qty\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`giftId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`hash\` varchar(300) NOT NULL, \`point\` decimal(20,2) NULL DEFAULT '0.00', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Ratings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` float NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`giftId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Gifts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`description\` text NULL, \`price\` int NOT NULL DEFAULT '0', \`stock\` int NOT NULL DEFAULT '0', \`image\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Redeems\` ADD CONSTRAINT \`FK_c6a812057446424690dd00a83ff\` FOREIGN KEY (\`giftId\`) REFERENCES \`Gifts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Redeems\` ADD CONSTRAINT \`FK_59935daf627711967661ba4c2b4\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Ratings\` ADD CONSTRAINT \`FK_fc21a2677f37743bf44c3aa3147\` FOREIGN KEY (\`giftId\`) REFERENCES \`Gifts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Ratings\` ADD CONSTRAINT \`FK_397b08b1bc71e05771316bbda07\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Ratings\` DROP FOREIGN KEY \`FK_397b08b1bc71e05771316bbda07\``);
        await queryRunner.query(`ALTER TABLE \`Ratings\` DROP FOREIGN KEY \`FK_fc21a2677f37743bf44c3aa3147\``);
        await queryRunner.query(`ALTER TABLE \`Redeems\` DROP FOREIGN KEY \`FK_59935daf627711967661ba4c2b4\``);
        await queryRunner.query(`ALTER TABLE \`Redeems\` DROP FOREIGN KEY \`FK_c6a812057446424690dd00a83ff\``);
        await queryRunner.query(`DROP TABLE \`Gifts\``);
        await queryRunner.query(`DROP TABLE \`Ratings\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`Redeems\``);
    }

}
