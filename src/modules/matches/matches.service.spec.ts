import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service';
import { getModelToken } from '@nestjs/mongoose';
import { Match } from '@core/entities/match.entity';
import { CreateMatchDto, UpdateMatchDto } from './dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

const mockId = '111111111111111111111111';
const mockCreateMatchDto: CreateMatchDto = {
  homeTeam: 'Team A',
  awayTeam: 'Team B',
  dateTime: new Date('2024-11-17T21:00:00.000Z'),
};
const mockMatches: Match[] = [
  {
    homeTeam: 'Team A',
    awayTeam: 'Team B',
    dateTime: new Date('2024-11-17T21:00:00.000Z'),
    deletedAt: null,
  },
  {
    homeTeam: 'Team C',
    awayTeam: 'Team D',
    dateTime: new Date('2024-11-17T20:00:00.000Z'),
    deletedAt: new Date('2024-11-16T17:00:00.000Z'),
  },
  {
    homeTeam: 'Team E',
    awayTeam: 'Team F',
    dateTime: new Date('2024-11-17T17:00:00.000Z'),
    deletedAt: null,
  },
];

const mockSaveMatch = jest.fn();

const mockMatchModel = jest.fn().mockImplementation((dto) => ({
  ...dto,
  save: jest.fn().mockResolvedValue({ id: '1', ...dto }),
}));

const mockMatchModelStaticMethods = {
  modelName: 'Match',
  find: jest.fn().mockReturnThis(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  countDocuments: jest.fn(),
  updateOne: jest.fn(),
};

describe('MatchesService', () => {
  let matchService: MatchesService;
  let matchModel: Model<Match>;

  const matchModelToken = getModelToken(Match.name);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        {
          provide: matchModelToken,
          useValue: Object.assign(mockMatchModel, mockMatchModelStaticMethods),
        },
      ],
    }).compile();

    matchService = module.get<MatchesService>(MatchesService);
    matchModel = module.get<Model<Match>>(matchModelToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matchservice should be defined', () => {
    expect(matchService).toBeDefined();
  });

  it('matchModel should be defined', () => {
    expect(matchModel).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new match', async () => {
      const savedMatch = { ...mockCreateMatchDto, id: mockId };

      mockSaveMatch.mockResolvedValue(savedMatch);
      mockMatchModel.mockImplementation(() => ({
        save: mockSaveMatch,
      }));

      const result = await matchService.create(mockCreateMatchDto);

      expect(mockMatchModel).toHaveBeenCalledWith(mockCreateMatchDto);
      expect(mockSaveMatch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(savedMatch);
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockMatchModel.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Test Error')),
      }));

      await expect(matchService.create({} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all matches without deletedAt', async () => {
      const activeMatches = mockMatches.filter(
        (match) => match.deletedAt === null,
      );

      jest.spyOn(matchModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(activeMatches),
      } as any);

      const result = await matchService.findAll();

      expect(matchModel.find).toHaveBeenCalledWith({ deletedAt: null });

      expect(result).toEqual(activeMatches);
    });
  });

  describe('findOne', () => {
    it('should return a match by id', async () => {
      const someMatch = { id: '1', homeTeam: 'Team A', awayTeam: 'Team B' };

      jest.spyOn(matchModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(someMatch),
      } as any);

      const result = await matchService.findOne(someMatch.id);

      expect(matchModel.findById).toHaveBeenCalledWith(someMatch.id);

      expect(result).toEqual(someMatch);
    });

    it('should throw NotFoundException if match not found', async () => {
      jest.spyOn(matchModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(matchService.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    const updateDto: UpdateMatchDto = { homeTeam: 'Team C' };

    it('should update and return the match', async () => {
      const updatedMatch = { id: '1', homeTeam: 'Team C', awayTeam: 'Team B' };

      jest.spyOn(matchModel, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(updatedMatch),
      } as any);

      const result = await matchService.update(updatedMatch.id, updateDto);

      expect(matchModel.findByIdAndUpdate).toHaveBeenCalledWith(
        updatedMatch.id,
        updateDto,
        { new: true },
      );
      expect(result).toEqual(updatedMatch);
    });

    it('should throw NotFoundException if match not found', async () => {
      jest.spyOn(matchModel, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(matchService.update('1', updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should mark the match as deleted', async () => {
      jest
        .spyOn(matchModel, 'updateOne')
        .mockResolvedValueOnce({ nModified: 1 } as any);

      await matchService.remove('1');

      expect(matchModel.updateOne).toHaveBeenCalledWith(
        { _id: '1' },
        { deletedAt: expect.any(Date) },
      );
    });
  });
});
