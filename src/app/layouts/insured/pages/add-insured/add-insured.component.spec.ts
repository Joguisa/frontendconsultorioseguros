import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsuredComponent } from './add-insured.component';

describe('AddInsuredComponent', () => {
  let component: AddInsuredComponent;
  let fixture: ComponentFixture<AddInsuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsuredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
