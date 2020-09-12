import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { Suggestion, SuggestionSchema } from './schemas/suggestion';
import { Vote, VoteSchema } from './schemas/vote';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Suggestion.name, schema: SuggestionSchema }]),
    MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }])
  ],
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class SuggestionsModule {}
