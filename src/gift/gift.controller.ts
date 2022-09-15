import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth';
import { Gift } from 'src/models';
import { AllGiftsDto, PatchGiftDto, PostGiftDto, RatingDto } from './dto';
import { GiftService } from './gift.service';

@Controller('Gifts')
export class GiftController {
  constructor(private giftService: GiftService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('/indexold')
  // @HttpCode(200)
  // allgifts(
  //   @Query(new ValidationPipe()) dto: AllGiftsDto,
  // ): Promise<Pagination<Gift>> {
  //   let limit = dto.limit > 100 ? 100 : dto.limit;
  //   let page = dto.page;
  //   return this.giftService.allgifts(
  //     {
  //       page,
  //       limit,
  //       route: '/Gift',
  //     },
  //     dto.sort,
  //   );
  // }

  @UseGuards(JwtAuthGuard)
  @Get('')
  @HttpCode(200)
  allGiftsNew(@Query() dto: AllGiftsDto) {
    dto.page = Number(dto.page);
    dto.limit = Number(dto.limit);
    let limit = dto.limit > 10 ? 10 : dto.limit;
    return this.giftService.allGiftsNew({
      page: dto.page,
      limit,
      sort: dto.sort,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(200)
  oneGifts(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return this.giftService.oneGift(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  @HttpCode(200)
  postGift(@Body(new ValidationPipe()) dto: PostGiftDto) {
    return this.giftService.postGift(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  putGift(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body(new ValidationPipe()) dto: PostGiftDto,
  ) {
    return this.giftService.putGift(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(200)
  patchGift(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body(new ValidationPipe()) dto: PatchGiftDto,
  ) {
    return this.giftService.patchGift(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  deleteGift(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return this.giftService.deleteGift(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/rating')
  @HttpCode(200)
  giftsRating(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body(new ValidationPipe()) dto: RatingDto,
    @Req() req: Request,
  ) {
    return this.giftService.giftsRating(dto, id, req.user);
  }
}
