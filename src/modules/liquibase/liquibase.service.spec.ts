import { Test, TestingModule } from '@nestjs/testing';
import { LiquibaseService } from './liquibase.service';

describe('LiquibaseService', () => {
  let service: LiquibaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiquibaseService],
    }).compile();

    service = module.get<LiquibaseService>(LiquibaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
