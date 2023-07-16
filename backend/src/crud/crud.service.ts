import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateCrudDto} from './dto/create-crud.dto';
import {UpdateCrudDto} from './dto/update-crud.dto';
import {FilterDto} from './dto/filter.dto';
import {Product} from './entities/product.entity';

@Injectable()
export class CrudService {

  constructor(
      @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
  }

  sort(query, sort) {
    if (sort) {
      const {name, direction} = sort;
      query.sort({[name]: direction});
    }
  }

  filter(query, filters) {
    if (filters) {
      const {nameSearch, unitPrice, quantity} = filters;

      if (nameSearch) {
        query.regex('name', new RegExp(nameSearch, 'i'));
      }

      // Apply unitPrice range filter
      if (unitPrice?.min && unitPrice?.max) {
        query.where('unitPrice').gte(unitPrice?.min).lte(unitPrice?.max);
      } else if (unitPrice?.min) {
        query.where('unitPrice').gte(unitPrice?.min);
      } else if (unitPrice?.max) {
        query.where('unitPrice').lte(unitPrice?.max);
      }

      // Apply quantity range filter
      if (quantity?.min && quantity?.max) {
        query.where('quantity').gte(quantity?.min).lte(quantity?.max);
      } else if (quantity?.min) {
        query.where('quantity').gte(quantity?.min);
      } else if (quantity?.max) {
        query.where('quantity').lte(quantity?.max);
      }
    }
  }

  paginate(query, pageSize, pageIndex) {
    if (pageSize && pageIndex) {
      const skip = pageSize * (pageIndex - 1);
      query.skip(skip).limit(pageSize);
    }
  }

  async create(createCrudDto: CreateCrudDto): Promise<Product> {
    const createdProduct = new this.productModel(createCrudDto);
    return createdProduct.save();
  }

  async findFilter(options: FilterDto): Promise<{
    products: Product[],
    total: number,
    minQuantity: number,
    maxQuantity: number,
    minUnitPrice: number,
    maxUnitPrice: number
  }> {
    const {pageSize, pageIndex, filter, sort} = options;

    const query = this.productModel.find();

    this.filter(query, filter);
    this.sort(query, sort);
    this.paginate(query, pageSize ?? 10, pageIndex ?? 1);

    const [products, total, minQuantity, maxQuantity, minUnitPrice, maxUnitPrice] = await Promise.all([
      query.exec(),
      this.productModel.countDocuments(),
      this.productModel.find().sort({quantity: 1}).limit(1).select('quantity').exec(),
      this.productModel.find().sort({quantity: -1}).limit(1).select('quantity').exec(),
      this.productModel.find().sort({unitPrice: 1}).limit(1).select('unitPrice').exec(),
      this.productModel.find().sort({unitPrice: -1}).limit(1).select('unitPrice').exec()
    ]);

    return {
      products,
      total,
      minQuantity: minQuantity[0]?.quantity ?? 0,
      maxQuantity: maxQuantity[0]?.quantity ?? 0,
      minUnitPrice: minUnitPrice[0]?.unitPrice ?? 0,
      maxUnitPrice: maxUnitPrice[0]?.unitPrice ?? 0
    };
  }


  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateCrudDto: UpdateCrudDto): Promise<Product> {
    const existingProduct = await this.productModel
        .findByIdAndUpdate(id, updateCrudDto, {new: true})
        .exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return existingProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({_id: id}).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
