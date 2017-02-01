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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.geocodeAddress = this.geocodeAddress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.markers = [];
  }


  openModal() {
    this.setState({
      modalOpen: true
    });
  }

  closeModal() {
    this.setState({modalOpen: false});
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
    this.bounds = new google.maps.LatLngBounds;

    if (this.props.tweets.length > 0) {
      this.props.tweets.forEach(tweet => {
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

    if (newProps !== this.props) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
    }

    if (newProps.tweets) {
      newProps.tweets.forEach(tweet => {
        this.addTweet(tweet);
      });
    }
  }

  getLocation (map) {

    let that = this;
    map.addListener('idle', (event) => {


      const bounds = map.getBounds();
      const radius = Math.abs(bounds.f.b - bounds.f.f) * 34.5;
      const centerLat = map.getCenter().lat();
      const centerLng = map.getCenter().lng();


      that.props.setMapPosition({radius: radius, lat: centerLat, lng: centerLng});
    });
  }

  addTweet (tweet) {
    this.modal;
    let that = this;
    let marker;
    if (tweet.coordinates) {
      let pos = new google.maps.LatLng(
        tweet.coordinates.coordinates[1],
        tweet.coordinates.coordinates[0]
      );
      marker = new google.maps.Marker({
        position: pos,
        map: this.map
      });
      this.markers.push(marker)
      this.handleClick(marker, tweet);
    } else if (typeof tweet.place === 'undefined' ) {
      return;
    } else {
      this.geocodeAddress(that.geocoder, that.map, tweet.place.full_name, tweet);
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
        this.markers.push(marker);
        that.handleClick(marker, tweet);
      } else {
        return;
      }
    });
  }

  handleClick (marker, tweet) {
    let that = this;
    marker.addListener('click', () => {
      // that.tweet = tweet;
      // that.openModal();
      that.map.setCenter(this.position);
      that.infowindow.setContent(`${tweet.text}`);
      that.infowindow.open(that.map, marker);
    });
  }

  render() {
    const ModalStyle = {
  overlay : {
    position          : 'fixed',
    top               : '0px',
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0,0,0,0.6)',
    transition: 'all 0.5s'
  },
  content : {
    padding: '0',
    boxShadow: "20px 20px 20px",
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : 'auto',
    transform             : 'translate(-50%, -50%)',
    borderRadius          : '20px',
    backgroundColor : '#EDE5E2'
  }
  };
    return(
      <div className='map-container'>
        <div className="map" id='map' ref='map'>Map</div>
          <Modal
                contentLabel='Modal'
                isOpen={this.state.modalOpen}
                onRequestClose={this.closeModal}
                style={ModalStyle}>
                {(this.tweet) ? <p>{this.tweet.text}</p> : null }
             <br/><br/>
              </Modal>
      </div>
    );
  }
}

export default Map;
