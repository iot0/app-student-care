import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleViewComponent } from './rule-view.component';

describe('RuleViewComponent', () => {
  let component: RuleViewComponent;
  let fixture: ComponentFixture<RuleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleViewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
