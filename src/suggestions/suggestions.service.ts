import { Request } from 'express';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { Suggestion } from './schemas/suggestion';

import { VoteSuggestionDto } from './dto/vote-suggestion.dto';
import { Vote } from './schemas/vote';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectModel(Suggestion.name) private readonly suggestionModel: Model<Suggestion>,
    @InjectModel(Vote.name) private readonly voteModel: Model<Vote>
  ) {}

  async create(suggestion: AddSuggestionDto): Promise<Suggestion> {
    const createdSuggestion = new this.suggestionModel(suggestion);
    return createdSuggestion.save();
  }

  async findAll(): Promise<Suggestion[]> {
    return this.suggestionModel.find().exec();
  }

  async vote(request: Request, voteData: VoteSuggestionDto): Promise<Vote> {
    voteData.ip = request.ip
    const createdVote = new this.voteModel(voteData);
    return createdVote.save();
  }
}
