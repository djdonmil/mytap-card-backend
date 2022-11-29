import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('reset-password-tokens')
export class ResetPasswordToken extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    user_id: string;

    @Column({ default: false })
    is_active: boolean;

    @Column({ type: 'bigint' })
    expire_time: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'created_at'
    })
    createdAt: Date;


    @ManyToOne(
        () => User,
        user => user.id
    )
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;


}