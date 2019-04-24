import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkDetailPage } from './park-detail.page';

describe('ParkDetailPage', () => {
  let component: ParkDetailPage;
  let fixture: ComponentFixture<ParkDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
