import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../shared/models/Category';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.sass'
})


export class CategoriesFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  @Input()
  public message: string = '';

  @Output()
  public onSubmit: EventEmitter<Category> = new EventEmitter<Category>();

  @Output()
  public onChangeInput: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {

    this.form = new FormGroup({
      name:           new FormControl('', Validators.required),
      subcategories:  new FormControl(''),
    });    
  }

  changeInput(): void{
    this.onChangeInput.emit();
  }

  submitForm(): void {
    if (this.form.valid) {
      this.form.value.subcategories = this.form.value.subcategories
                                        .split(',')
                                        .map((item: string) => item.trim())
                                        .filter((item: string) => item.length > 0);

      this.onSubmit.emit(this.form.value);
    }
  }

}
