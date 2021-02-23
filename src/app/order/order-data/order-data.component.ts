import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent implements OnInit {
  // @Output() public saveClicked = new EventEmitter<any>();

  categoryControl = new FormControl();
  brandControl = new FormControl();
  categoryOptions: string[] = ['cat One', 'cat Two', 'cat Three'];
  brandOptions: string[] = ['brand One', 'Brand two', 'Brand Three'];
  filteredCategoryOptions: Observable<string[]>;
  filteredBrandOptions: Observable<string[]>;
  value = '';
  category;
  brand;
  nameValue;
  skuValue;
  barcodeValue;
  details= [];
  isDataSaved=false;
  
  ngOnInit() {
    this.filteredCategoryOptions = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._categoryFilter(value))
    );
    
    this.filteredBrandOptions = this.brandControl.valueChanges.pipe(
  
      startWith(''),
      map(value => this._brandFilter(value))
    );
  }

  savePurchaseData() {
    const purchaseOrder = {
      name: this.nameValue,
      category: this.category,
      brand: this.brand,
      sku: this.skuValue,
      barcode: this.barcodeValue,
      details: this.details

    }
    console.log({purchaseOrder});
    // call api service
    // on success
    this.isDataSaved=true;
  }
exitPurchaseData(){
  this.savePurchaseData();
  this.skuValue ='';
  this.nameValue='';
  this.category='';
  this.barcodeValue='';


}
  saveDetails(details){
    this.details = details;
  }

  getSelectedBrand(brand) {
    this.brand= brand;
  }

  getSelectedCategory(category) {
    this.category = category;
  }
  private _categoryFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categoryOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _brandFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.brandOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
