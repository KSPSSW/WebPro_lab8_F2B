import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  lastID: number = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      size: 'small',
      image: 'image1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      size: 'medium',
      image: 'image2',
    },
  ];
  create(createProductDto: CreateProductDto) {
    const newProduct: Product = {
      ...createProductDto,
      id: ++this.lastID,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    return this.products[index];
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    this.products[index] = { ...this.products[index], ...updateProductDto };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    const deletedProduct = this.products[index];
    this.products.splice(index, 1);
    return deletedProduct;
  }
}

