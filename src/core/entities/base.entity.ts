import { SchemaOptions, SchemaFactory, Prop } from '@nestjs/mongoose';

export const defaultOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
};

export abstract class BaseEntity {
  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export function createSchemaForEntity<T extends BaseEntity>(
  entityClass: new () => T,
) {
  const schema = SchemaFactory.createForClass(entityClass);
  schema.set('timestamps', true);
  schema.set('toJSON', defaultOptions.toJSON);
  schema.set('toObject', defaultOptions.toObject);
  return schema;
}
