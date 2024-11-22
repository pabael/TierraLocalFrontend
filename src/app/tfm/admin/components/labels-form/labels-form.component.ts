import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Label } from '../../../shared/models/Label';

@Component({
  selector: 'app-labels-form',
  templateUrl: './labels-form.component.html',
  styleUrl: './labels-form.component.sass'
})
export class LabelsFormComponent {

  form: FormGroup = new FormGroup({});

  @Output()
  public onSubmit: EventEmitter<Label> = new EventEmitter<Label>();

  ngOnInit(): void {

    this.form = new FormGroup({
      name:           new FormControl('', Validators.required),
    });    
  }

  submitForm(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }


}
