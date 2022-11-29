import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('otp')
export class Otp extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;

    @Column()
    otp: string;

    @Column()
    otp_type: number;

    @Column({ type: 'bigint' })
    expire_time: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'created_at'
    })
    createdAt: Date;

    @Column({ name: 'is_used', default: false })
    isUsed: boolean
}