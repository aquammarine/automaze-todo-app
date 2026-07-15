import { UserProfileDto } from "src/users/dto/user-profile.dto";
import { AuthTokensDto } from "./auth-tokens.dto";

export class AuthResultDto {
    user!: UserProfileDto
    tokens!: AuthTokensDto
}