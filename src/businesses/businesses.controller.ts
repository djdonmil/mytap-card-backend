import { Controller, Post, UseGuards, UseFilters, UseInterceptors, Body, Get, Query, Param, Patch } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StatusFilter } from 'src/shared/interceptors/status_exception/status.filter';
import { StatusInterceptor } from 'src/shared/interceptors/status_exception/statusInterceptor.interceptor';
import { AddBusinessDto } from './dto/add-business.dto'
import { GetUser } from 'src/auth/get-user.dacorator';
import { RolesGuard } from 'src/shared/helper/role.guard';
import { Roles } from '../shared/decorators/role.decorator';
import { RolesEnum } from 'src/shared/enums/role.enum';
import { ListBusinessDto } from './dto/list-business.dto';

@Controller('businesses')
@ApiTags('Businesses')

export class BusinessesController {

    constructor(
        private businessService: BusinessesService
    ) { }


    /*
    * Created on Sat May 13 2023
    * @Author:- Dhrumil Shah
    * Copyright (c) 2023 Donmil Productions
    */
    @Post("/add")
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Add New Business" })
    @ApiResponse({ status: 200, description: "Api success" })
    @ApiResponse({ status: 422, description: "Bad Request or API error message" })
    @ApiResponse({ status: 404, description: "Not found!" })
    @ApiResponse({ status: 409, description: "Business Already Exists" })
    @ApiResponse({ status: 500, description: "Internal server error!" })
    @UseFilters(StatusFilter)
    @UseInterceptors(StatusInterceptor)
    @ApiHeader({
        name: 'language',
        description: 'Enter language code(ex. en)',
        example: 'en'
    })
    async addBusiness(
        @Body() createBusinessDto: AddBusinessDto,
        @GetUser() user
    ) {
        return await this.businessService.addBusiness(createBusinessDto, user.id);
    }


    /*
    * Created on Sat May 13 2023
    * @Author:- Dhrumil Shah
    * Copyright (c) 2023 Donmil Productions
    */
    @Get("/list")
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get businesses list" })
    @ApiResponse({ status: 200, description: "Api success" })
    @ApiResponse({ status: 422, description: "Bad Request or API error message" })
    @ApiResponse({ status: 404, description: "Not found!" })
    @ApiResponse({ status: 500, description: "Internal server error!" })
    @ApiHeader({
        name: 'language',
        description: 'Enter language code(ex. en)',
        example: 'en'
    })
    getBusinessList(
        @Query() pageQueryDto: ListBusinessDto
    ) {
        return this.businessService.getBusinessList(pageQueryDto);
    }


    /*
    * Created on Sat May 13 2023
    * @Author:- Dhrumil Shah
    * Copyright (c) 2023 Donmil Productions
    */
   @Post("/edit/:business_id")
   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
   @ApiBearerAuth()
   @ApiOperation({ summary: "Add New Business" })
   @ApiResponse({ status: 200, description: "Api success" })
   @ApiResponse({ status: 422, description: "Bad Request or API error message" })
   @ApiResponse({ status: 404, description: "Not found!" })
   @ApiResponse({ status: 409, description: "Business Already Exists" })
   @ApiResponse({ status: 500, description: "Internal server error!" })
   @UseFilters(StatusFilter)
   @UseInterceptors(StatusInterceptor)
   @ApiHeader({
       name: 'language',
       description: 'Enter language code(ex. en)',
       example: 'en'
   })
   async editBusiness(
       @Param('business_id') business_id: number,
       @Body() editBusinessDto: AddBusinessDto,
       @GetUser() user
   ) {
       return await this.businessService.editBusiness(editBusinessDto, user.id, business_id);
   }


   /*
   * Created on Sat May 13 2023
   * @Author:- Dhrumil Shah
   * Copyright (c) 2023 Donmil Productions
   */
   @Get("/:business_id")
   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
   @ApiBearerAuth()
   @ApiOperation({ summary: "Get businesses list" })
   @ApiResponse({ status: 200, description: "Api success" })
   @ApiResponse({ status: 422, description: "Bad Request or API error message" })
   @ApiResponse({ status: 404, description: "Not found!" })
   @ApiResponse({ status: 500, description: "Internal server error!" })
   @ApiHeader({
       name: 'language',
       description: 'Enter language code(ex. en)',
       example: 'en'
   })
   getBusinessById(
    @Param('business_id') business_id: number
   ) {
       return this.businessService.getBusinessById(business_id);
   }

    /*
   * Created on Sat May 13 2023
   * @Author:- Dhrumil Shah
   * Copyright (c) 2023 Donmil Productions
   */
  @Patch("/de-activate/:business_id")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get businesses list" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  @ApiHeader({
      name: 'language',
      description: 'Enter language code(ex. en)',
      example: 'en'
  })
  deactivateBusiness(
   @Param('business_id') business_id: number
  ) {
      return this.businessService.deactivateBusiness(business_id);
  }


}
