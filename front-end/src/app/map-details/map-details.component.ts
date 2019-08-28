import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { Auction } from '../_models';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';

import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';

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

  vectorSource: OlVectorSource;
  vectorLayer: OlVectorLayer;
  marker: OlFeature;

  constructor() { }

  ngAfterViewInit() {
    // Marker and feature
    this.marker = new OlFeature({
      // Added fromLonLat
      geometry: new OlPoint(fromLonLat([this.auction.longitude, this.auction.latitude]))
    });

    this.vectorSource = new OlVectorSource({
      features: [this.marker]
    });

    this.vectorLayer = new OlVectorLayer({
      source: this.vectorSource
    });

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([this.auction.longitude, this.auction.latitude]),
      zoom: 14
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer, this.vectorLayer],
      view: this.view
    });
  }
}
