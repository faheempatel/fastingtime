import { h, Component } from 'preact';
import styled from 'preact-emotion';
import { route } from 'preact-router';
import { format, subDays, isSameMinute } from 'date-fns';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import { isAfter } from '../utils';
import { setInterval, clearInterval } from 'requestanimationframe-timer';

import fastingTimes from '../times.json';
import { CONTAINER_VARIANTS } from './variants';

import Container from './Container';
import NavBar, { NavBarWithLocationMenu } from './NavBar';
import TimeRing from './TimeRing';
import InfoRow from './InfoRow';
import Button from './Button';
import Footer from './Footer';
import EidCard from './EidCard';
import LocationMenu from './LocationMenu';
import TimeLabel from './TimeLabel';
import LocationButton from './LocationButton';
import EatStatus from './EatStatus';

if (module.hot) {
  require('preact/debug');
}

const LOCATION_LS_KEY = 'selectedLocation';
const DEFAULT_LOCATION = 'london';

const FEATURE_FLAGS = {
  LOCATION_MENU: false
  SHOW_EID_CARD: false // due to the nature of how Eid is determined it is easier to manually set this
};

export default class App extends Component {
  constructor() {
    super();
    this.lastMinute = Date.now();
    this.window = typeof window !== 'undefined' && window;

    // Get stored location value, if any
    if (this.window) {
      var storedLocation = this.window.localStorage.getItem(LOCATION_LS_KEY);
    }

    this.state = {
      currentDateAndTime: this.lastMinute,
      selectedLocation: storedLocation || DEFAULT_LOCATION,
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

  onLocationMenuClick = () => {
    this.setState({ locationMenuOpen: true });
  };

  renderNavBar({ islamicDate, gregorianDate }) {
    if (FEATURE_FLAGS.LOCATION_MENU) {
      return (
        <NavBarWithLocationMenu
          title={islamicDate}
          subtitle={gregorianDate}
          onClick={this.onLocationMenuClick}
        />
      );
    } else {
      return <NavBar title={islamicDate} subtitle={gregorianDate} />;
    }
  }

  renderLocationMenu() {
    const saveLocationSetting = value => {
      if (this.window) {
        this.window.localStorage.setItem(LOCATION_LS_KEY, value);
      }
    };

    const onLocationSelection = e => {
      const newLocation = e.target.textContent.toLowerCase();
      this.setState(
        { selectedLocation: newLocation },
        saveLocationSetting(newLocation)
      );
    };

    return (
      <LocationMenu
        selectedLocation={this.state.selectedLocation}
        onLocationSelection={onLocationSelection}
        onClose={() => this.setState({ locationMenuOpen: false })}
      />
    );
  }

  render() {
    if (FEATURE_FLAGS.LOCATION_MENU && this.state.locationMenuOpen) {
      return this.renderLocationMenu();
    }

    if (FEATURE_FLAGS.SHOW_EID_CARD) return <EidCard />;

    // NOTE: ramadanOffset only needs to be set in case toHijri calculation
    // isn't correct and needs to be overridden
    const ramadanOffset = subDays(this.state.currentDateAndTime, 1);
    const islamicDate = toHijri(ramadanOffset).format('dS mmmm yyyy', {
      locale: 'en'
    });
    const islamicDay = parseInt(toHijri(ramadanOffset).format('d'));
    const gregorianDate = format(this.state.currentDateAndTime, 'Do MMMM YYYY');

    const timesForCurrentLocation = fastingTimes[this.state.selectedLocation];
    let { startTime, endTime } = timesForCurrentLocation[islamicDay];

    // Show next fast info if current has ended
    const fastHasEnded = isAfter(this.state.currentDateAndTime, endTime);
    if (fastHasEnded) {
      const tomorrow = timesForCurrentLocation[islamicDay + 1];
      startTime = tomorrow.startTime;
      endTime = tomorrow.endTime;
    }

    const fastHasStarted = isAfter(this.state.currentDateAndTime, startTime);

    return (
      <Container variant={CONTAINER_VARIANTS.HOMESCREEN}>
        {this.renderNavBar({ islamicDate, gregorianDate })}
        <InfoRow
          leftComponent={
            <LocationButton
              text={`${this.state.selectedLocation}, UK`}
              onClick={
                FEATURE_FLAGS.LOCATION_MENU ? this.onLocationMenuClick : null
              }
            />
          }
          rightComponent={<EatStatus fastHasStarted={fastHasStarted} />}
        />
        <TimeRing
          fastHasStarted={fastHasStarted}
          currentDateAndTime={this.state.currentDateAndTime}
          startTime={startTime}
          endTime={endTime}
        />
        <InfoRow
          leftComponent={
            <TimeLabel
              text={fastHasStarted ? 'Fast Started' : 'Fast Starts'}
              time={format(startTime, 'hh:mma')}
            />
          }
          rightComponent={
            <TimeLabel text={'Fast Ends'} time={format(endTime, 'hh:mma')} />
          }
        />
        <Button text={'Rules For Fasting'} onClick={() => route('/rules')} />
        <Footer />
      </Container>
    );
  }
}
