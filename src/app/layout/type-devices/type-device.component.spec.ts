import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDeviceComponent } from './type-device.component';

describe('TypeDeviceComponent', () => {
  let component: TypeDeviceComponent;
  let fixture: ComponentFixture<TypeDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
