import { Module } from '@nestjs/common';
import { TreeNodesService } from './tree-nodes.service';
import { TreeNodesController } from './tree-nodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreeNode } from './entities/tree-node.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TreeNode], 'tree-nodes')],
  controllers: [TreeNodesController],
  providers: [TreeNodesService],
  exports: [TreeNodesService],
})
export class TreeNodesModule {}
