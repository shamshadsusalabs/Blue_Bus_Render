import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusesComponent } from './add-buses.component';

describe('AddBusesComponent', () => {
  let component: AddBusesComponent;
  let fixture: ComponentFixture<AddBusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
