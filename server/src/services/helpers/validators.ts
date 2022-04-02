import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumberString,
} from 'class-validator';

export class ChannelParams {
  @IsNumberString()
  id: number;

  @IsNumberString()
  userId: number;
}

export class ConversationParams {
  @IsNumberString()
  id: number;

  @IsNumberString()
  userId: number;

  @IsNumberString()
  conversationId: number;
}

export class FriendParams {
  @IsNumberString()
  id: number;
}

export class MessageParams {
  @IsNumberString()
  id: number;

  @IsNumberString()
  userId: number;

  @IsNumberString()
  conversationId: number;
}

export class NotificationParams {
  @IsNumberString()
  id: number;
}

export class UserParams {
  @IsNumberString()
  id: number;
}

export class RequestParams {
  @IsNumberString()
  id: number;

  @IsNumberString()
  friendId: number;
}

export class BlockParams {
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
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(12)
  username: string;
}
