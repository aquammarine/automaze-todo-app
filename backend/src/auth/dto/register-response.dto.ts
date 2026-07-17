import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from 'src/users/dto/user-profile.dto';

export class RegisterResponseDto {
  @ApiProperty({ type: UserProfileDto })
  user!: UserProfileDto;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken!: string;
}
