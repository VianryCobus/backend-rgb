import { Gift } from '../../models';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateGift implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await factory(Gift)().create();
    await factory(Gift)().create({
      name: 'tes',
      description: 'gaga',
      price: 5,
      stock: 5,
      image: 'tes',
    });
  }
}
