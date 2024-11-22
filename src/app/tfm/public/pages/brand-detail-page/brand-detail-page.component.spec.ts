import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDetailPageComponent } from './brand-detail-page.component';

describe('BrandDetailPageComponent', () => {
  let component: BrandDetailPageComponent;
  let fixture: ComponentFixture<BrandDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
