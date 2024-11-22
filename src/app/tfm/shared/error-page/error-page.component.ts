import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.sass'
})
export class ErrorPageComponent {

  @Input() error: HttpErrorResponse = new HttpErrorResponse({});

  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.error = this.sharedService.getError;
  }
}
