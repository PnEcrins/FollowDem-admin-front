import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAttributeFormComponent } from './animal-attribute-form.component';

describe('AnimalAttributeFormComponent', () => {
  let component: AnimalAttributeFormComponent;
  let fixture: ComponentFixture<AnimalAttributeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAttributeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAttributeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
