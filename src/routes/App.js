import { h, Component } from 'preact';
import { interpret } from 'xstate';
import { subDays } from 'date-fns';

import fastingTimes from '../times.json';
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

import LocationMenu from '../components/LocationMenu';

import HomeScreen from '../screens/HomeScreen';
import EidCard from '../screens/EidCard';
import IftarMessage from '../screens/IftarMessage';

if (module.hot) {
  require('preact/debug');
}

const LOCATION_LS_KEY = 'selectedLocation';
const DEFAULT_LOCATION = '1';

const FEATURE_FLAGS = {
  LOCATION_MENU: false
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

  onLocationMenuClick = e => {
    e.preventDefault();
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
      this.stateMachineService.send('START_EID');
    }

    switch (this.state.screen.value) {
      case 'menu':
        return this.renderLocationMenu();
      case 'iftar':
        return <IftarMessage />;
      case 'eid':
        return <EidCard />;
    }

    let { startTime, endTime } = timetable.days[islamicDay];

    // Show next fast info if current has ended
    const fastHasEnded = isAfter(this.state.currentDateAndTime, endTime);

    const withinFiveMinutes =
      differenceInMinutes(this.state.currentDateAndTime, endTime) * 60000 <=
      IFTAR_DURATION_IN_MS;

    const thereIsFastTomorrow = timetable.days[parseInt(islamicDay) + 1];

    if (fastHasEnded) {
      if (withinFiveMinutes) {
        this.stateMachineService.send('IFTAR_STARTED');
      } else if (thereIsFastTomorrow) {
        startTime = tomorrow.startTime;
        endTime = tomorrow.endTime;
      } else {
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
        currentDateAndTime={this.currentDateAndTime}
      />
    );
  }
}
