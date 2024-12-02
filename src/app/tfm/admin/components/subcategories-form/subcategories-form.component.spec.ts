import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesFormComponent } from './subcategories-form.component';

describe('SubcategoriesFormComponent', () => {
  let component: SubcategoriesFormComponent;
  let fixture: ComponentFixture<SubcategoriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcategoriesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
