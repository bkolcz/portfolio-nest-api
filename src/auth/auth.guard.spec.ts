import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { Reflector, APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';

describe('AuthGuard', () => {

  it('should be defined', () => {
    expect(new AuthGuard(new JwtService(), new Reflector())).toBeDefined();
  });
});
