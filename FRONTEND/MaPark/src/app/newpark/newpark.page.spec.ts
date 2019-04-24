import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewparkPage } from './newpark.page';

describe('NewparkPage', () => {
  let component: NewparkPage;
  let fixture: ComponentFixture<NewparkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewparkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewparkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
