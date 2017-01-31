import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

let dummyTweets = [
  {
    content: 'hey',
    lat: 37.773972,
    lng: -122.43129699999997
  },
  {
    content: 'hop',
    lat: 37.71370248522799,
    lng: -122.43129699999999
  }
]

class Map extends React.Component {
  constructor() {
    super();
    this.getLocation = this.getLocation.bind(this);
    this.addTweet = this.addTweet.bind(this);
  }

  componentDidMount() {
    let lat = 37.773972;
    let lng =  -122.431297;

    const map = (this.refs.map);
    this.map = new google.maps.Map(map, {
      center: {lat, lng},
      zoom: 11
    });
    this.getLocation(this.map);
    // this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    this.bounds = new google.maps.LatLngBounds;
    dummyTweets.forEach(tweet => {
      this.addTweet(tweet)
    })
  }

  componentWillReceiveProps(newProps) {
    let lat = 37.773972;
    let lng = -122.431297;
    const map = (this.refs.map);
    this.map = new google.maps.Map(map, {
      center: {lat: lat, lng: lng},
      zoom: 14
    });

    this.getLocation(this.map);
  }

  getLocation (map) {
    map.addListener('click', (event) => {
      const bounds = map.getBounds();
      const centerLat = map.getCenter().lat();
      const centerLng = map.getCenter().lng();
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      //we can return anything we want from here.
    });
  }

  addTweet (tweet) {
    let that = this;
    let pos = new google.maps.LatLng(tweet.lat, tweet.lng);
    let marker = new google.maps.Marker({
            position: pos,
            map: this.map
          });
      this.bounds.extend(marker.position);
      marker.addListener('click', () => {
        that.infowindow.setContent(`${tweet.content}`);
        // we will replace this click with a modal later on
        that.infowindow.open(that.map, marker);
      });
  }

  render() {
    return(
      <div className="map" id='map' ref='map'>Map</div>
    );
  }
}

export default Map;
