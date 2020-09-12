import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SuggestionsModule } from './suggestions/suggestions.module';

const dbConnection = MongooseModule.forRoot(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
})

@Module({
  imports: [
    dbConnection,
    SuggestionsModule
  ]
})
export class AppModule {}
