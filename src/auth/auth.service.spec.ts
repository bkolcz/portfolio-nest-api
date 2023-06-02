import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { Reflector, APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' }
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
