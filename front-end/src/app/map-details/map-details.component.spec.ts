import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDetailsComponent } from './map-details.component';

describe('MapDetailsComponent', () => {
  let component: MapDetailsComponent;
  let fixture: ComponentFixture<MapDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
