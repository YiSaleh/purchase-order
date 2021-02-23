import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderDataComponent } from './order-data/order-data.component';
import { DetailsComponent, DialogOverviewExampleDialog, WrapperTable } from './details/details.component';
import { NewDetailsComponent } from './add-details/new-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms'
import {MatInputModule } from '@angular/material/input';
import {MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [ OrderDataComponent, DetailsComponent, NewDetailsComponent,WrapperTable,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatRadioModule
  ],
  exports:[
    OrderDataComponent,
    DetailsComponent
  ]
  
})
export class OrderModule { }
