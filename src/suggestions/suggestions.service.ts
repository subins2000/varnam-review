import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddSuggestionDto } from './dto/add-suggestion.dto';
import { Suggestion } from './schemas/suggestion';

@Injectable()
export class SuggestionsService {
  constructor(@InjectModel(Suggestion.name) private readonly suggestionModel: Model<Suggestion>) {}

  async create(suggestion: AddSuggestionDto): Promise<Suggestion> {
    const createdCat = new this.suggestionModel(suggestion);
    return createdCat.save();
  }

  async findAll(): Promise<Suggestion[]> {
    return this.suggestionModel.find().exec();
  }
}
