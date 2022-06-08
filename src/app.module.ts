import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './orm.config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MatchService } from './match/match.service';
import { MatchModule } from './match/match.module';
import { MatchController } from './match/match.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        useFactory : ormConfig,
    }),
    UsersModule,
    JwtModule.register({
      secret: '1234',
      signOptions: {expiresIn: '12h'},
  }),
    MatchModule
  ],
  controllers: [AppController, UsersController, MatchController],
  providers: [AppService, UsersService, MatchService],
})
export class AppModule {}