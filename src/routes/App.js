import { h, Component } from 'preact';
import styled from 'preact-emotion';
import { route } from 'preact-router';
import { interpret } from 'xstate';
import { format, subDays, isSameMinute } from 'date-fns';

import { setInterval, clearInterval } from 'requestanimationframe-timer';
import {
  isAfter,
  getFullHijriDate,
  getHijriDay,
  getFullGregorianDate,
  differenceInMinutes
} from '../utils';
import screenMachine, {
  IFTAR_DURATION_IN_MS
} from '../state_machines/screenMachine';

import fastingTimes from '../times.json';
import { CONTAINER_VARIANTS } from '../components/variants';

import Container from '../components/Container';
import NavBar, { NavBarWithLocationMenu } from '../components/NavBar';
import TimeRing from '../components/TimeRing';
import InfoRow from '../components/InfoRow';
import Button from '../components/Button';
import Footer from '../components/Footer';
import EidCard from '../components/EidCard';
import LocationMenu from '../components/LocationMenu';
import TimeLabel from '../components/TimeLabel';
import LocationButton from '../components/LocationButton';
import EatStatus from '../components/EatStatus';
import IftarMessage from '../components/IftarMessage';

if (module.hot) {
  require('preact/debug');
}

const LOCATION_LS_KEY = 'selectedLocation';
const DEFAULT_LOCATION = 'london';

const FEATURE_FLAGS = {
  LOCATION_MENU: true
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
      screen: screenMachine.initialState
    };

    this.stateMachineService = interpret(screenMachine);

    this.stateMachineService.subscribe(screen => {
      this.setState({ screen });
    });

    this.stateMachineService.start();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ currentDateAndTime: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    this.stateMachineService.stop();
    clearInterval(this.timer);
  }

  shouldComponentUpdate(_, nextState) {
    const screenChanged = nextState.screen.value !== this.state.screen.value;

    const locationChanged =
      this.state.selectedLocation !== nextState.selectedLocation;

    const nextMinute = !isSameMinute(
      this.lastMinute,
      nextState.currentDateAndTime
    );

    return screenChanged || locationChanged || nextMinute ? true : false;
  }

  componentDidUpdate() {
    this.lastMinute = Date.now();
  }

  onLocationMenuClick = () => {
    this.stateMachineService.send('OPEN_MENU');
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
        onClose={() => this.stateMachineService.send('CLOSE_MENU')}
      />
    );
  }

  render() {
    switch (this.state.screen.value) {
      case 'menu':
        return this.renderLocationMenu();
      case 'iftar':
        return <IftarMessage />;
      case 'eid':
        return <EidCard />;
    }

    // NOTE: ramadanOffset only needs to be set in case toHijri calculation
    // isn't correct and needs to be overridden
    const ramadanOffset = subDays(this.state.currentDateAndTime, 1);
    const islamicDate = getFullHijriDate(ramadanOffset);
    const islamicDay = getHijriDay(ramadanOffset);
    const gregorianDate = getFullGregorianDate(this.state.currentDateAndTime);

    const timesForCurrentLocation = fastingTimes[this.state.selectedLocation];
    let { startTime, endTime } = timesForCurrentLocation[islamicDay];

    // Show next fast info if current has ended
    const fastHasEnded = isAfter(this.state.currentDateAndTime, endTime);
    const withinFiveMinutes =
      differenceInMinutes(this.state.currentDateAndTime, endTime) * 60000 <=
      IFTAR_DURATION_IN_MS;

    if (fastHasEnded) {
      if (withinFiveMinutes) this.stateMachineService.send('IFTAR_STARTED');
      const tomorrow = timesForCurrentLocation[parseInt(islamicDay) + 1];
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
        <Button onClick={() => route('/rules')}>
          <p>Rules for Fasting</p>
        </Button>
        <Footer />
      </Container>
    );
  }
}
