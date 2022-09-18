import { Gift } from '../../models';
import { define } from 'typeorm-seeding';

define(Gift, () => {
  const gift = new Gift();
  gift.name = 'test';
  gift.description = 'awaawfw';
  gift.price = 5;
  gift.stock = 5;
  gift.image = 'tests';
  return gift;
});
