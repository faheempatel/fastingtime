import { h, Component } from 'preact';
import styled from 'preact-emotion';
import { route } from 'preact-router';
import { format, subDays, isSameMinute } from 'date-fns';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import { fastHasStarted, fastHasEnded } from '../utils';
import { setInterval, clearInterval } from 'requestanimationframe-timer';

import fastingTimes from '../times.json';
import settingsIconUrl from '../assets/icons/settings.svg';
import { NAV_BAR_VARIANTS } from './variants';

import Container from './Container';
import NavBar from './NavBar';
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

export default class App extends Component {
  lastMinute = Date.now();
  storedLocation = window.localStorage.getItem(LOCATION_LS_KEY);

  state = {
    currentDateAndTime: this.lastMinute,
    selectedLocation: this.storedLocation
      ? this.storedLocation
      : DEFAULT_LOCATION,
    settingsMenuOpen: false
  };

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
      this.state.settingsMenuOpen !== nextState.settingsMenuOpen;

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
      window.localStorage.setItem(LOCATION_LS_KEY, newlySelectedLocation);
    });
  };

  onSettingsClick = () => {
    this.setState({ settingsMenuOpen: true });
  };

  renderEidCard() {
    return (
      <Container>
        <EidCard />
      </Container>
    );
  }

  render() {
    if (this.state.settingsMenuOpen) {
      return (
        <LocationMenu
          selectedLocation={this.state.selectedLocation}
          onLocationClick={this.onLocationClick}
          onNavBarClick={() => this.setState({ settingsMenuOpen: false })}
          navBarVariant={NAV_BAR_VARIANTS.SMALL_ICON}
        />
      );
    }

    // NOTE: ramadanOffset only needs to be set in case toHijri calculation
    // isn't correct and needs to be overridden
    const ramadanOffset = subDays(this.state.currentDateAndTime, 0);
    const islamicDate = toHijri(ramadanOffset).format('dS mmmm yyyy', {
      locale: 'en'
    });
    const islamicDay = toHijri(ramadanOffset).format('d');
    const gregorianDate = format(this.state.currentDateAndTime, 'Do MMMM YYYY');

    // NOTE: Due to the nature of how Eid is determined irl
    // this will probably require being manually set at some point
    const isEid = islamicDate.indexOf('Ramadan') === -1;
    if (isEid) return this.renderEidCard();

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
      <Container>
        <NavBar
          title={islamicDate}
          subtitle={gregorianDate}
          icon={settingsIconUrl}
          onClick={this.onSettingsClick}
        />
        <StatusRow
          fastHasStarted={started}
          selectedLocation={this.state.selectedLocation}
          onButtonClick={this.onSettingsClick}
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
