import { EntityRepository, Repository, getManager } from "typeorm";
import { Businesses } from '../shared/entity/businesses.entity'
import { AddBusinessDto } from "./dto/add-business.dto";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ListBusinessDto } from "./dto/list-business.dto";



@EntityRepository(Businesses)
export class BusinessRepository extends Repository<Businesses>{

    async addBusiness(createBusinessDto: AddBusinessDto, userId: string): Promise<Businesses> {
        const { business_email, business_name, domain } = createBusinessDto;

        try {
            let business = new Businesses()
            business.businessEmail = business_email || null
            business.businessName = business_name
            business.domain = domain || null
            business.createdBy = userId


            await business.save()

            return business


        } catch (error) {
            throw new InternalServerErrorException(error)
        }

    }

    async getBusinessList(filterDto: ListBusinessDto) {

        try {
            const { limit, page_no, search, orderBy, orderDir } = filterDto
            let take = limit || 10
            let skip = (page_no - 1) * limit || 0;

            let where = `(LOWER(businesses.businessName) like LOWER(:search))`;

            let listQuery = getManager()
                .createQueryBuilder(Businesses, 'businesses')
                .where(search ? where : "TRUE", { search: `%${search}%` })


            if (limit) {
                listQuery.skip(skip)
                listQuery.take(take)
                listQuery.orderBy(`businesses.${orderBy}`, orderDir)
            }


            let [businesses, count] = await listQuery.getManyAndCount();



            return { data: businesses, count, message: "Fetched businesses successfully." };


        } catch (error) {

            throw new InternalServerErrorException(error)

        }

    }

    async editBusiness(editBusinessDto: AddBusinessDto, userId: string, businessId: number): Promise<Businesses> {
        const { business_email, business_name, domain } = editBusinessDto;

        try {

            let businessExists = await this.getBusinessById(businessId)

            if (!businessExists) {
                throw new NotFoundException("Business with given id doesn't exist.")
            }

            businessExists.businessEmail = business_email || businessExists.businessEmail
            businessExists.businessName = business_name || businessExists.businessName
            businessExists.domain = domain || businessExists.domain
            businessExists.updatedBy = userId
            businessExists.updatedAt = new Date()

            await businessExists.save()

            return businessExists


        } catch (error) {
            throw new InternalServerErrorException(error)
        }

    }

    async getBusinessById(id: number): Promise<Businesses> {

        try {

            return Businesses.findOne({
                where: {
                    id: id,
                    isActive: true
                }
            })

        } catch (error) {
            throw new InternalServerErrorException(error)
        }

    }

    async deactivateBusiness(businessId: number) {
        try {

            let businessExists = await this.getBusinessById(businessId)

            if (!businessExists) {
                throw new NotFoundException("Business with given id doesn't exist.")
            }

            businessExists.isActive = false

            await businessExists.save()

            return {message: "Business deactivated successfully."}

        }
        catch (error) {
            throw new InternalServerErrorException(error)

        }

    }
}

