import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class ChannelParams {
  @IsOptional()
  @IsNumberString()
  id: number;

  @IsOptional()
  @IsNumberString()
  userId: number;

  @IsOptional()
  @IsNumberString()
  conversationId: number;
}

export class ConversationParams {
  @IsOptional()
  @IsNumberString()
  id: number;

  @IsOptional()
  @IsNumberString()
  userId: number;

  @IsOptional()
  @IsNumberString()
  conversationId: number;
}

export class FriendParams {
  @IsOptional()
  @IsNumberString()
  id: number;
}

export class MessageParams {
  @IsOptional()
  @IsNumberString()
  id: number;

  @IsOptional()
  @IsNumberString()
  userId: number;

  @IsOptional()
  @IsNumberString()
  conversationId: number;
}

export class NotificationParams {
  @IsOptional()
  @IsNumberString()
  id: number;
}

export class UserParams {
  @IsOptional()
  @IsNumberString()
  id: number;
}

export class RequestParams {
  @IsOptional()
  @IsNumberString()
  id: number;

  @IsOptional()
  @IsNumberString()
  friendId: number;
}

export class BlockParams {
  @IsOptional()
  @IsNumberString()
  id: number;
}

export class UpdatePasswordChannel {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  password: string;
}

export class UpdateUsername {
  @IsOptional()
  @MinLength(5)
  @MaxLength(12)
  username: string;
}
