import { Component } from '@angular/core';
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

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css'],
})
export class AddcustomerComponent {
  customerForm: any = FormGroup;
  public items: string[] = [];
  regionValues: any;
  countryValues: any;
  seletedRegion: any;
  seletedCountry: any;
  test: any;
  finalResults: any[] = [];

  constructor(
    public fb: FormBuilder,
    private serviceCall: ServiceService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddcustomerComponent>,
  ) {
    this.customerForm = this.fb.group({
      title: ['', Validators.required],
      email: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this block of code is get list of countries

    let results = this.serviceCall.getCountry();
    const regionArray = [];
    regionArray.push(results[0].data);

    // this block of code is push all the regions in seperate array

    var regionArray2: string[] = [];
    regionArray.forEach((countryData) => {
      const countryValues = Object.values(countryData);
      const regions = countryValues.map((country) => country.region);
      regionArray2.push(...regions);
    });

    const uniqueSet = new Set(regionArray2);
    const uniqueArray = [...uniqueSet];
    this.regionValues = uniqueArray;
  }

  getCountryList() {
    // this event is to push all the countries in a array based on selected region

    let results = this.serviceCall.getCountry();
    const regionArray = [];
    regionArray.push(results[0].data);

    const countries: string[] = [];

    for (const entry of regionArray) {
      for (const countryCode in entry) {
        if ((entry as any)[countryCode].region === this.seletedRegion) {
          countries.push((entry as any)[countryCode].country);
        }
      }
    }
    this.countryValues = countries;

    // binding region value to customerForm form

    this.customerForm.patchValue({
      region: this.seletedRegion,
    });
  }

  getCountryListvalue() {
    // binding country value while selecting country in dropdown
    this.customerForm.patchValue({
      country: this.seletedCountry,
    });
  }

  save() {
    // in this event sending form control values to app.component.html
    this.dialogRef.close(this.customerForm.value);
  }
  cancel() {
    this.dialogRef.close();
  }
}
