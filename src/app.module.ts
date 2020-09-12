import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuggestionsModule } from './suggestions/suggestions.module';

import { Suggestion } from './suggestions/entities/suggestion.entity';
import { Vote } from './suggestions/entities/vote.entity';

require('dotenv').config()
const dbConnection = TypeOrmModule.forRoot({
  url: process.env.DB_URL,
  entities: [Suggestion, Vote],
  autoLoadEntities: true,
  synchronize: true,
})

@Module({
  imports: [
    dbConnection,
    SuggestionsModule
  ]
})
export class AppModule {}
