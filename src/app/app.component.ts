import { Component } from '@angular/core';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { AddpinComponent } from './addpin/addpin.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ServiceService } from '../app/service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CodeSandbox';
  pinResults: any[] = [];
  customerResults: any[] = [];
  finalData: any[] = [];
  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    private _snackBar: MatSnackBar,
  ) {}

  openModal(modalType: any) {
    // based on type of component assigning logic
    if (modalType == 'customer') {
      let dialogRef = this.dialog.open(AddcustomerComponent, {
        backdropClass: 'backdropBackground',
        width: '60%',
      });
      dialogRef.afterClosed().subscribe((result) => {
        // storing form values after modal close event
        if (result != null) {
          this.customerResults.push(result);
          localStorage.setItem(
            'customerList',
            JSON.stringify(this.customerResults),
          );
          this._snackBar.open('Customer added successfully', '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'my-custom-snackbar',
          });
        }
      });
    }
    if (modalType == 'pin') {
      let dialogRef = this.dialog.open(AddpinComponent, {
        // storing form values after modal close event
        backdropClass: 'backdropBackground',
        width: '60%',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result != null) {
          this.pinResults.push(result);
          localStorage.setItem('pinList', JSON.stringify(this.pinResults));
          this._snackBar.open('Pin added successfully', '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'my-custom-snackbar',
          });
        }
        this.finalData = JSON.parse(localStorage.getItem('pinList') || '[]');
      });
    }
  }
  ngOnInit() {
    // storing finaldata from PIN component
    this.finalData = JSON.parse(localStorage.getItem('pinList') || '[]');
  }
}
