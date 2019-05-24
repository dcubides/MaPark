import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciaPage } from './policia.page';

describe('PoliciaPage', () => {
  let component: PoliciaPage;
  let fixture: ComponentFixture<PoliciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
