import { Otp } from "src/shared/entity/otp.entity";
import { User } from "src/shared/entity/user.entity";
import { EntityRepository, getManager, Repository, Not, } from "typeorm";
import { UpdateUserDto } from "./dto/edit_user.dto";
import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { AddUserDto } from "./dto/add_user.dto";
import * as bcrypt from "bcrypt";
import { Role } from "src/shared/enums/role.enum";
import { PageQueryDto } from "src/shared/dtos/list_query.dto";
import { CompleteSetupDto } from "./dto/complete_user_setup.dto";
import { FileDto } from "./dto/image_upload.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async getOtpData(userId, otp, otpType) {
        const result = await getManager()
            .createQueryBuilder(Otp, 'otp')
            .where('otp.user_id =:userId', { userId })
            .andWhere('otp.otp =:otp', { otp })
            .andWhere('otp.otp_type =:otpType', { otpType })
            .orderBy('created_at', 'DESC')
            .getOne();

        return result;
    }

    async getUser(id) {

        const result = await getManager()
            .createQueryBuilder(User, 'user')
            .leftJoinAndSelect('user.products', 'products')
            .select(['user', 'products'])
            .where('user.id =:userId', { userId: id })
            .getOne();

        return result;
    }

    async getUserByEmail(email, isActive, isDelete) {

        const result = await getManager()
            .createQueryBuilder(User, 'user')
            .leftJoinAndSelect('user.userConfigDetail', 'userConfigDetail')
            .select(['user', 'userConfigDetail'])
            .where('user.email =:email', { email: email })
            .andWhere('user.isDelete=:isDelete', { isDelete: isDelete })
            .andWhere('user.isActive=:isActive', { isActive: isActive })
            .getOne();

        return result;
    }

    async editUser(updateUser: UpdateUserDto, user: User) {

        const userData = await User.findOne({
            where: {
                email: updateUser.email,
                isActive: true
            }
        });
        if (!userData) {
            throw new NotFoundException('User not found');
        }

        if (updateUser.first_name)
            userData.firstName = updateUser.first_name;

        if (updateUser.last_name)
            userData.lastName = updateUser.last_name;

        if (updateUser.gender)
            userData.gender = updateUser.gender;

        userData.email = updateUser.email;
        userData.updatedBy = user.id;

        try {
            let res = await userData.save();
            delete res.password,
                delete res.salt
            return res;
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async addUser(addUser: AddUserDto, userId) {
        const user = new User();
        const salt = await bcrypt.genSalt();
        user.firstName = addUser.first_name;
        user.lastName = addUser.last_name;
        user.email = addUser.email;
        user.password = addUser.password;
        user.salt = salt;
        user.roleId = addUser.role_id;
        user.gender = addUser.gender
        user.phoneNumber = addUser.phone_number
        user.createdBy = userId;

        try {
            const res = await user.save();
            return res;
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async completeUserSetup(completeSetup: CompleteSetupDto, userExists: User, userId): Promise<any> {
        const { pronouns, purpose_of_usage, organise_pills_day, utc_organise_pills_day, organise_pills_time, organise_pills_colour, organise_pills_hsv_colour, consumption_time_morning, consumption_time_evening, consumption_colour_morning, consumption_hsv_colour_morning, consumption_hsv_colour_evening, consumption_colour_evening, colour_code } = completeSetup
        try {

            //updating fields in user table
            userExists.updatedAt = new Date();
            userExists.updatedBy = userId;

            const resUser = await userExists.save()
            console.log('res usessssss');


            return { user: resUser }
        }
        catch (err) {
            throw new BadRequestException(err);
        }
    }


    async fetchAllUsers(filterDto: PageQueryDto) {

        let listQuery = getManager()
            .createQueryBuilder(User, 'user')
           // .where('user.roleId IN(:...roles)', { roles: [Role.DEALER, Role.SC_USER, Role.END_USER] })


        if (filterDto) {
            listQuery.skip(filterDto.offset * filterDto.limit)
            listQuery.take(filterDto.limit)
            listQuery.orderBy(`user.${filterDto.orderBy}`, filterDto.orderDir)
        }

        let usersWithCount = await listQuery.getManyAndCount();

        if (filterDto) {
            filterDto.count = usersWithCount[1];
        }

        return { users: usersWithCount[0], page: filterDto };
    }

    async saveImage(user: User, imagePath) {
        try {
            let res = await user.save();
            return res;
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

}

