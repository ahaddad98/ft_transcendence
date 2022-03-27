import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateChannelDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  password: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;
}

export class CreatePublicChannelDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;
}
