import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FortyTwoStrategyAuthGuard extends AuthGuard('42') {}
