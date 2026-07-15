import { UserProfileDto } from 'src/users/dto/user-profile.dto';

export class RegisterResponseDto {
  user!: UserProfileDto;
  accessToken!: string;
}
