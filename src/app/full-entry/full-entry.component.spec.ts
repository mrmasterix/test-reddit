import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullEntryComponent } from './full-entry.component';

describe('FullEntryComponent', () => {
  let component: FullEntryComponent;
  let fixture: ComponentFixture<FullEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
