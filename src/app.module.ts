import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MatchesModule } from '@modules/matches/matches.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
    ),
    MatchesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
