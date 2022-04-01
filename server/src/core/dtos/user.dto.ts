import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  username: string;

  avatar: string;

  email: string;
}
