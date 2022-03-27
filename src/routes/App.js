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
} from '../stateMachines/screenMachine';

import fastingTimes from '../times.json';
import { CONTAINER_VARIANTS } from '../components/variants';

import { make as Container } from '../components/Layout/Container.bs';
import { make as NavBar } from '../components/NavBar/NavBar.bs';
import { make as NavBarWithLocationMenu } from '../components/NavBar/NavBarWithLocationMenu.bs';
import TimeRing from '../components/TimeRing';
import { make as InfoRow } from '../components/InfoRow/InfoRow.bs';
import { make as Button } from '../components/Button/Button.bs';
import { make as Footer } from '../components/Footer/Footer.bs';
import LocationMenu from '../components/LocationMenu';
import { make as TimeLabel } from '../components/TimeLabel/TimeLabel.bs';
import { make as LocationPill } from '../components/LocationPill/LocationPill.bs';
import { make as EatStatus } from '../components/EatStatus/EatStatus.bs';

import { make as IftarScreen } from '../screens/IftarScreen/IftarScreen.bs';
import { make as EidScreen } from '../screens/EidScreen/EidScreen.bs';
import { make as HomeScreen } from '../screens/HomeScreen/HomeScreen.bs';

if (module.hot) {
  require('preact/debug');
}

const LOCATION_LS_KEY = 'selectedLocation';
const DEFAULT_LOCATION = '1';

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

  renderLocationMenu() {
    const saveLocationSetting = value => {
      if (this.window) {
        this.window.localStorage.setItem(LOCATION_LS_KEY, value);
      }
    };

    const onLocationSelection = e => {
      const newLocationId = e.target.dataset.id;
      if (!newLocationId) return;
      this.setState(
        { selectedLocation: newLocationId },
        saveLocationSetting(newLocationId)
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
    const currentLocation =
      fastingTimes.locations[this.state.selectedLocation] ||
      fastingTimes.locations[DEFAULT_LOCATION];

    const currentRegion = fastingTimes.regions[currentLocation.region];
    const timetable = fastingTimes.timetables[currentLocation.timetable];

    // NOTE: Due to the nature of the lunar calendar the Hijri date from the library won't always be
    // accurate. So a ramadanOffset value is used to manually adjust the date accordingly
    const dateWithRamadanOffset = subDays(
      this.state.currentDateAndTime,
      currentRegion.ramadanOffset
    );
    const islamicDate = getFullHijriDate(dateWithRamadanOffset);
    const islamicDay = getHijriDay(dateWithRamadanOffset);
    const gregorianDate = getFullGregorianDate(this.state.currentDateAndTime);

    const isNotRamadan = !islamicDate.toLowerCase().includes('ramadan');

    // Show Eid message when not in Ramadan
    // TODO: Should probably add an additional homescreen
    if (isNotRamadan) {
      // this.stateMachineService.send('START_EID');
    }

    switch (this.state.screen.value) {
      case 'menu':
        return this.renderLocationMenu();
      case 'iftar':
        return <IftarScreen />;
      case 'eid':
        return <EidScreen />;
    }

    let { startTime, endTime } = timetable.days[islamicDay];

    // Show next fast info if current has ended
    const fastHasEnded = isAfter(this.state.currentDateAndTime, endTime);
    const withinFiveMinutes =
      differenceInMinutes(this.state.currentDateAndTime, endTime) * 60000 <=
      IFTAR_DURATION_IN_MS;

    if (fastHasEnded) {
      if (withinFiveMinutes) this.stateMachineService.send('IFTAR_STARTED');
      // TODO: Bad - fix this
      try {
        const tomorrow = timetable.days[parseInt(islamicDay) + 1];
        startTime = tomorrow.startTime;
        endTime = tomorrow.endTime;
      } catch {
        this.stateMachineService.send('START_EID');
        return;
      }
    }

    return (
      <HomeScreen
        islamicDate={islamicDate}
        gregorianDate={gregorianDate}
        startTime={startTime}
        endTime={endTime}
        currentLocation={currentLocation}
        currentRegion={currentRegion}
        currentDateAndTime={this.state.currentDateAndTime}
        startTime={startTime}
        stateMachineService={this.stateMachineService}
      />
    );
  }
}
