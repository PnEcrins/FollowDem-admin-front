import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDeviceFormComponent } from './animal-device-form.component';

describe('AnimalDeviceFormComponent', () => {
  let component: AnimalDeviceFormComponent;
  let fixture: ComponentFixture<AnimalDeviceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalDeviceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDeviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
