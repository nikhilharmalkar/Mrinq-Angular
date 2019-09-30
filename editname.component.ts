import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllService } from '../all.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AllType, AllNames } from '../model/model';

@Component({
  selector: 'app-editname',
  templateUrl: './editname.component.html',
  styleUrls: ['./editname.component.css']
})
export class EditnameComponent implements OnInit {

  nameId: any;
  addnameForm: FormGroup;
  alltype: AllType[] = [];
  alllist: AllNames[] = [];


  constructor(private addnameFormBuilder: FormBuilder ,
    private allservice: AllService , private router: Router , private route: ActivatedRoute) { }

  ngOnInit() {
    this.locOnInit();
    this.getAllType();
    this.getName();
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

  getName() {
    const id = +this.route.snapshot.paramMap.get('id');

    console.log('id is::' + id);

    this.nameId = id ;

    this.allservice.getAll().subscribe(
      (data) => {
        this.alllist = data ;
       },
       (err: HttpErrorResponse) => { console.log(err.name + ': ' + err.message); },

       () => {
      for (let i = 0; i < this.alllist.length; i++) {

        if ( id === this.alllist[i].id) {
              this.addnameForm.get('adddetails').patchValue({
                'name': this.alllist[i].name,
                'type': this.alllist[i].type
          });
         }

        }
      });



  }


  addnameFormSubmit() {



    const  formdata = {

      id: this.nameId,
      name: this.addnameForm.get('adddetails.name').value,
      type: this.addnameForm.get('adddetails.type').value,
      };

       console.log(JSON.stringify(formdata));

           this.allservice.updateName(formdata).subscribe(
            () => {},
           (err: HttpErrorResponse) => { console.log(err.name + ': ' + err.message); },
           () => {
            this.router.navigate(['/all-list']);
            });

           console.log('Name Data::' + JSON.stringify(formdata));

    }

}
