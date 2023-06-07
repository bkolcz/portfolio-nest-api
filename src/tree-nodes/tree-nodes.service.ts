import { Injectable } from '@nestjs/common';
import { CreateTreeNodeDto } from './dto/create-tree-node.dto';
import { UpdateTreeNodeDto } from './dto/update-tree-node.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeNode } from './entities/tree-node.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TreeNodesService {
  constructor(
    @InjectRepository(TreeNode, 'tree-nodes')
    private treeNodesRepository: Repository<TreeNode>,
  ) { }

  create(createTreeNodeDto: CreateTreeNodeDto) {
    return this.treeNodesRepository.save({ ...createTreeNodeDto });
  }

  findAll(): Promise<TreeNode[]> {
    return this.treeNodesRepository.find();
  }

  findOne(id: number): Promise<TreeNode | null> {
    return this.treeNodesRepository.findOneBy({ id })
  }

  update(id: number, updateTreeNodeDto: UpdateTreeNodeDto) {
    return this.treeNodesRepository.update(id, updateTreeNodeDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.treeNodesRepository.delete(id);
  }

  async removeTreeNodes(id: number): Promise<DeleteResult> {
    const result: DeleteResult = await this.treeNodesRepository.delete(id);
    const nodesToDelete: TreeNode[] | null = await this.treeNodesRepository.findBy({ parentId: id });
    if (nodesToDelete.length === 0) {
      return result;
    } else {
      for (const node of nodesToDelete) {
        await this.removeTreeNodes(node.id);
      }
    }
    return result;
  }

  async lastElement(): Promise<TreeNode | null> {
    return (await this.treeNodesRepository.find({ order: { id: "DESC" }, take: 1 })).pop();
  }

  async supplyNodes(createTreeNodeDtos: CreateTreeNodeDto[]): Promise<TreeNode[]> {
    for (const node of createTreeNodeDtos) {
      await this.treeNodesRepository.save({ ...node });
    }
    return this.treeNodesRepository.find();
  }

  async shuffleParents(updateTreeNodeDto: UpdateTreeNodeDto[]): Promise<TreeNode[]> {
    for (const node of updateTreeNodeDto) {
      await this.treeNodesRepository.update(node.id, node);
    }

    return this.treeNodesRepository.find();
  }

}
