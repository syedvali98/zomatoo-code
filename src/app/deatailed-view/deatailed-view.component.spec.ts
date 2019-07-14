import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatailedViewComponent } from './deatailed-view.component';

describe('DeatailedViewComponent', () => {
  let component: DeatailedViewComponent;
  let fixture: ComponentFixture<DeatailedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeatailedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeatailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
