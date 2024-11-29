import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [ ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, NgxChartsModule, DropdownModule],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.scss'
})
export class CrudTableComponent {

  products: Product[] = [];
  productForm: FormGroup;
  showModal: boolean = false; 
  categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Books', value: 'books' },
    { label: 'Home Appliances', value: 'home-appliances' },
  ];
  isEdit = false;
  productId: number | null = null;

  // Chart data
  chartData: any[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService){

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      description: [''],
    });

    this.productService.products$.subscribe((data) => {
      this.products = data;
      this.updateChartData(data);
    });
  }
  
  showDialog() {
      this.showModal = true;
  }

  onSaveDraft() {
      console.log('Draft Saved:', this.productForm.value);
      this.showModal = false; 
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      if (this.isEdit && this.productId !== null) {
        const updatedProduct: Product = {
          id: this.productId,
          ...formValue,
        };
        this.productService.updateProduct(updatedProduct);
      } else {
        const newProduct: Product = {
          id: Date.now(),
          ...formValue,
        };
        this.productService.addProduct(newProduct);
      }
      this.showModal = false;
      this.resetForm();
    }
  }

  onEdit(product: Product) {
    this.showModal = true
    this.isEdit = true;
    this.productId = product.id;
    this.productForm.patchValue(product);
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id);
  }

  resetForm() {
    this.productForm.reset();
    this.isEdit = false;
    this.productId = null;
  }

  updateChartData(data: Product[]) {
    this.chartData = data.map((product) => ({
      name: product.name,
      value: product.price,
    }));
  }

}
