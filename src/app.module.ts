import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { BuildingModule } from './building/building.module';
import { UserModule } from './user/user.module';
import { AlertGateway } from './alert/alert.gateway';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    BuildingModule,
    UserModule,
    AlertModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
