import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUbicacionPage } from './modal-ubicacion.page';

describe('ModalUbicacionPage', () => {
  let component: ModalUbicacionPage;
  let fixture: ComponentFixture<ModalUbicacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUbicacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUbicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
