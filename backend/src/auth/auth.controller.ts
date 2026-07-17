import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  HttpCode,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Request, Response } from 'express';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UsersService } from 'src/users/users.service';
import { UserProfileDto } from 'src/users/dto/user-profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const { user, tokens } = await this.authService.login(dto);

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { user, accessToken: tokens.accessToken };
  }

  @ApiOperation({ summary: 'Register a new account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, type: RegisterResponseDto })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RegisterResponseDto> {
    const { user, tokens } = await this.authService.register(dto);

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { user, accessToken: tokens.accessToken };
  }

  @ApiOperation({ summary: 'Logout and clear refresh token cookie' })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({ status: 204, description: 'Logged out' })
  @Post('logout')
  @HttpCode(204)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const refreshToken = request.cookies['refreshToken'];
    await this.authService.logout(refreshToken);
    response.clearCookie('refreshToken');
  }

  @ApiOperation({ summary: 'Rotate refresh token and get new access token' })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({ status: 201, schema: { properties: { accessToken: { type: 'string' } } } })
  @ApiResponse({ status: 401, description: 'Missing or invalid refresh token' })
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const oldRefreshToken = request.cookies['refreshToken'];
    if (!oldRefreshToken) throw new UnauthorizedException('No refresh token');

    const { accessToken, refreshToken } =
      await this.authService.refresh(oldRefreshToken);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiCookieAuth('access_token')
  @ApiResponse({ status: 200, type: UserProfileDto })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: { id: string }): Promise<UserProfileDto> {
    return await this.usersService.findById(user.id);
  }
}
