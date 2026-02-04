import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateMenuDto) {
    await this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Menu);

      let parent: Menu | null = null;

      if (dto.parentId !== undefined) {
        parent = await repo.findOne({ where: { id: dto.parentId } });
        if (!parent) throw new NotFoundException('parent menu not found');
      }

      // ✅ 같은 부모(또는 루트) 아래에서 seqNo의 최대값을 구해서 +1
      // parentId가 없으면 parent_id IS NULL 인 루트 메뉴들 중 max(seq_no) + 1
      const maxRow = await repo
        .createQueryBuilder('m')
        .select('COALESCE(MAX(m.seqNo), 0)', 'max')
        .where(parent ? 'm.parent_id = :pid' : 'm.parent_id IS NULL', {
          pid: parent?.id,
        })
        .getRawOne<{ max: string }>();

      const nextSeqNo = Number(maxRow?.max ?? 0) + 1;

      const menu = repo.create({
        name: dto.name,
        parent: parent ?? undefined,
        depth: parent ? parent.depth + 1 : 0,
        seqNo: nextSeqNo,
      });

      return await repo.save(menu);
    });

    return this.findAll('tree');
  }

  async findAll(type: string) {
    if (type === 'flat') {
      return this.menuRepo.find();
    }
    const treeRepo = this.menuRepo.manager.getTreeRepository(Menu);
    return treeRepo.findTrees();
  }

  async findOne(id: number) {
    const menu = await this.menuRepo.findOne({ where: { id } });
    if (!menu) throw new NotFoundException('menu not found');
    return menu;
  }

  async update(id: number, dto: UpdateMenuDto) {
    const menu = await this.findOne(id);
    if (dto.name) menu.name = dto.name;
    return await this.menuRepo.save(menu);
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
    await this.menuRepo.remove(menu);
    return { deleted: true };
  }
}
