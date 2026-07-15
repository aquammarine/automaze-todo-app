import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { RedisService } from 'src/infra/cache/redis/redis.service';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResultDto } from './dto/auth-result.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redis: RedisService,
    private readonly jwt: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResultDto> {
    const { email, password } = registerDto;

    const user = await this.usersService.findByEmail(email);
    if (user)
      throw new ConflictException('User with this email is already exists');

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await this.usersService.create({
      email,
      password: passwordHash,
    });

    const tokens = await this.generateToken(newUser.id, newUser.email);

    return { user: { id: newUser.id, email: newUser.email }, tokens };
  }

  async login(loginDto: LoginDto): Promise<AuthResultDto> {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const tokens = await this.generateToken(user.id, user.email);

    return { user, tokens };
  }

  async logout(refreshToken: string) {
    return await this.redis.del(`refresh:${refreshToken}`);
  }

  async generateToken(id: string, email: string): Promise<AuthTokensDto> {
    const payload = { id, email };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = crypto.randomUUID();
    await this.redis.set(
      `refresh:${refreshToken}`,
      id,
      'EX',
      30 * 24 * 60 * 60,
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken): Promise<AuthTokensDto> {
    const userId = await this.redis.get(`refresh:${refreshToken}`);
    if (!userId) throw new UnauthorizedException('Token is expired or invalid');

    await this.redis.del(`refresh:${refreshToken}`);

    const user = await this.usersService.findById(userId);
    if (!user) throw new BadRequestException('Invalid user');

    return await this.generateToken(user.id, user.email);
  }
}
