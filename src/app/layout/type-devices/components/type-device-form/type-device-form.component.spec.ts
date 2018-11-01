import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDeviceFormComponent } from './type-device-form.component';

describe('TypeDeviceFormComponent', () => {
  let component: TypeDeviceFormComponent;
  let fixture: ComponentFixture<TypeDeviceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDeviceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDeviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
