import { Test, TestingModule } from '@nestjs/testing';
import { TreeNodesController } from './tree-nodes.controller';
import { TreeNodesService } from './tree-nodes.service';

describe('TreeNodesController', () => {
  let controller: TreeNodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreeNodesController],
      providers: [
        {
          provide: TreeNodesService,
          useValue: {}
        }
      ],
    }).compile();

    controller = module.get<TreeNodesController>(TreeNodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
