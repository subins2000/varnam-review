import { Request } from 'express';

import { Body, Controller, Get, Post, Req, HttpStatus, HttpException } from '@nestjs/common';

import { SuggestionsService } from './suggestions.service';

import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { SuggestionWithVoteCount } from './entities/suggestion.entity';

import { VoteSuggestionDto } from './dto/vote-suggestion.dto';
import { Vote } from './entities/vote.entity';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Get()
  findAll(@Req() request: Request,): Promise<SuggestionWithVoteCount[]> {
    return this.suggestionsService.findAll(request);
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
