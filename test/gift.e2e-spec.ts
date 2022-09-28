import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift, User } from '../src/models';
import * as request from 'supertest';
import { AuthModule } from '../src/auth';
import databaseConfig from '../src/config/ormconfig_mysql';
import { assert } from 'console';
import { GiftModule } from '../src/gift';

describe('GiftController (e2e)', () => {
  let app: INestApplication;
  let email: string;
  let password: string;
  let bearer: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        GiftModule,
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([User, Gift]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'vx.pangemanan@gmail.com',
        password: '12345',
      })
      .then((response) => {
        // console.log(response.body);
        bearer = response.body.access_token;
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          status: expect.any(Boolean),
          access_token: expect.any(String),
        });
        // console.log(`bearer : ${bearer}`);
        done();
      })
      .catch((err) => done(err));
  });

  it('/gifts (GET)', (done) => {
    request(app.getHttpServer())
      .get('/gifts?sort=DESC')
      .set('Authorization', `Bearer ${bearer}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          totalCount: expect.any(Number),
          page: expect.any(Number),
          limit: expect.any(Number),
          data: expect.any(Array),
        });
        done();
      })
      .catch((err) => done(err));
  });

  it('/gifts/3', (done) => {
    request(app.getHttpServer())
      .get('/gifts/3')
      .set('Authorization', `Bearer ${bearer}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          status: expect.any(Boolean),
          data: expect.any(Array),
        });
        done();
      })
      .catch((err) => done(err));
  });

  it('/gifts/3/rating', (done) => {
    request(app.getHttpServer())
      .post('/gifts/3/rating')
      .set('Authorization', `Bearer ${bearer}`)
      .send({
        rating: 2,
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
        });
        done();
      })
      .catch((err) => done(err));
  });

  it('/gifts (POST)', (done) => {
    request(app.getHttpServer())
      .post('/gifts')
      .set('Authorization', `Bearer ${bearer}`)
      .send({
        name: 'Nokia 3510',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 2500000,
        stock: 5,
        image:
          'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
        });
        done();
      })
      .catch((err) => done(err));
  });

  it('/gifts (PUT)', (done) => {
    request(app.getHttpServer())
      .put('/gifts/7')
      .set('Authorization', `Bearer ${bearer}`)
      .send({
        name: 'Nokia 35110',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 2500000,
        stock: 15,
        image:
          'https://picsum.photos/200/300?random=1https://picsum.photos/200/300?random=1',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
        });
        done();
      })
      .catch((err) => done(err));
  });

  it('/gifts (PATCH)', (done) => {
    request(app.getHttpServer())
      .patch('/gifts/7')
      .set('Authorization', `Bearer ${bearer}`)
      .send({
        stock: 26,
        price: 2550000,
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
        });
        done();
      })
      .catch((err) => done(err));
  });

  it('/gifts (DELETE)', (done) => {
    request(app.getHttpServer())
      .delete('/gifts/7')
      .set('Authorization', `Bearer ${bearer}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
        });
        done();
      })
      .catch((err) => done(err));
  });

  it('/gifts/1/REDEEM (POST)', (done) => {
    request(app.getHttpServer())
      .post('/gifts/1/redeem')
      .set('Authorization', `Bearer ${bearer}`)
      .send({
        qty: 2,
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toStrictEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
        });
        done();
      })
      .catch((err) => done(err));
  });
});
