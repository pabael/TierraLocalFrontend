import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consumer } from '../../../shared/models/Consumer';

@Component({
  selector: 'app-consumers-form',
  templateUrl: './consumers-form.component.html',
  styleUrl: './consumers-form.component.sass'
})
export class ConsumersFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  @Output()
  public onSubmit: EventEmitter<Consumer> = new EventEmitter<Consumer>();

  ngOnInit(): void {

    this.form = new FormGroup({
      type:           new FormControl('', Validators.required),
    });    
  }

  submitForm(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

}
