import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBidComponent } from './confirm-bid.component';

describe('ConfirmBidComponent', () => {
  let component: ConfirmBidComponent;
  let fixture: ComponentFixture<ConfirmBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
