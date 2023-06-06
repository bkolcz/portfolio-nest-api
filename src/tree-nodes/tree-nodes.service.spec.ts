import { Test, TestingModule } from '@nestjs/testing';
import { TreeNodesService } from './tree-nodes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TreeNode } from './entities/tree-node.entity';

describe('TreeNodesService', () => {
  const mockRepository = {};
  let service: TreeNodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreeNodesService,
        {
          provide: getRepositoryToken(TreeNode),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<TreeNodesService>(TreeNodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
