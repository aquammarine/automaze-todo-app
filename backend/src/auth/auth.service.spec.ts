import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RedisService } from 'src/infra/cache/redis/redis.service';
import bcrypt from 'bcrypt';

jest.mock('src/users/users.service');
jest.mock('src/infra/cache/redis/redis.service');

jest.mock('bcrypt', () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

const mockBcrypt = bcrypt as unknown as { hash: jest.Mock; compare: jest.Mock };

const mockUsersService = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};

const mockRedis = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
};

const mockJwt = {
  signAsync: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: RedisService, useValue: mockRedis },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('throws ConflictException if email already taken', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ id: '1', email: 'a@b.com' });

      await expect(service.register({ email: 'a@b.com', password: 'password123456' }))
        .rejects.toThrow(ConflictException);
    });

    it('hashes password and creates user', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({ id: 'new-id', email: 'a@b.com' });
      mockBcrypt.hash.mockResolvedValue('hashed');
      mockJwt.signAsync.mockResolvedValue('access-token');
      mockRedis.set.mockResolvedValue('OK');

      const result = await service.register({ email: 'a@b.com', password: 'password123456' });

      expect(mockBcrypt.hash).toHaveBeenCalledWith('password123456', 12);
      expect(mockUsersService.create).toHaveBeenCalledWith({ email: 'a@b.com', password: 'hashed' });
      expect(result.user).toEqual({ id: 'new-id', email: 'a@b.com' });
      expect(result.tokens.accessToken).toBe('access-token');
    });
  });

  describe('login', () => {
    it('throws BadRequestException if user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.login({ email: 'a@b.com', password: 'password123456' }))
        .rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException if password invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ id: '1', email: 'a@b.com', password: 'hashed' });
      mockBcrypt.compare.mockResolvedValue(false);

      await expect(service.login({ email: 'a@b.com', password: 'wrongpassword' }))
        .rejects.toThrow(BadRequestException);
    });

    it('returns user and tokens on valid credentials', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ id: '1', email: 'a@b.com', password: 'hashed' });
      mockBcrypt.compare.mockResolvedValue(true);
      mockJwt.signAsync.mockResolvedValue('access-token');
      mockRedis.set.mockResolvedValue('OK');

      const result = await service.login({ email: 'a@b.com', password: 'password123456' });

      expect(result.user).toEqual({ id: '1', email: 'a@b.com' });
      expect(result.tokens.accessToken).toBe('access-token');
      expect(result.tokens.refreshToken).toBeDefined();
    });
  });

  describe('logout', () => {
    it('deletes refresh token from redis', async () => {
      mockRedis.del.mockResolvedValue(1);

      await service.logout('some-refresh-token');

      expect(mockRedis.del).toHaveBeenCalledWith('refresh:some-refresh-token');
    });

    it('does nothing if refreshToken is empty', async () => {
      await service.logout('');

      expect(mockRedis.del).not.toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('throws UnauthorizedException if token not in redis', async () => {
      mockRedis.get.mockResolvedValue(null);

      await expect(service.refresh('expired-token'))
        .rejects.toThrow(UnauthorizedException);
    });

    it('throws BadRequestException if user not found', async () => {
      mockRedis.get.mockResolvedValue('user-id');
      mockRedis.del.mockResolvedValue(1);
      mockUsersService.findById.mockResolvedValue(null);

      await expect(service.refresh('valid-token'))
        .rejects.toThrow(BadRequestException);
    });

    it('rotates token — deletes old, issues new', async () => {
      mockRedis.get.mockResolvedValue('user-id');
      mockRedis.del.mockResolvedValue(1);
      mockUsersService.findById.mockResolvedValue({ id: 'user-id', email: 'a@b.com' });
      mockJwt.signAsync.mockResolvedValue('new-access-token');
      mockRedis.set.mockResolvedValue('OK');

      const result = await service.refresh('old-refresh-token');

      expect(mockRedis.del).toHaveBeenCalledWith('refresh:old-refresh-token');
      expect(mockRedis.set).toHaveBeenCalled();
      expect(result.accessToken).toBe('new-access-token');
      expect(result.refreshToken).toBeDefined();
      expect(result.refreshToken).not.toBe('old-refresh-token');
    });
  });
});
