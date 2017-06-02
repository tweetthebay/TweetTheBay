// frontend/components/map/map.jsx
// flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';

class Map extends React.Component {

  state: Object;
  getLocation: Function;
  addTweet: Function;
  geocodeAddress: Function;
  handleTweetDate: Function;
  parseTweetLink: Function;
  handleClick: Function;
  tweetsAreSame: Function;
  markers: Array;
  marker: Object;
  pinImage: Object;
  pinShadow: Object;
  google: Object;
  map: Object;
  Map: Object;
  geocoder: Object;

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
    this.handleTweetDate = this.handleTweetDate.bind(this);
    this.parseTweetLink = this.parseTweetLink.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tweetsAreSame = this.tweetsAreSame.bind(this);

    this.markers = [];
    let pinColor = "0084b4";
    this.pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    this.pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
  }

  tweetsAreSame (x, y) {
    if (x.length !== y.length ) {
     return false;
    }
    let areSame = true;
    for (let i = 0; i < x.length; i++) {
      if(x[i].text !== y[i].text) {
        areSame = false;
        break;
      }
    }
    return areSame;
  }

  componentDidMount() {
    let lat = 37.9;
    let lng =  -122.5;

    const map = (this.refs.map);
    this.map = new google.maps.Map(map, {
      center: {lat, lng},
      zoom: 9,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_RIGHT
      }
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
    this.getLocation(this.map);
    if (this.props.searchQuery !== newProps.searchQuery) {
      return;
    }

    if (!this.tweetsAreSame(newProps.tweets, this.props.tweets) ||
      newProps.stream !== this.props.stream ||
      this.props.searchQuery !== newProps.searchQuery ||
      this.props.routes !== newProps.routes ) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    }

    let that = this;
    let tweetType = "undefined";

    if (newProps.tweets && this.props.router.routes.length < 2) {
      if (newProps.tweets.length > 0) {
        tweetType = "tweets";
      }
    }

    if (newProps.stream) {
      if (newProps.stream.length > 0) {
        tweetType = "stream";
      }
    }

    let createMarkers = false;
    if (newProps[tweetType]) {
      if (newProps[tweetType].length > 0) {
        createMarkers = true;
      } else {
        createMarkers = false;
      }
    }

    if (createMarkers) {
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
              <div class='info-window-text'>

                <div class='info-window-item weight'>
                  <a href="https://www.twitter.com/${tweet.screen_name}" target="_blank">${tweet.screen_name}</a>
                </div>
                <div class='info-window-item'>${this.handleTweetText(tweet.text)}</div>
                <div class='info-window-item'>${this.handleTweetDate(tweet.created_at)}</div>
                <div class='info-window-twitter-link'>
                  <a href="https://www.twitter.com/statuses/${tweet.tweet_id}" target="_blank">View Full Tweet</a>
                </div>

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
        map: this.map,
        icon: this.pinImage,
        shadow: this.pinShadow
      });
      this.handleClick(this.marker, tweet);
    } else if (typeof tweet.place !== 'undefined' ) {
      this.geocodeAddress(that.geocoder, that.map, tweet.place.full_name, tweet);
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
          position: position,
          icon: that.pinImage,
          shadow: that.pinShadow
        });
        that.handleClick(marker, tweet);
      } else {
        return;
      }
    });
  }

  handleTweetText(text) {
    if (text.indexOf("https") !== -1) {
      let urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function(url) {
        return '<a class="info-window-text-link" href="' + url + '" target="_blank">' + url + '</a>';
      });
    } else {
      return text;
    }
  }

  handleTweetDate(date) {
    const parsedDate = new Date(
    date.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,
        "$1 $2 $4 $3 UTC"));

    let hours = parsedDate.getHours();
    let minutes = parsedDate.getSeconds();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hours > 12) {
      hours = (hours % 12);
      minutes = minutes + " PM";
    } else {
      minutes = minutes + "AM";
    }

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const monthIndex = parsedDate.getMonth();
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();


    return `${hours}:${minutes} - ${day} ${monthNames[monthIndex]} ${year}`;
  }

  parseTweetLink(username, id) {
    return `https://twitter.com/${username}/status/${id}`;
  }

  handleClick (marker, tweet) {
    let that = this;
    marker.addListener('click', () => {
      that.map.setCenter(marker.position);
      that.infowindow.setContent(
        `<div class='info-window'>
          <img class='info-window-image' src=${tweet.profile_picture} />
          <div class='info-window-text'>

            <div class='info-window-item weight'>
              <a href="https://www.twitter.com/${tweet.screen_name}" target="_blank">${tweet.screen_name}</a>
            </div>
            <div class='info-window-item'>${this.handleTweetText(tweet.text)}</div>
            <div class='info-window-item'>${this.handleTweetDate(tweet.created_at)}</div>
            <div class='info-window-twitter-link'>
              <a href="https://www.twitter.com/statuses/${tweet.tweet_id}" target="_blank">View Full Tweet</a>
            </div>

          </div>

        </div>`
      );
      that.infowindow.open(that.map, marker);
    });
    this.markers.push(marker);
  }

  render() {
    return(
      <div className='map-container'>
        <div className="map" id='map' ref='map'>Map</div>
      </div>
    );
  }
}
export default withRouter(Map);
