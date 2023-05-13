import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessRepository } from './businesses.repository'
import { JwtService } from '@nestjs/jwt';
import { AddBusinessDto } from './dto/add-business.dto';
import { ListBusinessDto } from './dto/list-business.dto';

@Injectable()
export class BusinessesService {

    constructor(
        @InjectRepository(BusinessRepository)
        private businessRepository: BusinessRepository,
    ) { }

    async addBusiness(createBusinessDto: AddBusinessDto, userId) {

        const result = await this.businessRepository.addBusiness(createBusinessDto, userId)

        return { data: result, message: "Business added successfully." }

    }

    async getBusinessList(pageQueryDto: ListBusinessDto) {
        return this.businessRepository.getBusinessList(pageQueryDto)
    }

    async editBusiness(editBusinessDto: AddBusinessDto, userId: string, businessId: number) {

        const result = await this.businessRepository.editBusiness(editBusinessDto, userId, businessId)

        return { data: result, message: "Business updated successfully." }

    }

    async getBusinessById(businessId: number) {
        return {
            data: await this.businessRepository.getBusinessById(businessId),
            message: "Business fetched successfully."
        }
    }

    async deactivateBusiness(businessId: number) {
        return this.businessRepository.deactivateBusiness(businessId)
    }
}
