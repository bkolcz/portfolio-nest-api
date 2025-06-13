import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TreeNodesModule } from './tree-nodes/tree-nodes.module';
import { User } from './users/entities/user.entity';
import { TreeNode } from './tree-nodes/entities/tree-node.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      name: 'users',
      type: 'sqlite',
      database: 'db-local.sqlite',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [User],
      synchronize: true, // comment it if production env
    }
    ),
    TreeNodesModule,
    TypeOrmModule.forRoot({
      name: 'tree-nodes',
      type: 'sqlite',
      database: 'db-tree-nodes.sqlite',
      entities: [TreeNode],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User], 'users'),
    TypeOrmModule.forFeature([TreeNode], 'tree-nodes')
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {
  // constructor(private dataSource: DataSource) { }
}
