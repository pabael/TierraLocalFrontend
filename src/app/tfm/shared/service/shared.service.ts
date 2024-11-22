import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private error:HttpErrorResponse = new HttpErrorResponse({});

  constructor(private router: Router) { }

  get getError(){
    return this.error;
  }

  set setError(error:HttpErrorResponse){
    this.error = error;
    console.log(error);
    this.router.navigate(['/error'])
  }

}
