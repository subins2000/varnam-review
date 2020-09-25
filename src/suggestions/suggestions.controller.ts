import { Request } from 'express';

import { Body, Controller, Get, Post, Req, HttpStatus, HttpException, Query } from '@nestjs/common';

import { SuggestionsService } from './suggestions.service';

import { SuggestionWithVoteCount } from './entities/suggestion.entity';

import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { FetchSuggestionDto } from './dto/fetch-suggestion.dto';
import { VoteSuggestionDto } from './dto/vote-suggestion.dto';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Get()
  findAll(@Req() request: Request, @Query() query: FetchSuggestionDto): Promise<SuggestionWithVoteCount[]> {
    return this.suggestionsService.findAll(request, query.lang);
  }

  @Post()
  async add(@Body() suggestion: AddSuggestionDto) {
    await this.suggestionsService.create(suggestion);
  }

  @Post('vote')
  async vote(@Req() request: Request, @Body() voteSuggestion: VoteSuggestionDto) {
    const vote = await this.suggestionsService.vote(request, voteSuggestion);
    if (vote === 'no-suggestion') {
      throw new HttpException('suggestion-not-found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException(vote, HttpStatus.CREATED);
    }
  }
}
