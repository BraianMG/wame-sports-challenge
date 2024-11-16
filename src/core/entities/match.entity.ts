import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity, createSchemaForEntity } from './base.entity';

export type MatchDocument = HydratedDocument<Match>;

@Schema()
export class Match extends BaseEntity {
  @Prop({ type: String, required: true })
  homeTeam: string;

  @Prop({ type: String, required: true })
  awayTeam: string;

  @Prop({ type: Date, required: true })
  dateTime: Date;
}

export const MatchSchema = createSchemaForEntity<Match>(Match);
