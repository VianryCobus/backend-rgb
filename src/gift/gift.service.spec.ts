import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../config/ormconfig_mysql';
import { Gift, Rating, Redeem, User } from '../models';
import { GiftService } from './gift.service';
import { PatchGiftDto } from './dto/patchGift.dto';

describe('GiftService', () => {
  let service: GiftService;

  // const mockGiftRepository = {
  //   findOne: jest.fn().mockImplementation((gift) =>
  //     Promise.resolve({
  //       id: Date.now(),
  //       ...gift,
  //     }),
  //   ),
  //   create: jest.fn().mockImplementation((dto) => dto),
  //   save: jest.fn().mockImplementation((gift) =>
  //     Promise.resolve({
  //       id: Date.now(),
  //       ...gift,
  //     }),
  //   ),
  // };
  // const mockUserRepository = {
  //   findOne: jest.fn().mockImplementation((user) =>
  //     Promise.resolve({
  //       id: Date.now(),
  //       ...user,
  //     }),
  //   ),
  // };
  // const mockRatingRepository = {
  //   create: jest.fn().mockImplementation((dto) => dto),
  //   save: jest.fn().mockImplementation((rating) =>
  //     Promise.resolve({
  //       id: Date.now(),
  //       ...rating,
  //     }),
  //   ),
  // };
  // const mockRedeemRepository = {
  //   create: jest.fn().mockImplementation((dto) => dto),
  //   save: jest.fn().mockImplementation((redeem) =>
  //     Promise.resolve({
  //       id: Date.now(),
  //       ...redeem,
  //     }),
  //   ),
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GiftService,
        User,
        Gift,
        Redeem,
        Rating,
        // {
        //   provide: getRepositoryToken(Gift),
        //   useValue: mockGiftRepository,
        // },
        // {
        //   provide: getRepositoryToken(User),
        //   useValue: mockUserRepository,
        // },
        // {
        //   provide: getRepositoryToken(Rating),
        //   useValue: mockRatingRepository,
        // },
        // {
        //   provide: getRepositoryToken(Redeem),
        //   useValue: mockRedeemRepository,
        // },
      ],
      imports: [
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([User, Gift, Redeem, Rating]),
      ],
    }).compile();

    service = module.get<GiftService>(GiftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve all of gift data with pagination', async () => {
    const dto = {
      page: 1,
      limit: 10,
      sort: 'ASC',
    };
    expect(await service.allGiftsNew(dto)).toStrictEqual({
      totalCount: expect.any(Number),
      page: expect.any(Number),
      limit: expect.any(Number),
      data: expect.any(Array),
    });
  });

  it('should retrieve one of gift data', async () => {
    const id = 1;
    expect(await service.oneGift(id)).toStrictEqual({
      status: expect.any(Boolean),
      data: expect.any(Array),
    });
  });

  it('should give rating to the gift', async () => {
    const dto = {
      rating: 1.5,
    };
    const id = 1;
    const user = {
      id: 1,
      email: 'vx.pangemanan@gmail.com',
    };
    expect(await service.giftsRating(dto, id, user)).toStrictEqual({
      status: expect.any(Boolean),
      message: expect.any(String),
    });
  });

  it('should post gift,(add to the database)', async () => {
    const dto = {
      name: 'Nou',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: 20000,
      stock: 5,
      image: 'tes.jpg',
    };
    expect(await service.postGift(dto)).toStrictEqual({
      status: expect.any(Boolean),
      message: expect.any(String),
    });
  });

  it('should put gift, (update data in database)', async () => {
    const dto = {
      name: 'Nou',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: 20000,
      stock: 5,
      image: 'tes.jpg',
    };
    const id = 1;
    expect(await service.putGift(id, dto)).toStrictEqual({
      status: expect.any(Boolean),
      message: expect.any(String),
    });
  });

  it('should patch gift, (update data in database)', async () => {
    const dto = {
      name: 'Patched',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: 66666,
      stock: 5,
      image: 'tes.jpg',
    };
    const id = 2;
    expect(await service.patchGift(id, dto)).toStrictEqual({
      status: expect.any(Boolean),
      message: expect.any(String),
    });
  });

  it('should delete gift, (delete data in database)', async () => {
    const id = 2;
    expect(await service.deleteGift(id)).toStrictEqual({
      status: expect.any(Boolean),
      message: expect.any(String),
    });
  });

  it('should redeem gift', async () => {
    const dto = {
      qty: 2,
    };
    const id = 1;
    const user = {
      id: 1,
      email: 'vx.pangemanan@gmail.com',
    };
    expect(await service.redeemGift(id, user, dto)).toStrictEqual({
      status: expect.any(Boolean),
      message: expect.any(String),
    });
  });
});
