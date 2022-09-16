import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Gift, Rating, Redeem, User } from '../models';
import { DataSource, Repository } from 'typeorm';
import { PatchGiftDto, PostGiftDto, RatingDto, RedeemGiftDto } from './dto';

@Injectable()
export class GiftService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Gift) private giftsRepository: Repository<Gift>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Rating) private ratingsRepository: Repository<Rating>,
    @InjectRepository(Redeem) private redeemsRepository: Repository<Redeem>,
  ) {}

  // async allgifts(options: IPaginationOptions, sort): Promise<Pagination<Gift>> {
  //   // const queryBuilder = this.dataSource
  //   //   .createQueryBuilder(Gift, 'gift')
  //   //   .leftJoinAndSelect(Rating, 'rating', 'gift.id = rating.giftId')
  //   //   .orderBy('gift.updatedAt', sort);
  //   const queryBuilder = this.dataSource
  //     .createQueryBuilder(Gift, 'gift')
  //     .leftJoinAndSelect('gift.ratings', 'rating')
  //     .orderBy('gift.updatedAt', sort);
  //   return paginate<Gift>(queryBuilder, options);
  // }

  async allGiftsNew(dto) {
    const page = !dto.page ? 1 : dto.page;
    const limit = !dto.limit ? 10 : dto.limit;
    const skippedItems = (page - 1) * limit;

    const totalCount = await this.dataSource
      .createQueryBuilder(Gift, 'gift')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('rating.giftId')
            .addSelect('IFNULL(AVG(rating.rating),0)', 'sum_rating')
            .addSelect('IFNULL(ROUND(AVG(rating.rating)),0)', 'bintang')
            .from(Rating, 'rating')
            .groupBy('rating.giftId');
        },
        'calculate_rating',
        'gift.id = calculate_rating.giftId',
      )
      .select('gift.*')
      .addSelect('calculate_rating.sum_rating', 'rating')
      .addSelect('calculate_rating.bintang')
      .orderBy('gift.updatedAt', dto.sort)
      .addOrderBy('calculate_rating.bintang', dto.sort)
      .getCount();
    const gifts = await this.dataSource
      .createQueryBuilder(Gift, 'gift')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('rating.giftId')
            .addSelect('IFNULL(AVG(rating.rating),0)', 'rating')
            .addSelect('IFNULL(ROUND(AVG(rating.rating)),0)', 'bintang')
            .from(Rating, 'rating')
            .groupBy('rating.giftId');
        },
        'calculate_rating',
        'gift.id = calculate_rating.giftId',
      )
      .select('gift.*')
      .addSelect('calculate_rating.rating')
      .addSelect('calculate_rating.bintang')
      .orderBy('gift.updatedAt', dto.sort)
      .addOrderBy('calculate_rating.bintang', dto.sort)
      .offset(skippedItems)
      .limit(limit)
      .getRawMany();

    return {
      totalCount,
      page: page,
      limit: limit,
      data: gifts,
    };
  }

  async oneGift(id) {
    const gifts = await this.dataSource
      .createQueryBuilder(Gift, 'gift')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('rating.giftId')
            .addSelect('IFNULL(AVG(rating.rating),0)', 'rating')
            .addSelect('IFNULL(ROUND(AVG(rating.rating)),0)', 'bintang')
            .from(Rating, 'rating')
            .groupBy('rating.giftId');
        },
        'calculate_rating',
        'gift.id = calculate_rating.giftId',
      )
      .select('gift.*')
      .addSelect('calculate_rating.rating')
      .addSelect('calculate_rating.bintang')
      .where('gift.id = :id', { id })
      .getRawMany();
    return {
      status: true,
      data: gifts,
    };
  }

  async giftsRating(dto: RatingDto, id, user) {
    // check gift if exist
    const giftExist = await this.giftsRepository.findOne({
      where: {
        id,
      },
    });
    if (!giftExist) throw new ForbiddenException(`Gift isn't exist`);
    // check user if exist
    const userExist = await this.usersRepository.findOne({
      where: {
        id: user.id,
      },
    });
    if (!userExist) throw new ForbiddenException(`User isn't exist`);
    const ratingExist = await this.dataSource
      .createQueryBuilder(Rating, 'rating')
      .innerJoinAndSelect(Gift, 'gift', 'rating.giftId = gift.id')
      .where('rating.userId = :userId', { userId: userExist.id })
      .andWhere('rating.giftId = :giftId', { giftId: giftExist.id })
      .getRawOne();
    let ratingSaved;
    if (ratingExist) {
      // update ratings object
      ratingSaved = await this.dataSource
        .createQueryBuilder()
        .update(Rating)
        .set({
          rating: dto.rating,
        })
        .where('id = :id', { id: ratingExist.rating_id })
        .execute();
    } else {
      // create new rating object
      const newRating = await this.ratingsRepository.create({
        rating: dto.rating,
        gift: giftExist,
        user: userExist,
      });
      // save new rating
      ratingSaved = await this.ratingsRepository.save(newRating);
    }
    let returnData;
    if (ratingSaved) {
      returnData = {
        status: true,
        message: 'Thank you for the rating',
      };
    } else {
      returnData = {
        status: false,
        message: 'place rating is failed',
      };
    }
    return returnData;
  }

  async postGift(dto: PostGiftDto) {
    try {
      // check if gift is already exist
      const giftData = await this.dataSource
        .createQueryBuilder()
        .select('gift.*')
        .from(Gift, 'gift')
        .where('UPPER(gift.name) = :name', { name: dto.name.toUpperCase() })
        .getRawOne();
      if (giftData) throw new ForbiddenException('Gift already exist');
      // create new gift object
      const newGift = await this.giftsRepository.create({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        image: dto.image,
      });
      // save new gift
      const giftSaved = await this.giftsRepository.save(newGift);
      let returnData: {
        status: boolean;
        message: string;
      };
      if (giftSaved) {
        returnData = {
          status: true,
          message: 'New Gift is saved successfully',
        };
      } else {
        returnData = {
          status: false,
          message: 'Add New Gift is failed',
        };
      }
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async putGift(id, dto: PostGiftDto) {
    try {
      // check if gift is already exist
      const giftData = await this.dataSource
        .createQueryBuilder()
        .select('gift.*')
        .from(Gift, 'gift')
        .where('gift.id = :id', { id })
        .getRawOne();
      if (!giftData) throw new ForbiddenException(`Gift isn't exist`);
      // update gift
      const updateGift = await this.dataSource
        .createQueryBuilder()
        .update(Gift)
        .set({
          name: dto.name,
          description: dto.description,
          image: dto.image,
          stock: dto.stock,
          price: dto.price,
        })
        .where('id = :id', { id })
        .execute();
      let returnData: {
        status: boolean;
        message: string;
      };
      if (updateGift) {
        returnData = {
          status: true,
          message: 'Gift is updated successfully',
        };
      } else {
        returnData = {
          status: false,
          message: 'update Gift is failed',
        };
      }
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async patchGift(id, dto: PatchGiftDto) {
    try {
      // check if gift is already exist
      const giftData = await this.dataSource
        .createQueryBuilder()
        .select('gift.*')
        .from(Gift, 'gift')
        .where('gift.id = :id', { id })
        .getRawOne();
      if (!giftData) throw new ForbiddenException(`Gift isn't exist`);
      // check dto for patch
      let objectPatch = {};
      if (dto.name) {
        objectPatch['name'] = dto.name;
      }
      if (dto.description) {
        objectPatch['description'] = dto.description;
      }
      if (dto.price) {
        objectPatch['price'] = dto.price;
      }
      if (dto.stock) {
        objectPatch['stock'] = dto.stock;
      }
      if (dto.image) {
        objectPatch['image'] = dto.image;
      }
      // update gift
      const updateGift = await this.dataSource
        .createQueryBuilder()
        .update(Gift)
        .set(objectPatch)
        .where('id = :id', { id })
        .execute();
      let returnData: {
        status: boolean;
        message: string;
      };
      if (updateGift) {
        returnData = {
          status: true,
          message: 'Gift is patched successfully',
        };
      } else {
        returnData = {
          status: false,
          message: 'patch Gift is failed',
        };
      }
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async deleteGift(id) {
    try {
      // check if gift is already exist
      const giftData = await this.dataSource
        .createQueryBuilder()
        .select('gift.*')
        .from(Gift, 'gift')
        .where('gift.id = :id', { id })
        .getRawOne();
      if (!giftData) throw new ForbiddenException(`Gift isn't exist`);
      // delete gift
      const deleteGift = await this.dataSource
        .createQueryBuilder()
        .softDelete()
        .from(Gift)
        .where('id = :id', { id })
        .execute();
      let returnData: {
        status: boolean;
        message: string;
      };
      if (deleteGift) {
        returnData = {
          status: true,
          message: 'Gift is deleted successfully',
        };
      } else {
        returnData = {
          status: false,
          message: 'delete Gift is failed',
        };
      }
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async redeemGift(id, user, dto: RedeemGiftDto) {
    try {
      // get data gift that suitable with id
      const gift = await this.dataSource
        .createQueryBuilder(Gift, 'gift')
        .where('gift.id = :id', { id })
        .getOne();
      // return gift;
      // check stock
      if (gift.stock < 1) throw new ForbiddenException('Gift out of stock');

      if (gift.stock < dto.qty)
        throw new ForbiddenException('Gift not enough stock');

      const totalPrice = Number(gift.price) * Number(dto.qty);
      // get user
      const userData = await this.dataSource
        .createQueryBuilder(User, 'user')
        .where('user.id = :id', { id: user.id })
        .getOne();
      // check user exist
      if (!userData) throw new ForbiddenException(`User doesn't exist`);
      // check user poin with price gift
      if (userData.point < totalPrice)
        throw new ForbiddenException(`Insufficient Point`);
      // if all condition is fullfilled
      let processCutGiftStock: boolean = false;
      let processCutPointUser: boolean = false;
      const cutGiftStock = await this.dataSource
        .createQueryBuilder()
        .update(Gift)
        .set({
          stock: Number(gift.stock) - Number(dto.qty),
        })
        .where('id = :id', { id: gift.id })
        .execute();
      if (cutGiftStock) processCutGiftStock = true;
      // check process cut stock
      if (!processCutGiftStock)
        throw new HttpException(
          'Failed process cut stock',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      const cutPointUser = await this.dataSource
        .createQueryBuilder()
        .update(User)
        .set({
          point: Number(userData.point) - Number(totalPrice),
        })
        .where('id = :id', { id: userData.id })
        .execute();
      if (cutPointUser) processCutPointUser = true;
      // check process cut point
      if (!processCutPointUser)
        throw new HttpException(
          'Failed process cut point User',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      // insert data to table redeem
      // const insertDataRedeem = await this.dataSource
      //   .createQueryBuilder()
      //   .insert()
      //   .into(Redeem)
      //   .values({
      //     giftId: id,
      //     userId: user.id,
      //     qty: dto.qty,
      //   })
      //   .execute();
      // create new rating object
      const newRedeem = await this.redeemsRepository.create({
        qty: dto.qty,
        gift: gift,
        user: userData,
      });
      // save new rating
      const insertDataRedeem = await this.redeemsRepository.save(newRedeem);
      if (insertDataRedeem) {
        return {
          status: true,
          message: `Redeem process successfully`,
        };
      } else {
        throw new HttpException(
          'Failed process save redeem data',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
