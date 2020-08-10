import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auto-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(@InjectRepository(UserRepository) private userRepository : UserRepository, private jwtService : JwtService) {}

    async signUp(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        return this.userRepository.signUp(authCredentialsDto)
    } 
    async signIn(authCredentialsDto : AuthCredentialsDto) : Promise<{accessToken : string}> {
        const username = await this.userRepository.signIn(authCredentialsDto);
        if(!username) {
            throw new UnauthorizedException("Invalid credentials")
        }

        const payload : JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT token.`);
        return { accessToken }
    } 
}
