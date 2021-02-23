import {
  Component,
  OnInit,
  Inject,
  EventEmitter,
  Output
} from '@angular/core';
import {
  DataSource
} from '@angular/cdk/collections';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  FormControl
} from '@angular/forms';
import {
  Observable
} from 'rxjs';
import {
  map,
  startWith
} from 'rxjs/operators';

import {
  AfterContentInit,
  ContentChildren,
  Input,
  AfterViewInit,
  QueryList,
  ViewChild,
  ContentChild,
} from '@angular/core';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { ApiService } from 'src/app/api.service';

export interface PeriodicElement {
  item;
  quantity;
  uom;
  price_per_unit;
  total_price;
  discount;
  total_after_discount;
}

const ELEMENT_DATA: any[] = [{
    item: 'samsung note 10',
    quantity: 1,
    uom: 'Box',
    'price_per_unit': '1000',
    'total_price': 12000,
    discount: 0,
    'total_after_discount': 12000
  },
  {
    item: 'power cable roll',
    quantity: 1,
    uom: 'roll',
    'price_per_unit': '100',
    'total_price': 10000,
    discount: 250,
    'total_after_discount': 9750
  }


];



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements AfterViewInit {
  @Output() public saveClicked = new EventEmitter<any>();


  displayedColumns: string[] = ['item', 'quantity', 'uom', 'price_per_unit', 'total_price', 'discount', 'total_after_discount'];
  dataSource = new MatTableDataSource < any > (ELEMENT_DATA);


  constructor(public dialog: MatDialog,private apiService :ApiService) {}


  savePurchaseDetails(){



    this.apiService.purchaseDetails=ELEMENT_DATA;
  }

  ngAfterViewInit() {
  }

  clearTable() {
    this.dataSource.data = [];
  }

  addData() {
    this.dataSource.data = ELEMENT_DATA;
  }

  //open dialog for adding order
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '70%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log({
        result
      });
      if(Object.keys(result).length) {
        ELEMENT_DATA.push(result);
        this.addData();
        this.saveClicked.emit(ELEMENT_DATA);
      }
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styles: [
    'mat-form-field {padding: 2%}',
    // 'myDialogStyle .mat-dialog-container { padding: 1px !important;}'
  ]
})
export class DialogOverviewExampleDialog {
  discountType: string = '%';
  discounts: string[] = ['%', 'Amount'];
  priceAfterDiscount = 0;
  totalPrice;
  item;
  quantity;
  unit;
  uom;
  discount;

  constructor(
    public dialogRef: MatDialogRef < DialogOverviewExampleDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  calculateTotalPrice() {
    if (this.quantity && this.unit && this.uom) {

      if (this.uom === 'box') {
        this.totalPrice = this.quantity * this.unit * 12;
      } else if (this.uom === 'roll') {

        this.totalPrice = this.quantity * this.unit * 100;

      }


    }
  }
  getSelectedUom(value) {
    this.uom = value;
    this.calculateTotalPrice()
  }
  calculatePriceAfterDiscount() {

    console.log(this.discountType);
    this.calculateTotalPrice();
    if (this.totalPrice && this.discount && this.discountType) {
      if (this.discountType === '%') {
        this.priceAfterDiscount = this.totalPrice - ((this.totalPrice) * 0.01 * this.discount);
      } else {
        this.priceAfterDiscount = (this.totalPrice) - this.discount;
      }
    }
  };

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick() {
    const rowDetailToAdd = {
      item: this.item,
      quantity: this.quantity,
      uom: this.uom,
      price_per_unit: this.unit,
      total_price: this.totalPrice,
      discount: this.discount,
      total_after_discount: this.priceAfterDiscount
    }
    return rowDetailToAdd;
  }


  uomControl = new FormControl();
  options: string[] = ['box', 'roll'];
  filteredOptions: Observable < string[] > ;


  ngOnInit() {
    this.filteredOptions = this.uomControl.valueChanges.pipe(
      startWith(''),
      map(value => this._uomFilter(value))
    );
  }

  private _uomFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}


/**
 * Table component that accepts column and row definitions in its content to be registered to the
 * table.
 */
@Component({
  selector: 'wrapper-table',
  templateUrl: 'wrapper-table.html',
  styles: [`
    table {
      width: 100%;
    }
  `]
})
export class WrapperTable < T > implements AfterContentInit {
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList < MatHeaderRowDef > ;
  @ContentChildren(MatRowDef) rowDefs: QueryList < MatRowDef < T >> ;
  @ContentChildren(MatColumnDef) columnDefs: QueryList < MatColumnDef > ;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatTable, {
    static: true
  }) table: MatTable < T > ;

  @Input() columns: string[];

  @Input() dataSource: DataSource < T > ;

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    this.table.setNoDataRow(this.noDataRow);
  }
}
