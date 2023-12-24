import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsuredComponent } from './list-insured.component';

describe('ListInsuredComponent', () => {
  let component: ListInsuredComponent;
  let fixture: ComponentFixture<ListInsuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInsuredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
