import { User } from '../../models';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const salt = await bcrypt.genSalt();
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: 'vx.pangemanan@gmail.com',
          point: 1000000,
          hash: await bcrypt.hash('12345', salt),
        },
      ])
      .execute();
  }
}
