import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../shared/models/Category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subcategories-form',
  templateUrl: './subcategories-form.component.html',
  styleUrl: './subcategories-form.component.sass'
})
export class SubcategoriesFormComponent {
  
  form: FormGroup = new FormGroup({});

  @Input()
  public message: string = '';

  @Input() 
  allCategories: Category[] = [];

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
    if (this.form.valid && (typeof this.form.value?.subcategories == "string")) {
      this.form.value.subcategories = this.form.value.subcategories
                                        .split(',')
                                        .map((item: string) => item.trim())
                                        .filter((item: string) => item.length > 0);

      this.onSubmit.emit(this.form.value);
    }
  }
}
