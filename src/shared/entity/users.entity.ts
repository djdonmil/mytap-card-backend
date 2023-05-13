import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Businesses } from "./businesses.entity";

@Entity('users')
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("character varying", { name: "first_name", length: 255 })
    firstName: string;

    @Column("character varying", { name: "last_name", length: 255, nullable: true })
    lastName: string;

    @Column("character varying", { name: "company_name", length: 255, nullable: true })
    companyName: string;

    @Column("character varying", { name: "designation", length: 50, nullable: true })
    designation: string;

    @Column("integer", { name: "business_id", nullable: true })
    businessId: number | null;

    @Column("integer", { name: "role_id", default: 4 })
    roleId: number | null;

    @Column("character varying", { name: "domain", length: 255, nullable: true })
    domain: string;

    @Column({ name: "is_whitelabel", default: false })
    isWhitelabel: boolean;

    @Column({ name: "is_subscribed", default: false })
    isSubscribed: boolean;

    @Column("timestamp",{ name: "subscription_started_at", nullable: true  })
    subscriptionStartedAt: Date;

    @Column("timestamp",{ name: "subscription_expires_at", nullable: true  })
    subscriptionExpiresAt: Date;

    @Column("character varying", { name: "email", length: 50 })
    email: string;

    @Column("character varying", { name: "password", length: 255 ,nullable:true})
    password: string;

    @Column("character varying", { name: "phone_one", length: 25, nullable: true })
    phoneOne: string;

    @Column("character varying", { name: "phone_two", length: 25, nullable: true })
    phoneTwo: string;

    @Column("character varying", { name: "phone_three", length: 25, nullable: true })
    phoneThree: string;
    
    @Column("character varying", { name: "phone_four", length: 25, nullable: true })
    phoneFour: string;
    
    @Column("character varying", { name: "phone_five", length: 25, nullable: true })
    phoneFive: string;

    @Column("character varying", { name: "phone_whatsapp", length: 25, nullable: true })
    phoneWhatsapp: string;

    @Column("character varying", { name: "website_url", length: 255, nullable: true })
    websiteUrl: string;

    @Column("character varying", { name: "instagram", length: 255, nullable: true })
    instagram: string;

    @Column("character varying", { name: "facebook", length: 255, nullable: true })
    facebook: string;

    @Column("character varying", { name: "youtube", length: 255, nullable: true })
    youtube: string;

    @Column("character varying", { name: "twitter", length: 255, nullable: true })
    twitter: string;

    @Column("character varying", { name: "linkedin", length: 255, nullable: true })
    linkedin: string;

    @Column("character varying", { name: "address", nullable: true })
    address: string;

    @Column("character varying", { name: "custom_button_one_name", length: 25, nullable: true })
    customButtonOneName: string;

    @Column("character varying", { name: "custom_button_one_link", nullable: true })
    customButtonOneLink: string;

    @Column("character varying", { name: "custom_button_two_name", length: 25, nullable: true })
    customButtonTwoName: string;

    @Column("character varying", { name: "custom_button_two_link",  nullable: true })
    customButtonTwoLink: string;

    @Column("character varying", { name: "latitude", length: 25, nullable: true })
    latitude: string;

    @Column("character varying", { name: "longitude", length: 25, nullable: true })
    longitude: string;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column("character varying", { name: "user_avatar", nullable: true })
    userAvatar: string;   

    @Column({
        nullable: true,
    })
    salt: string;

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

    @ManyToOne(
        () => Businesses,
        business => business.id
    )
    @JoinColumn([{ name: "business_id", referencedColumnName: "id" }])
    business: Businesses;
}