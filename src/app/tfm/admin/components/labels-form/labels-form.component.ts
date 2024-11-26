import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Label } from '../../../shared/models/Label';

@Component({
  selector: 'app-labels-form',
  templateUrl: './labels-form.component.html',
  styleUrl: './labels-form.component.sass'
})
export class LabelsFormComponent {

  @Input()
  public message: string = '';

  form: FormGroup = new FormGroup({});

  @Output()
  public onSubmit: EventEmitter<Label> = new EventEmitter<Label>();

  @Output()
  public onChangeInput: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {

    this.form = new FormGroup({
      name:           new FormControl('', Validators.required),
    });    
  }

  changeInput(): void{
    this.onChangeInput.emit();
  }

  submitForm(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
