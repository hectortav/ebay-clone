import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksSignupComponent } from './thanks-signup.component';

describe('ThanksSignupComponent', () => {
  let component: ThanksSignupComponent;
  let fixture: ComponentFixture<ThanksSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanksSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
