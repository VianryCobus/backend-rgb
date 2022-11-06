import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { request } from 'express';
import databaseConfig from '../config/mysql/ormconfig_mysql';
import { Gift, Rating, Redeem, User } from '../models';
import { GiftController } from './gift.controller';
import { GiftService } from './gift.service';

describe('Gift Controller', () => {
  let giftController: GiftController;
  let giftService: GiftService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([User, Gift, Redeem, Rating]),
      ],
      controllers: [GiftController],
      providers: [GiftService],
    }).compile();

    giftService = moduleRef.get<GiftService>(GiftService);
    giftController = moduleRef.get<GiftController>(GiftController);
  });

  it('should be defined', () => {
    expect(giftController).toBeDefined();
  });

  describe('allGiftsNew', () => {
    it('should return an array of gift with rating in pagination', async () => {
      const result: {
        totalCount: number;
        page: any;
        limit: any;
        data: any[];
      } = {
        totalCount: expect.any(Number),
        page: expect.any(Number),
        limit: expect.any(Number),
        data: expect.any(Array),
      };
      jest
        .spyOn(giftService, 'allGiftsNew')
        .mockImplementation(async () => result);

      const dto = {
        page: 1,
        limit: 10,
        sort: 'ASC',
      };

      expect(await giftController.allGiftsNew(dto)).toStrictEqual({
        totalCount: 10,
        page: 1,
        limit: 10,
        data: [
          {
            id: 1,
            name: 'Samsung',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 20000,
            stock: 8,
            createdAt: '2022-09-11T14:00:39.000Z',
            updatedAt: '2022-09-15T15:21:24.000Z',
            deletedAt: null,
            image:
              'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
            rating: 3.5,
            bintang: 4,
          },
        ],
      });
    });
  });

  describe('oneGifts', () => {
    it('should return one object of gift', async () => {
      const result: {
        status: boolean;
        data: any[];
      } = {
        status: expect.any(Boolean),
        data: expect.any(Array),
      };
      jest.spyOn(giftService, 'oneGift').mockImplementation(async () => result);

      const dto: number = 1;

      expect(await giftController.oneGifts(dto)).toStrictEqual({
        status: true,
        data: [
          {
            id: 1,
            name: 'Samsung',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 20000,
            stock: 8,
            image:
              'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
            createdAt: '2022-09-19T14:11:37.272Z',
            updatedAt: '2022-09-19T14:11:37.272Z',
            deletedAt: null,
            rating: null,
            bintang: null,
          },
        ],
      });
    });
  });

  describe('postGift', () => {
    it('should add One gift and return boolean status and message', async () => {
      const result: {
        status: boolean;
        message: string;
      } = {
        status: expect.any(Boolean),
        message: expect.any(String),
      };
      jest
        .spyOn(giftService, 'postGift')
        .mockImplementation(async () => result);

      const dto = {
        name: 'Nokia 3510',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 2500000,
        stock: 5,
        image:
          'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
      };

      expect(await giftController.postGift(dto)).toStrictEqual({
        status: true,
        message: 'New Gift is saved successfully',
      });
    });
  });

  describe('putGift', () => {
    it('should update one gift and return boolean status and message', async () => {
      const result: {
        status: boolean;
        message: string;
      } = {
        status: expect.any(Boolean),
        message: expect.any(String),
      };
      jest.spyOn(giftService, 'putGift').mockImplementation(async () => result);

      const dto = {
        name: 'Nokia 3510',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 2500000,
        stock: 5,
        image:
          'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
      };

      expect(await giftController.putGift(1, dto)).toStrictEqual({
        status: true,
        message: 'Gift is updated successfully',
      });
    });
  });

  describe('patchGift', () => {
    it('should patch one gift and return boolean status and message', async () => {
      const result: {
        status: boolean;
        message: string;
      } = {
        status: expect.any(Boolean),
        message: expect.any(String),
      };
      jest
        .spyOn(giftService, 'patchGift')
        .mockImplementation(async () => result);

      const dto = {
        name: 'tes',
        description: 'tes',
        stock: 26,
        price: 2550000,
        image: 'tes',
      };

      expect(await giftController.patchGift(1, dto)).toStrictEqual({
        status: true,
        message: 'Gift is patched successfully',
      });
    });
  });

  describe('deleteGift', () => {
    it('should delete one gift and return boolean status and message', async () => {
      const result: {
        status: boolean;
        message: string;
      } = {
        status: expect.any(Boolean),
        message: expect.any(String),
      };
      jest
        .spyOn(giftService, 'deleteGift')
        .mockImplementation(async () => result);

      const dto = 1;

      expect(await giftController.deleteGift(dto)).toStrictEqual({
        status: true,
        message: 'Gift is deleted successfully',
      });
    });
  });

  describe('redeemGift', () => {
    it('should redeem gift and return boolean status and message', async () => {
      const result: {
        status: boolean;
        message: string;
      } = {
        status: expect.any(Boolean),
        message: expect.any(String),
      };
      jest
        .spyOn(giftService, 'redeemGift')
        .mockImplementation(async () => result);

      const id = 1;
      const user = {
        email: 'vx.pangemanan@gmail.com',
        id: 1,
      };
      const dto = {
        qty: 2,
      };

      expect(await giftController.redeemGift(id, request, dto)).toStrictEqual({
        status: true,
        message: 'Redeem process successfully',
      });
    });
  });
});
