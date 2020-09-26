import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuggestionsModule } from './suggestions/suggestions.module';

import { Suggestion } from './suggestions/entities/suggestion.entity';

require('dotenv').config()
const dbConnection = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: process.env.DB_URL,
  entities: [Suggestion],
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
