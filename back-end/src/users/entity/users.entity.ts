import { PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, BaseEntity } from 'typeorm';

@Entity()
export  class User_ent extends BaseEntity  {
    @PrimaryColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
}