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

    // this.tweets = this.props.fetchTweets();

    const map = (this.refs.map);
    this.map = new google.maps.Map(map, {
      center: {lat, lng},
      zoom: 11
    });
    this.getLocation(this.map);
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    this.bounds = new google.maps.LatLngBounds;
    if (this.props.tweets) {
      this.props.tweets.forEach(tweet => {
        this.addTweet(tweet);
      });
      this.map.fitBounds(this.bounds);
    }
  }

  componentWillReceiveProps(newProps) {
    let lat = 37.773972;
    let lng = -122.431297;
    const map = (this.refs.map);
    this.map = new google.maps.Map(map, {
      center: {lat: lat, lng: lng},
      zoom: 11
    });

    this.getLocation(this.map);
    if (newProps.tweets) {
      newProps.tweets.forEach(tweet => {
        this.addTweet(tweet);
      });
      this.map.fitBounds(this.bounds);
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

      // const lat = event.latLng.lat();
      // const lng = event.latLng.lng();

      //we can return anything we want from here.
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
      this.bounds.extend(marker.position);
      this.handleClick(marker, tweet);
    } else if (tweet.place_name === "" || typeof tweet.place_name === 'undefined') {
      return;
    } else {
      this.geocodeAddress(that.geocoder, that.map, tweet.place_name, tweet);
    }
  }

  geocodeAddress(geocoder, resultsMap, address, tweet) {
    let that = this;
    geocoder.geocode({'address': address}, (results, status) => {
      if (status === 'OK') {
        let random = 0.01 * Math.random()
        let position = new google.maps.LatLng(
          results[0].geometry.location.lat()+random,
          results[0].geometry.location.lng()+random);
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: position
        });
        this.bounds.extend(marker.position);
        this.handleClick(marker, tweet);
        return marker
      } else {
        return;
      }
    });
  }

  handleClick (marker, tweet) {
    let that = this;
    marker.addListener('click', () => {
      that.map.setCenter(this.position)
      that.tweet = tweet;
      that.openModal();
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
