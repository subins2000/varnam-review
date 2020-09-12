import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

const mongoose = require('mongoose')

@Schema()
export class Vote extends Document {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId
  })
  sid: string;

  @Prop({ required: true })
  ip: string
}

export const VoteSchema = SchemaFactory.createForClass(Vote)
