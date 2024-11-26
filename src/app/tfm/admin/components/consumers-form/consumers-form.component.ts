import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consumer } from '../../../shared/models/Consumer';

@Component({
  selector: 'app-consumers-form',
  templateUrl: './consumers-form.component.html',
  styleUrl: './consumers-form.component.sass'
})
export class ConsumersFormComponent implements OnInit {

  @Input()
  public message: string = '';

  form: FormGroup = new FormGroup({});

  @Output()
  public onSubmit: EventEmitter<Consumer> = new EventEmitter<Consumer>();

  @Output()
  public onChangeInput: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {

    this.form = new FormGroup({
      type:           new FormControl('', Validators.required),
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
