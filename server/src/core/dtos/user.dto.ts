import { isInt } from 'class-validator';
export class CreateUserDto {
  id: number;

  username: string;

  avatar: string;

  email: string;
}
