import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TreeNode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    parentId: number;

    @Column()
    name: string;

}
