import { Body, Controller, Get, Post } from '@nestjs/common';

import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { SuggestionsService } from './suggestions.service';
import { Suggestion } from './schemas/suggestion';

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
}
