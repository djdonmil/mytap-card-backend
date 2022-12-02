import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Products } from "./products.entity";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("character varying", { name: "first_name", length: 255 })
    firstName: string;

    @Column("character varying", { name: "last_name", length: 255, nullable: true })
    lastName: string;

    @Column("character varying", { name: "gender", length: 15, nullable: true })
    gender: string | null;

    @Column()
    email: string;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column("character varying", { name: "password", length: 255 })
    password: string;

    @Column("uuid", { name: "created_by", nullable: true })
    createdBy: string | null;

    @Column("uuid", { name: "updated_by", nullable: true })
    updatedBy: string | null;

    @Column("integer", { name: "role_id", nullable: true })
    roleId: number | null;

    @Column("character varying", { name: "phone_number", length: 15, nullable: true })
    phoneNumber: string | null;


    @Column({
        nullable: true,
    })
    salt: string;

    
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

   
    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, this.salt);
        }
    }

    async validatePassword(password: string): Promise<boolean> {

        const hash = await bcrypt.hash(password, this.salt);

        if (hash === this.password) {
            return true;
        } else {
            return false;
        }
    }

    @OneToMany(
        () => Products,
        (products) => products.user
    )
    products: Products[];
}