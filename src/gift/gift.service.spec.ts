// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
// import databaseConfig from '../config/ormconfig_mysql';
// import { Gift, Rating, Redeem, User } from '../models';
// import { GiftService } from './gift.service';

// describe('GiftService', () => {
//   let service: GiftService;

//   const mockGiftRepository = {};

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         GiftService,
//         {
//           provide: getRepositoryToken(Gift),
//           useValue: mockGiftRepository,
//         },
//       ],
//       imports: [
//         TypeOrmModule.forRootAsync(databaseConfig),
//         TypeOrmModule.forFeature([User, Gift, Redeem, Rating]),
//       ],
//     }).compile();

//     service = module.get<GiftService>(GiftService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
