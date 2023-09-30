import { Component, EventEmitter } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-addpin',
  templateUrl: './addpin.component.html',
  styleUrls: ['./addpin.component.css'],
})
export class AddpinComponent {
  pinForm: any = FormGroup;
  getcustomerList: any[] = [];
  seletedCustomer: any;
  imageUrl: any = 'https://ktlxk5-4200.csb.app/';
  editFile: boolean = true;
  removeUpload: boolean = false;
  constructor(
    public fb: FormBuilder,
    private serviceCall: ServiceService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddpinComponent>,
  ) {
    this.pinForm = this.fb.group({
      title: ['', Validators.required],
      privacy: ['', Validators.required],
      image: ['', Validators.required],
      collaboratory: ['', Validators.required],
    });
  }

  ngOnInit() {
    // binding collaboratory values into dropdown received from customer localStorage

    var getList = JSON.parse(localStorage.getItem('customerList') || '[]');
    for (const obj of getList) {
      this.getcustomerList.push(obj.title);
    }
  }

  save() {
    // in this event sending form control values to app.component.html
    this.dialogRef.close(this.pinForm.value);
  }

  patchCustomervalue() {
    this.pinForm.patchValue({
      collaboratory: this.seletedCustomer,
    });
  }

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.pinForm.patchValue({
          image: reader.result,
        });
        this.editFile = false;
        this.removeUpload = true;
      };
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
