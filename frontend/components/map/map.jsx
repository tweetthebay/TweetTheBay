import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Modal from 'react-modal';

let dummyTweets = [
  {
    content: 'hey',
    coordinates: {coordinates: [-122.43129699999997, 37.773972]}
  },
  {
    content: 'hop',
    coordinates: {coordinates: [-122.43129699999999, 37.71370248522799]}
  }
]

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.state = {
      modalOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    dummyTweets.forEach(tweet => {
      this.addTweet(tweet)
    });
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
    this.modal;
    let that = this;
    let pos = new google.maps.LatLng(tweet.coordinates.coordinates[1], tweet.coordinates.coordinates[0]);
    let marker = new google.maps.Marker({
            position: pos,
            map: this.map
          });
      this.bounds.extend(marker.position);
      marker.addListener('click', () => {
        // we will replace this click with a modal later on
        that.tweet = tweet;
        that.openModal();
        // that.infowindow.setContent(`${tweet.content}`);
        // that.infowindow.open(that.map, marker);
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
      <div>
        <div className="map" id='map' ref='map'>Map</div>
          <Modal
                contentLabel='Modal'
                isOpen={this.state.modalOpen}
                onRequestClose={this.closeModal}
                style={ModalStyle}>
                {(this.tweet) ? <p>{this.tweet.content}</p> : null }
             <br/><br/>
              </Modal>
      </div>
    );
  }
}

export default Map;
