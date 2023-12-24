import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsuredComponent } from './edit-insured.component';

describe('EditInsuredComponent', () => {
  let component: EditInsuredComponent;
  let fixture: ComponentFixture<EditInsuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsuredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
