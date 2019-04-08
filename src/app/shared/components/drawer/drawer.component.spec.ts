import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
