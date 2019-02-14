import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentlistComponent } from './environmentlist.component';

describe('EnvironmentlistComponent', () => {
  let component: EnvironmentlistComponent;
  let fixture: ComponentFixture<EnvironmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
