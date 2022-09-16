import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    it('should return object of gift with pagination', () => {
      expect(
        giftController.allGiftsNew({
          sort: 'ASC',
          page: 1,
          limit: 10,
        }),
      ).toEqual({
        totalCount: expect.any(Number),
        page: expect.any(Number),
        limit: expect.any(Number),
        data: expect.any(Array),
      });
    });
  });
});
