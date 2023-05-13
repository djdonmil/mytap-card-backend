import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Users } from "./users.entity";

@Entity('businesses')
export class Businesses extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying", { name: "business_name", length: 255 })
    businessName: string;

    @Column("character varying", { name: "domain", length: 255, nullable: true })
    domain: string;

    @Column("character varying", { name: "company_name", length: 255, nullable: true })
    companyName: string;

    @Column("character varying", { name: "designation", length: 50, nullable: true })
    designation: string;

    @Column("character varying", { name: "business_email", length: 50, nullable: true })
    businessEmail: string;

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

   

    @OneToMany(
        () => Users,
        (users) => users.businessId
    )
    users: Users[];
}