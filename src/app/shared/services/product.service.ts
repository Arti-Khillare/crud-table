import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000, category: 'Electronics' },
    { id: 2, name: 'Shoes', price: 800, category: 'Fashion' },
    { id: 3, name: 'Hoodie', price: 520, category: 'Fashion'},
    { id: 4, name: 'Mobile', price: 2000, category: 'Electronics'},
    { id: 5, name: 'Earphones', price: 500, category: 'Electronics'}
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsSubject.next(this.products);
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productsSubject.next(this.products);
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next(this.products);
  }
  
}
