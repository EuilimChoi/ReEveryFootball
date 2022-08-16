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
import { GroundController } from './ground/ground.controller';
import { GroundService } from './ground/ground.service';
import { GroundModule } from './ground/ground.module';

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
    MatchModule,
    GroundModule
  ],
  controllers: [AppController, UsersController, MatchController, GroundController],
  providers: [AppService, UsersService, MatchService, GroundService],
})
export class AppModule {}