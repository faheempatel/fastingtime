import { h, Component } from 'preact';
import styled from 'preact-emotion';
import { route } from 'preact-router';
import { format, subDays, isSameMinute } from 'date-fns';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import { fastHasStarted, fastHasEnded } from '../utils';
import { setInterval, clearInterval } from 'requestanimationframe-timer';

import fastingTimes from '../times.json';
import { CONTAINER_VARIANTS } from './variants';

import Container from './Container';
import NavBar, { NavBarWithLocationMenu } from './NavBar';
import StatusRow from './StatusRow';
import TimeRing from './TimeRing';
import TimeRow from './TimeRow';
import Button from './Button';
import Footer from './Footer';
import EidCard from './EidCard';
import LocationMenu from './LocationMenu';

if (module.hot) {
  require('preact/debug');
}

const LOCATION_LS_KEY = 'selectedLocation';
const DEFAULT_LOCATION = 'london';

const FEATURE_FLAGS = {
  LOCATION_MENU: false
};

export default class App extends Component {
  constructor() {
    super();
    this.lastMinute = Date.now();
    this.window = typeof window !== 'undefined' && window;

    // Get stored value, if any
    if (this.window) {
      this.storedLocation = this.window.localStorage.getItem(LOCATION_LS_KEY);
    }

    this.state = {
      currentDateAndTime: this.lastMinute,
      selectedLocation: this.storedLocation || DEFAULT_LOCATION,
      locationMenuOpen: false
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ currentDateAndTime: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  shouldComponentUpdate(_, nextState) {
    const menuToggled =
      this.state.locationMenuOpen !== nextState.locationMenuOpen;

    const locationChanged =
      this.state.selectedLocation !== nextState.selectedLocation;

    const nextMinute = !isSameMinute(
      this.lastMinute,
      nextState.currentDateAndTime
    );

    return menuToggled || locationChanged || nextMinute ? true : false;
  }

  componentDidUpdate() {
    this.lastMinute = Date.now();
  }

  onLocationClick = e => {
    const newlySelectedLocation = e.target.textContent.toLowerCase();
    this.setState({ selectedLocation: newlySelectedLocation }, () => {
      if (this.window) {
        this.window.localStorage.setItem(
          LOCATION_LS_KEY,
          newlySelectedLocation
        );
      }
    });
  };

  onLocationMenuClick = () => {
    this.setState({ locationMenuOpen: true });
  };

  render() {
    if (this.state.locationMenuOpen && FEATURE_FLAGS.LOCATION_MENU) {
      return (
        <LocationMenu
          selectedLocation={this.state.selectedLocation}
          onLocationClick={this.onLocationClick}
          onNavBarClick={() => this.setState({ locationMenuOpen: false })}
        />
      );
    }

    // NOTE: ramadanOffset only needs to be set in case toHijri calculation
    // isn't correct and needs to be overridden
    const ramadanOffset = subDays(this.state.currentDateAndTime, 1);
    const islamicDate = toHijri(ramadanOffset).format('dS mmmm yyyy', {
      locale: 'en'
    });
    const islamicDay = toHijri(ramadanOffset).format('d');
    const gregorianDate = format(this.state.currentDateAndTime, 'Do MMMM YYYY');

    // NOTE: Due to the nature of how Eid is determined irl
    // this will probably require being manually set at some point
    const isEid = true;
    if (isEid) return <EidCard />;

    const locationTimes = fastingTimes[this.state.selectedLocation];

    let startTime = locationTimes[islamicDay].startTime;
    let endTime = locationTimes[islamicDay].endTime;

    // Show next fast info if current has ended
    if (fastHasEnded(this.state.currentDateAndTime, endTime)) {
      const nextDay = parseInt(islamicDay) + 1;
      startTime = locationTimes[nextDay].startTime;
      endTime = locationTimes[nextDay].endTime;
    }

    const started = fastHasStarted(this.state.currentDateAndTime, startTime);

    return (
      <Container variant={CONTAINER_VARIANTS.HOMESCREEN}>
        {FEATURE_FLAGS.LOCATION_MENU ? (
          <NavBarWithLocationMenu
            title={islamicDate}
            subtitle={gregorianDate}
            onClick={this.onLocationMenuClick}
          />
        ) : (
          <NavBar title={islamicDate} subtitle={gregorianDate} />
        )}
        <StatusRow
          fastHasStarted={started}
          selectedLocation={this.state.selectedLocation}
          onButtonClick={
            FEATURE_FLAGS.LOCATION_MENU ? this.onLocationMenuClick : null
          }
        />
        <TimeRing
          fastHasStarted={started}
          currentDateAndTime={this.state.currentDateAndTime}
          startTime={startTime}
          endTime={endTime}
        />
        <TimeRow
          fastHasStarted={started}
          startTime={startTime}
          endTime={endTime}
        />
        <Button text={'Rules For Fasting'} onClick={() => route('/rules')} />
        <Footer />
      </Container>
    );
  }
}
