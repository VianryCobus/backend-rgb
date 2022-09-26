import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/models';
import * as request from 'supertest';
import { AuthModule } from '../src/auth';
import databaseConfig from '../src/config/ormconfig_mysql';
import { assert } from 'console';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let email: string;
  let password: string;
  let bearer: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register', (done) => {
    request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'vx.cobusgaming@gmail.com',
        password: '12345',
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

  it('/auth/login', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'vx.cobusgaming@gmail.com',
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

  it('/auth/getuser', (done) => {
    request(app.getHttpServer())
      .get('/auth/getuser')
      .set('Authorization', `Bearer ${bearer}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          status: expect.any(Boolean),
          data: expect.any(Object),
        });
        done();
      })
      .catch((err) => done(err));
  });
});
