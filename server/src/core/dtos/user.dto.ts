import { isInt } from 'class-validator';
export class CreateUserDto {
  id: number;

  password: string;

  username: string;

  avatar: string;

  email: string;
}
