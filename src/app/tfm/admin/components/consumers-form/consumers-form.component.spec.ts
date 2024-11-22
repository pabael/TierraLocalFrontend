import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersFormComponent } from './consumers-form.component';

describe('ConsumersFormComponent', () => {
  let component: ConsumersFormComponent;
  let fixture: ComponentFixture<ConsumersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsumersFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
