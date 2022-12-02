import { EntityRepository, getManager, Repository, Not, } from "typeorm";
import { Products } from "../shared/entity/products.entity";
import { AddProductDto } from "./dto/add-product.dto";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ListProductsDto } from "./dto/list-products.dto";


@EntityRepository(Products)
export class ProductsRepository extends Repository<Products>{


    async addProduct(createProduct: AddProductDto, userId): Promise<Products> {
        const { product_colour, product_config, product_issue, product_name, repair_status, product_owner, estimated_delivery, actual_delivery, inward_date } = createProduct


        const product = new Products()
        product.productColour = product_colour
        product.productConfig = product_config
        product.productIssue = product_issue
        product.productName = product_name
        product.status = repair_status
        product.productOwner = product_owner
        product.estimatedDelivery = estimated_delivery
        product.actualDelivery = actual_delivery
        product.inwardDate = inward_date
        product.createdBy = userId

        try {

            const res = await product.save();

            return res;

        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async getProductsList(query: ListProductsDto) {
        let listQuery = getManager()
            .createQueryBuilder(Products, 'products')
            .innerJoinAndSelect("products.user", "user")
            .innerJoinAndSelect("products.repairStatus", "repairStatus")
            .select(['products.id', 'products.productName', 'products.productConfig', 'products.productIssue', 'products.productColour', 'products.productCondition', 'products.estimatedDelivery', 'products.actualDelivery', 'products.inwardDate', 'products.isActive', 'user.id', 'user.firstName', 'user.lastName', 'user.gender', 'user.email', 'user.isActive', 'user.roleId', 'repairStatus.statusId', 'repairStatus.statusName'])
            .where(`user.isActive=:flag AND products.isActive=:flag AND repairStatus.isActive=:flag`, { flag: true })


        if (query) {
            listQuery.skip(query.offset * query.limit)
            listQuery.take(query.limit)
            listQuery.orderBy(`products.${query.orderBy}`, query.orderDir)
        }
        if (query.status) {
            listQuery.andWhere(`repairStatus.statusId=:status`, { status: query.status })
        }

        if (query.userSearch) {
            listQuery.andWhere('((user.first_name ~* :search) or (user.last_name ~* :search) or (user.email like :search) )', { search: `${query.userSearch}` })
        }

        if (query.productSearch) {
            listQuery.andWhere('((products.product_name ~* :search) or (products.product_config ~* :search) or (products.product_issue like :search))', { search: `${query.productSearch}` })
        }

        let usersWithCount = await listQuery.getManyAndCount();

        if (query) {
            query.count = usersWithCount[1];
        }

        if (!usersWithCount[0].length) throw new NotFoundException('No results found.')

        return {
            data: usersWithCount[0],
            page: query,
            message: "Product details fetched successfully."
        };
    }

    async editProduct(updateProductDto: AddProductDto, user, product_id) {
        const { product_owner, product_colour, product_condition, product_config, product_issue, product_name, repair_status, estimated_delivery, actual_delivery, } = updateProductDto

        let getProduct = await this.getProductById(product_id)
        let updateObj = {}
        if (getProduct) {
            if (product_owner) {
                updateObj["productOwner"] = product_owner
            }
            if (product_colour) {
                updateObj["productColour"] = product_colour
            }
            if (product_config) {
                updateObj["productConfig"] = product_config
            }
            if (product_condition) {
                updateObj["productCondition"] = product_condition
            }
            if (product_issue) {
                updateObj["productIssue"] = product_issue
            }
            if (product_name) {
                updateObj["productName"] = product_name
            }
            if (repair_status) {
                updateObj["estimatedDelivery"] = estimated_delivery
            }
            if (actual_delivery) {
                updateObj["actualDelivery"] = actual_delivery
            }
            updateObj["updatedAt"] = new Date()
            updateObj["updatedBy"] = user.id
        }
        console.log(updateObj)

        try {

            const res = await getManager().createQueryBuilder()
                .update(Products)
                .set(updateObj)
                .where("id = :id", { id: product_id })
                .execute()

            return res;

        } catch (err) {
            throw new BadRequestException(err);
        }

    }

    async getProductById(product_id: number) {
        try {

            let getProductById = getManager()
                .createQueryBuilder(Products, 'products')
                .innerJoinAndSelect("products.user", "user")
                .innerJoinAndSelect("products.repairStatus", "repairStatus")
                .where(`user.isActive=:flag AND products.isActive=:flag AND repairStatus.isActive=:flag AND products.id=:product_id`, { flag: true, product_id })
                .getOne()

            return getProductById

        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}