import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Suggestion extends Document {
  @Prop({ required: true })
  lang: string;

  @Prop({ required: true })
  pattern: string;

  @Prop({ required: true })
  word: string;
}

export const SuggestionSchema = SchemaFactory.createForClass(Suggestion); 
