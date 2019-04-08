import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleFormComponent } from './rule-form.component';

describe('RuleFormComponent', () => {
  let component: RuleFormComponent;
  let fixture: ComponentFixture<RuleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
