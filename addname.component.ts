import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllService } from '../all.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AllType } from '../model/model';

@Component({
  selector: 'app-addname',
  templateUrl: './addname.component.html',
  styleUrls: ['./addname.component.css']
})
export class AddnameComponent implements OnInit {

  addnameForm: FormGroup;
  alltype: AllType[] = [];

  constructor(private addnameFormBuilder: FormBuilder ,
    private allservice: AllService , private router: Router) { }

  ngOnInit() {
    this.locOnInit();
    this.getAllType();
  }

  locOnInit() {
    // Initilalize addlocation FormGroup
    this.addnameForm = this.addnameFormBuilder.group({
      'adddetails': this.addnameFormBuilder.group({
        'name': ['', Validators.required],
        'type': ['', Validators.required]
       })
    });
  }

  getAllType() {
      // to get all movies list
   this.allservice.getType()
   .subscribe(data => {
     this.alltype = data;
     /* console.log('allMovies::' + JSON.stringify(this.allmovielist)); */
   });
  }

  addnameFormSubmit() {


    const  formdata = {

      id: '',
      name: this.addnameForm.get('adddetails.name').value,
      type: this.addnameForm.get('adddetails.type').value,
      };

       console.log(JSON.stringify(formdata));

           this.allservice.addName(formdata).subscribe(
            () => {},
           (err: HttpErrorResponse) => { console.log(err.name + ': ' + err.message); },
           () => {
            this.router.navigate(['/all-list']);
            });

           console.log('Name Data::' + JSON.stringify(formdata));

    }

}
