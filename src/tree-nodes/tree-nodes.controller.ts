import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TreeNodesService } from './tree-nodes.service';
import { CreateTreeNodeDto } from './dto/create-tree-node.dto';
import { UpdateTreeNodeDto } from './dto/update-tree-node.dto';
import { Public } from 'src/public/public.decorator';

@Public()
@Controller('tree-nodes')
export class TreeNodesController {
  constructor(private readonly treeNodesService: TreeNodesService) { }

  @Post()
  create(@Body() createTreeNodeDto: CreateTreeNodeDto) {
    return this.treeNodesService.create(createTreeNodeDto);
  }

  @Get()
  findAll() {
    return this.treeNodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treeNodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTreeNodeDto: UpdateTreeNodeDto) {
    return this.treeNodesService.update(+id, updateTreeNodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treeNodesService.remove(+id);
  }

  @Delete('/delete-tree/:id')
  removeTreeNodes(@Param('id') id: string) {
    return this.treeNodesService.removeTreeNodes(+id);
  }

  @Put('/shuffle')
  shuffleParents(@Body() updateTreeNodeDtos: UpdateTreeNodeDto[]) {
    return this.treeNodesService.shuffleParents(updateTreeNodeDtos);
  }

  @Post('/supply')
  supplyNodes(@Body() createTreeNodeDtos: CreateTreeNodeDto[]) {
    return this.treeNodesService.supplyNodes(createTreeNodeDtos);
  }

  @Get('/last-element/item')
  lastElement() {
    return this.treeNodesService.lastElement();
  }

  @Get('/last-element/index')
  lastIndex() {
    return this.treeNodesService.lastIndex();
  }
}
