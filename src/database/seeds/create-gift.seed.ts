import { Gift } from '../../models';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateGift implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await factory(Gift)().create({
    //   name: 'tes',
    //   description: 'gaga',
    //   price: 5,
    //   stock: 5,
    //   image: 'tes',
    // });
    await connection
      .createQueryBuilder()
      .insert()
      .into(Gift)
      .values([
        {
          name: 'Samsung',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 20000,
          stock: 8,
          image:
            'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
        },
        {
          name: 'Iphone 13',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 50000,
          stock: 10,
          image:
            'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
        },
        {
          name: 'XiaoMi',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 40000,
          stock: 5,
          image:
            'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
        },
        {
          name: 'Pocco',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 15000,
          stock: 5,
          image:
            'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
        },
        {
          name: 'Realme',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 60000,
          stock: 10,
          image:
            'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
        },
        {
          name: 'Nokia',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 2500000,
          stock: 5,
          image:
            'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
        },
      ])
      .execute();
  }
}
