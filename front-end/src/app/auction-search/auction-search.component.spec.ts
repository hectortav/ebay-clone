import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionSearchComponent } from './auction-search.component';

describe('AuctionSearchComponent', () => {
  let component: AuctionSearchComponent;
  let fixture: ComponentFixture<AuctionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
