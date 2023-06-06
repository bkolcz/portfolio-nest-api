import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TreeNode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    parentId: string;
}
