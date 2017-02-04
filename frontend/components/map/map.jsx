import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Modal from 'react-modal';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      bounds: null,
      lat: null,
      lng: null

    };
    this.getLocation = this.getLocation.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.geocodeAddress = this.geocodeAddress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.markers = [];
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
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    this.infowindow.setOptions({maxWidth: '300'});
    this.bounds = new google.maps.LatLngBounds;
    if (this.props.tweets.length > 0) {
      this.props.tweets.forEach(tweet => {
        this.addTweet(tweet);
      });
    } else if (this.props.stream.length > 0) {
      this.props.stream.forEach(tweet => {
        this.addTweet(tweet);
      });
    }
    let that = this;
    google.maps.event.addDomListener(window, "resize", function() {
      let center = that.map.getCenter();
      google.maps.event.trigger(that.map, "resize");
      that.map.setCenter(center);
    });
  }

  componentWillReceiveProps(newProps) {
    let that = this;

    that.getLocation(that.map);

    if (newProps.tweets !== this.props.tweets || newProps.stream !== this.props.stream) {
      for (let i = 0; i < that.markers.length; i++) {
        that.markers[i].setMap(null);
      }
      that.markers = [];
    }

    let tweetType = "undefined";
    if (newProps.tweets) {
      if (newProps.tweets.length > 0) {
        tweetType = "tweets";
      }
    }

    if (newProps.stream) {
      if (newProps.stream.length > 0) {
        tweetType = "stream";
      }
    }
    if (tweetType !== "undefined") {
      newProps[tweetType].forEach(tweet => {
        if (!this.markers[tweet.id]) {
          this.addTweet(tweet);
        }
        if (newProps.currentTweet && tweet.id === newProps.currentTweet.id) {
          let marker = that.markers[newProps.currentTweet.id];
          that.map.setCenter(marker.position);
          that.infowindow.setContent(
            `<div class='info-window'>
            <img class='info-window-image' src=${tweet.profile_picture} />
            <div>

              <div class='info-window-item weight'>${tweet.screen_name}</div>
              <div class='info-window-item'>${this.handleTweetText(tweet.text)}</div>

            </div>

          </div>`
        );
        that.infowindow.open(that.map, marker);
      }
    });
    }
  }

  getLocation (map) {

    let that = this;
    map.addListener('idle', (event) => {
      const bounds = that.map.getBounds();
      const radius = Math.abs(bounds.f.b - bounds.f.f) * 34.5;
      const centerLat = that.map.getCenter().lat();
      const centerLng = that.map.getCenter().lng();
      that.props.setMapPosition({radius: radius, lat: centerLat, lng: centerLng});
    });
  }

  addTweet (tweet) {
    let that = this;
    let pos;
    if (tweet.coordinates) {
      if (typeof tweet.coordinates === "string") {
        let coords = tweet.coordinates.slice(32, -2).split(", ");
        pos = new google.maps.LatLng(
          parseFloat(coords[1]),
          parseFloat(coords[0])
        );
      } else {
        pos = new google.maps.LatLng(
          tweet.coordinates.coordinates[1],
          tweet.coordinates.coordinates[0]
        );
      }
      this.marker = new google.maps.Marker({
        position: pos,
        map: this.map
      });
      this.handleClick(this.marker, tweet);
    } else if (typeof tweet.place !== 'undefined' ) {
      this.marker = this.geocodeAddress(that.geocoder, that.map, tweet.place.full_name, tweet);
    } else {
      return;
    }
  }

  geocodeAddress(geocoder, resultsMap, address, tweet) {
    let that = this;
    geocoder.geocode({'address': address}, (results, status) => {
      if (status === 'OK') {
        let random = 0.01 * Math.random()
        let factor = random <= 0.005 ? 1 : -1;
        let position = new google.maps.LatLng(
          results[0].geometry.location.lat()+random*factor,
          results[0].geometry.location.lng()+random*factor);
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: position
        });
        that.handleClick(marker, tweet);
        return marker;
      } else {
        return;
      }
    });
  }

  handleTweetText(text){
    if(text.indexOf("https") !== -1){
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function(url) {
          return '<a class="info-window-text-link" href="' + url + '">' + url + '</a>';
      });
    } else {
      // text = text + '<a href="' + "https://www.google.com/" + '">google</a>';
      return text;
    }
  }

  handleClick (marker, tweet) {
    let that = this;
    marker.addListener('click', () => {
      that.map.setCenter(marker.position);
      that.infowindow.setContent(
        `<div class='info-window'>
          <img class='info-window-image' src='${tweet.profile_picture}' />
          <div>
            <div class='info-window-item weight'>${tweet.screen_name}</div>
            <div class='info-window-item'>${this.handleTweetText(tweet.text)}</div>
          </div>

        </div>`
      );
      that.infowindow.open(that.map, marker);
    });
    this.markers[tweet.id] = marker;
  }

  render() {
    return(
      <div className='map-container'>
        <div className="map" id='map' ref='map'>Map</div>
      </div>
    );
  }
}
export default Map;
