import * as config from 'config';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import {ProductsController} from './products.controller'
import { UserRepository } from 'src/user/user.repository';
import { ProductsRepository } from './products.repository';
// import { RepairStatus } from 'src/shared/entity/repair-status.dto';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository,ProductsRepository]),
    ],
    controllers: [
        ProductsController
    ],
    providers: [ProductsService]
})
export class ProductsModule { }
