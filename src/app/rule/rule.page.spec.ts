import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulePage } from './rule.page';

describe('RulePage', () => {
  let component: RulePage;
  let fixture: ComponentFixture<RulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
