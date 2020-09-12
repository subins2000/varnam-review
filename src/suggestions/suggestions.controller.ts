import { Request } from 'express';

import { Body, Controller, Get, Post } from '@nestjs/common';

import { SuggestionsService } from './suggestions.service';

import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { Suggestion } from './schemas/suggestion';

import { VoteSuggestionDto } from './dto/vote-suggestion.dto';
import { Vote } from './schemas/vote';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Get()
  findAll(): Promise<Suggestion[]> {
    return this.suggestionsService.findAll();
  }

  @Post()
  async add(@Body() suggestion: AddSuggestionDto) {
    await this.suggestionsService.create(suggestion);
  }

  @Post('vote')
  async vote(request: Request, @Body() voteSuggestion: VoteSuggestionDto) {
    await this.suggestionsService.vote(request, voteSuggestion);
  }
}
