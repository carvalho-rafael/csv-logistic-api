import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Client from './Client';

@Entity('operators')
export default class Operator {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Client, client => client.operator, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'client_id' })
    clients: Client[];
}