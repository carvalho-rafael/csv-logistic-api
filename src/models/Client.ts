import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import Operator from './Operator';

@Entity('clients')
export default class Client {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column("date")
    birthday: string;

    @Column("float", { precision: 5, scale: 2 })
    value: number; 
   
    @Column()
    email: string;

    @Column()
    operator_id: number;

    @ManyToOne(() => Operator, orphanage => orphanage.clients)
    @JoinColumn({name: 'operator_id'})
    operator: Operator;
}