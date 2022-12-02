import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Products } from "./products.entity";

@Entity('repair_status')
export class RepairStatus extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer", { name: "status_id", unique:true })
    statusId: number;

    @Column("character varying", { name: "status_name", length: 255 })
    statusName: string;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
        name: 'updated_at'
    })
    updatedAt: Date


    @OneToMany(
        () => Products,
        (products) => products.repairStatus
    )
    products: Products[];

}