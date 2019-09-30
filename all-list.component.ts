import { Component, OnInit } from '@angular/core';
import { AllNames } from '../model/model';
import { AllService } from '../all.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.css']
})
export class AllListComponent implements OnInit {

  alllist: AllNames[] = [];


  constructor( private allservice: AllService ) { }

  ngOnInit() {

     // to get all movies list
   this.allservice.getAll()
   .subscribe(data => {
     this.alllist = data;
     /* console.log('allMovies::' + JSON.stringify(this.allmovielist)); */
   });


  }

  delete(id) {

    for (let i = 0 ; i < this.alllist.length; ++i) {

      if (this.alllist[i].id === id) {
          console.log('delete user !!!!');

         id = this.alllist[i].id ;

         this.alllist.splice(i, 1);

             const delUser = {
                  id: id ,
                };

                console.log('hett' + JSON.stringify(delUser));

                this.allservice.delete(delUser).subscribe(
                  () => {  console.log('service' + JSON.stringify(delUser)); },
                 (err: HttpErrorResponse) => { console.log(err.name + ': ' + err.message); },
                 );

      }

    }

  }
}
