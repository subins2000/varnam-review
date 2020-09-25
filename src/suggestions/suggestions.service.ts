import { Request } from 'express';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { Suggestion, SuggestionWithVoteCount } from './entities/suggestion.entity';

import { VoteSuggestionDto } from './dto/vote-suggestion.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectRepository(Suggestion)
    private readonly suggestionRepository: Repository<Suggestion>,
  ) {}

  async create(addSuggestionDto: AddSuggestionDto): Promise<Suggestion> {
    const suggestion = new Suggestion()

    suggestion.lang = addSuggestionDto.lang
    suggestion.pattern = addSuggestionDto.pattern
    suggestion.word = addSuggestionDto.word
    suggestion.votes = []

    return this.suggestionRepository.save(suggestion)
  }

  async findAll(): Promise<SuggestionWithVoteCount[]> {
    const items = await this.suggestionRepository.find()
    const results = []

    items.forEach(item => {
      const length = item.votes.length
      let newItem: SuggestionWithVoteCount = {
        ...item,
        ...{votes: length}
      }
      results.push(newItem)
    })
    
    return results
  }

  async vote(request: Request, voteSuggestionDto: VoteSuggestionDto): Promise<String> {
    const suggestion = await this.suggestionRepository.findOne(voteSuggestionDto.sid)

    if (!suggestion) {
      return 'no-suggestion'
    }

    if (suggestion.votes.find(voted => voted.ip === request.ip)) {
      return 'voted'
    }

    const vote = new Vote()
    vote.ip = request.ip

    suggestion.votes.push(vote)

    const updated = await this.suggestionRepository.update(voteSuggestionDto.sid, suggestion)
    if (updated) {
      return 'success'
    }
  }
}
