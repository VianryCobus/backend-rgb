import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { request } from 'express';
import { typeOrmAsyncConfig } from '../config/typeorm-config';
import { Gift, Rating, Redeem, User } from '../models';
import { GiftController } from './gift.controller';
import { GiftService } from './gift.service';

describe('GiftController', () => {
  let giftController: GiftController;
  const mockGiftService = {
    allGiftsNew: jest.fn((dto) => {
      return {
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
      };
    }),
    oneGift: jest.fn((dto) => {
      return {
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
      };
    }),
    postGift: jest.fn((dto) => {
      return {
        status: true,
        message: 'New Gift is saved successfully',
      };
    }),
    putGift: jest.fn((id, dto) => {
      return {
        status: true,
        message: 'Gift is updated successfully',
      };
    }),
    patchGift: jest.fn((id, dto) => {
      return {
        status: true,
        message: 'Gift is patched successfully',
      };
    }),
    deleteGift: jest.fn((id) => {
      return {
        status: true,
        message: 'Gift is deleted successfully',
      };
    }),
    redeemGift: jest.fn((id, request, dto) => {
      return {
        status: true,
        message: 'Redeem process successfully',
      };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GiftController],
      providers: [GiftService],
    })
      .overrideProvider(GiftService)
      .useValue(mockGiftService)
      .compile();
    giftController = moduleRef.get<GiftController>(GiftController);
  });

  describe('allGiftsNew', () => {
    it('should be define', () => {
      expect(giftController).toBeDefined();
    });

    it('should return object of gift with pagination', () => {
      const dto = {
        sort: 'ASC',
        page: 1,
        limit: 10,
      };

      expect(giftController.allGiftsNew(dto)).toEqual({
        totalCount: expect.any(Number),
        page: expect.any(Number),
        limit: expect.any(Number),
        data: expect.any(Array),
      });

      expect(mockGiftService.allGiftsNew).toHaveBeenCalledWith(dto);
    });
  });

  describe('OneGifts', () => {
    it('should return one object of gift', () => {
      const dto: number = 1;
      expect(giftController.oneGifts(dto)).toEqual({
        status: expect.any(Boolean),
        data: expect.any(Array),
      });

      expect(mockGiftService.oneGift).toHaveBeenCalledWith(dto);
    });
  });

  describe('postGift', () => {
    it('should add One gift and return boolean status and message', () => {
      const dto = {
        name: 'Nokia 3510',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 2500000,
        stock: 5,
        image:
          'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
      };

      expect(giftController.postGift(dto)).toEqual({
        status: expect.any(Boolean),
        message: expect.any(String),
      });

      expect(mockGiftService.postGift).toHaveBeenCalledWith(dto);
    });
  });

  describe('putGift', () => {
    it('should update one gift and return boolean status and message', () => {
      const dto = {
        name: 'Nokia 35110',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 2500000,
        stock: 15,
        image:
          'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
      };

      expect(giftController.putGift(1, dto)).toEqual({
        status: expect.any(Boolean),
        message: expect.any(String),
      });

      expect(mockGiftService.putGift).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('patchGift', () => {
    it('should patch one gift and return boolean status and message', () => {
      const dto = {
        name: 'tes',
        description: 'tes',
        stock: 26,
        price: 2550000,
        image: 'tes',
      };

      expect(giftController.patchGift(1, dto)).toEqual({
        status: expect.any(Boolean),
        message: expect.any(String),
      });

      expect(mockGiftService.patchGift).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('deleteGift', () => {
    it('should delete one gift and return boolean status and message', () => {
      const dto = 1;

      expect(giftController.deleteGift(dto)).toEqual({
        status: expect.any(Boolean),
        message: expect.any(String),
      });

      expect(mockGiftService.deleteGift).toHaveBeenCalledWith(dto);
    });
  });

  describe('redeemGift', () => {
    it('should redeem gift and return boolean status and message', () => {
      const id = 1;
      const user = {
        email: 'vx.pangemanan@gmail.com',
        id: 1,
      };
      const dto = {
        qty: 2,
      };

      expect(giftController.redeemGift(id, request, dto)).toEqual({
        status: expect.any(Boolean),
        message: expect.any(String),
      });

      expect(mockGiftService.redeemGift).toHaveBeenCalled();
    });
  });
});
