import { Request } from 'express';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { Suggestion } from './entities/suggestion.entity';

import { VoteSuggestionDto } from './dto/vote-suggestion.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectRepository(Suggestion)
    @InjectRepository(Vote)
    private readonly suggestionRepository: Repository<Suggestion>,
    private readonly voteRepository: Repository<Vote>,
  ) {}

  async create(addSuggestionDto: AddSuggestionDto): Promise<Suggestion> {
    const suggestion = new Suggestion()
    suggestion.lang = addSuggestionDto.lang
    suggestion.pattern = addSuggestionDto.pattern
    suggestion.word = addSuggestionDto.word

    return this.suggestionRepository.save(suggestion)
  }

  async findAll(): Promise<Suggestion[]> {
    return this.suggestionRepository.find()
  }

  async vote(request: Request, voteSuggestionDto: VoteSuggestionDto): Promise<Vote> {
    const vote = new Vote()
    vote.sid = voteSuggestionDto.sid
    vote.ip = voteSuggestionDto.ip

    return this.voteRepository.save(vote)
  }
}
