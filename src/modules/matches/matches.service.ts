import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Match } from '@core/entities/match.entity';
import { Model, RootFilterQuery, SortOrder } from 'mongoose';
import { CreateMatchDto, UpdateMatchDto } from './dto';
import { IPagination, OrderDirection, SearchDto } from '@core/crud';

@Injectable()
export class MatchesService {
  constructor(@InjectModel(Match.name) private matchModel: Model<Match>) {}

  private getEntityName() {
    return this.matchModel.modelName;
  }

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    try {
      const createdMatch = new this.matchModel(createMatchDto);
      return await createdMatch.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Match[]> {
    return await this.matchModel.find({ deletedAt: null }).exec();
  }

  async count(filter: RootFilterQuery<Match>): Promise<number> {
    return await this.matchModel.countDocuments(filter).exec();
  }

  async search(searchDto: SearchDto): Promise<IPagination<Match>> {
    const filter: RootFilterQuery<Match> = {};
    const sort: { [key: string]: SortOrder | { $meta: any } } = {};

    if (searchDto.quickFilter) {
      filter.$or = [
        {
          homeTeam: { $regex: searchDto.quickFilter, $options: 'i' },
          deletedAt: null,
        },
        {
          awayTeam: { $regex: searchDto.quickFilter, $options: 'i' },
          deletedAt: null,
        },
      ];
    }

    if (searchDto.orderBy) {
      if (searchDto.orderDirection) {
        sort[searchDto.orderBy] =
          searchDto.orderDirection === OrderDirection.ASC ? 'asc' : 'desc';
      } else {
        sort[searchDto.orderBy] = 'asc';
      }
    }

    const total = await this.count(filter);
    const items = await this.matchModel
      .find(filter)
      .skip(searchDto.skip)
      .limit(searchDto.take)
      .sort(sort)
      .exec();

    return { total, items };
  }

  async findOne(id: string): Promise<Match> {
    const entity = await this.matchModel.findById(id).exec();

    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} not found`);
    }

    return entity;
  }

  async update(id: string, updateMatchDto: UpdateMatchDto) {
    try {
      const updatedEntity = await this.matchModel
        .findByIdAndUpdate(id, updateMatchDto, { new: true })
        .exec();

      if (!updatedEntity) {
        throw new NotFoundException(`${this.getEntityName()} not found`);
      }

      return updatedEntity;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async remove(id: string): Promise<any> {
    try {
      await this.matchModel.updateOne({ _id: id }, { deletedAt: new Date() });
      return { message: `${this.getEntityName()} deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
