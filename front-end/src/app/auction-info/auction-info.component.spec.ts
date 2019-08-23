import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionInfoComponent } from './auction-info.component';

describe('AuctionInfoComponent', () => {
  let component: AuctionInfoComponent;
  let fixture: ComponentFixture<AuctionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
