import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTitleComponent } from './entry-title.component';

describe('EntryTitleComponent', () => {
  let component: EntryTitleComponent;
  let fixture: ComponentFixture<EntryTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
