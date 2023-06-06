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

  async removeTreeNodes(id: number): Promise<DeleteResult[]> {
    let nextDelete: string = `${id}`;
    const results: DeleteResult[] = [];
    do {
      const result = await this.treeNodesRepository.delete(+nextDelete);
      results.push(result);
      const nodeToDelete: TreeNode | null = await this.treeNodesRepository.findOneBy({ parentId: `${id}` });
      nextDelete = `${nodeToDelete?.id??""}`;
    } while (nextDelete !== "")

    return results;
  }

  async lastIndex(): Promise<{last_index: number}> {
    return { last_index: await this.treeNodesRepository.maximum("id") };
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
