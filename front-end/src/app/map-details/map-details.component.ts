import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { Auction } from '../_models';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.css']
})
export class MapDetailsComponent implements AfterViewInit {
  @Input() auction: Auction;

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.auction);
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([this.auction.longitude, this.auction.latitude]),
      zoom: 15
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }
}
