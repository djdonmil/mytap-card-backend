import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { ProductsRepository } from 'src/products/products.repository'
import { ListProductsDto } from './dto/list-products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,

        @InjectRepository(ProductsRepository)
        private productsRepository: ProductsRepository
    ) { }

    async addProduct(createProduct: AddProductDto, userId) {

        const userAvail = await this.userRepository.findOne({ id: userId });
        if (!userAvail)
            throw new NotFoundException(`User not found. Please add user first.`);

        const addProduct = await this.productsRepository.addProduct(createProduct, userId);

        delete addProduct.createdAt
        delete addProduct.updatedAt
        delete addProduct.createdBy
        delete addProduct.updatedBy

        return {
            data: addProduct,
            message: "Product added successfully."
        }
    }

    async getProductsList(query: ListProductsDto) {

        let result = await this.productsRepository.getProductsList(query)
        return result
    }

    async editProduct(updateProductDto: AddProductDto, user, product_id) {
        await this.productsRepository.editProduct(updateProductDto, user, product_id)

        return { message: "Product updated successfully." }
    }

    async getProductById(product_id: number) {

        let result = await this.productsRepository.getProductById(product_id)
        
        if (!result) throw new NotFoundException('No result found.')

        return { data: result, message: "Product fetcheed successfully" }
    }
}
