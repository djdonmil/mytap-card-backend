import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { RepairStatus } from "./repair-status.entity";

@Entity('products')
export class Products extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid", { name: "product_owner", nullable: true })
    productOwner: string;

    @Column("character varying", { name: "product_name", length: 255 })
    productName: string;

    @Column("character varying", { name: "product_config", length: 255, nullable: true })
    productConfig: string;

    @Column("character varying", { name: "product_issue", nullable: true })
    productIssue: string | null;

    @Column("character varying", { name: "product_colour", length: 15, nullable: true })
    productColour: string;

    @Column("character varying", { name: "product_condition", length: 255, nullable: true })
    productCondition: string;

    @Column("integer", { name: "status", default: 1 })
    status: number;

    @Column("timestamp", { name: 'estimated_delivery', nullable: true })
    estimatedDelivery: Date;

    @Column("timestamp", { name: 'actual_delivery', nullable: true })
    actualDelivery: Date;

    @Column("timestamp", { name: 'inward_date', nullable: true })
    inwardDate: Date;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column("uuid", { name: "created_by", nullable: true })
    createdBy: string | null;

    @Column("uuid", { name: "updated_by", nullable: true })
    updatedBy: string | null;

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
    updatedAt: Date;


    @ManyToOne(
        () => User,
        user => user.id
    )
    @JoinColumn([{ name: "product_owner", referencedColumnName: "id" }])
    user: User;


    @ManyToOne(
        () => RepairStatus,
        repairStatus => repairStatus.id
    )
    @JoinColumn([{ name: "status", referencedColumnName: "statusId" }])
    repairStatus: RepairStatus;

}