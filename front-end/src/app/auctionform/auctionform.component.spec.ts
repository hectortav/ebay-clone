import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionformComponent } from './auctionform.component';

describe('AuctionformComponent', () => {
  let component: AuctionformComponent;
  let fixture: ComponentFixture<AuctionformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
