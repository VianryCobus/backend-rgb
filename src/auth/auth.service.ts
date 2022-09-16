import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models';
import { Repository } from 'typeorm';
import { SigninDto, SignupDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    // Generate the password hash
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    // save the new
    try {
      // check if email is already exist
      const userExist = await this.usersRepository.findOne({
        where: {
          email: dto.email,
        },
      });
      if (userExist) throw new ForbiddenException('Email already exist');
      // create new user object
      const newUser = await this.usersRepository.create({
        email: dto.email,
        hash,
        point: 0,
      });
      // save new user
      const userSaved = await this.usersRepository.save(newUser);
      let returnData;
      if (userSaved) {
        returnData = {
          status: true,
          message: 'signed up successfully',
        };
      } else {
        returnData = {
          status: false,
          message: 'signed up failed',
        };
      }
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    // find the user by email
    const findUser = await this.usersRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (!findUser) throw new UnauthorizedException(`Credentials isn't exist`);
    // compare password
    const pwMatches = await bcrypt.compare(dto.password, findUser.hash);
    if (!pwMatches) throw new UnauthorizedException('Credentials incorrect');
    const payload = {
      sub: findUser.id,
      email: findUser.email,
    };
    return {
      status: true,
      access_token: this.jwtService.sign(payload),
    };
  }

  async getuser(user) {
    let getUser;
    if (user.email) {
      getUser = await this.usersRepository.findOne({
        where: {
          email: user.email,
        },
      });
    }
    return {
      status: true,
      data: getUser,
    };
  }
}
