import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const obj: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get<string>('POSTGRES.HOST'),
          port: configService.get<number>('POSTGRES.PORT'),
          database: configService.get<string>('POSTGRES.DATABASE'),
          username: configService.get<string>('POSTGRES.USERNAME'),
          password: configService.get<string>('POSTGRES.PASSWORD'),
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        };
        return obj;
      },
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
