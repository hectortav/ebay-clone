import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuctionsComponent } from './manage-auctions.component';

describe('ManageAuctionsComponent', () => {
  let component: ManageAuctionsComponent;
  let fixture: ComponentFixture<ManageAuctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAuctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
