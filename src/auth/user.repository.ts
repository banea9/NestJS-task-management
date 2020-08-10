import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auto-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPasword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This username is already in use.');
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if(user && await user.validatePassword(password)) {
        return user.username
    }
        return null
}
  private async hashPasword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
