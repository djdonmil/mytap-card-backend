import { Controller, Get, Post, UseGuards, Body, Query, Put, ValidationPipe, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiHeader, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { AddProductDto } from './dto/add-product.dto';
import { GetUser } from 'src/auth/get-user.dacorator';
import { PageQueryDto } from 'src/shared/dtos/list_query.dto';
import { ListProductsDto } from './dto/list-products.dto';

@Controller('product')
@ApiTags('Products')
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService
	) { }


	@Post("/add")
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@ApiOperation({ summary: "Add New Product" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	async addProduct(
		@Body() createProduct: AddProductDto,
		@GetUser() user
	) {
		return await this.productsService.addProduct(createProduct, user.id);
	}

	@Get("/")
	// @UseGuards(AuthGuard('jwt'))
	// @ApiBearerAuth()
	@ApiOperation({ summary: "Get all products list" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	getProductsList(
		@Query() query: ListProductsDto,
	) {
		console.log("======= listData ====", query);
		return this.productsService.getProductsList(query);
	}


	@Put("/edit/:product_id")
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@ApiOperation({ summary: "Edit product details" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 409, description: "User Already Exist" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	@ApiHeader({
		name: 'language',
		description: 'Enter language code(ex. en)',
		example: 'en'
	})
	editProduct(
		@Body(ValidationPipe) updateProductDto: AddProductDto,
		@Param('product_id') product_id: number,
		@GetUser() user,
	) {
		return this.productsService.editProduct(updateProductDto, user,product_id);
	}

	@Get("/single/:product_id")
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@ApiOperation({ summary: "Get single product" })
	@ApiResponse({ status: 200, description: "Api success" })
	@ApiResponse({ status: 422, description: "Bad Request or API error message" })
	@ApiResponse({ status: 404, description: "Not found!" })
	@ApiResponse({ status: 500, description: "Internal server error!" })
	getProductById(
		@Param('product_id') product_id: number,
	) {
		return this.productsService.getProductById(product_id);
	}

}
