import React, {
  Component,
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback
} from 'react';
import { useMachine } from '@xstate/react';
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

import { make as Container } from '../components/Layout/Container.bs';
import { make as NavBar } from '../components/NavBar/NavBar.bs';
import { make as NavBarWithLocationMenu } from '../components/NavBar/NavBarWithLocationMenu.bs';
import TimeRing from '../components/TimeRing';
import { make as InfoRow } from '../components/InfoRow/InfoRow.bs';
import { make as Button } from '../components/Button/Button.bs';
import { make as Footer } from '../components/Footer/Footer.bs';

import LocationMenu from '../components/LocationMenu';
// import { make as LocationMenu } from '../components/LocationMenu/LocationMenu.bs';

import { make as TimeLabel } from '../components/TimeLabel/TimeLabel.bs';
import { make as LocationPill } from '../components/LocationPill/LocationPill.bs';
import { make as EatStatus } from '../components/EatStatus/EatStatus.bs';

import { make as IftarScreen } from '../screens/IftarScreen/IftarScreen.bs';
import { make as EidScreen } from '../screens/EidScreen/EidScreen.bs';
import { make as HomeScreen } from '../screens/HomeScreen/HomeScreen.bs';

const LOCATION_LS_KEY = 'selectedLocation';
const DEFAULT_LOCATION = '1';

const App = () => {
  const [screenState, send] = useMachine(screenMachine);
  const [currentDateAndTime, setCurrentDateAndTime] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return window.localStorage.getItem(LOCATION_LS_KEY) || DEFAULT_LOCATION;
  });

  const lastMinute = useRef(currentDateAndTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateAndTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextMinute = !isSameMinute(lastMinute.current, currentDateAndTime);

    if (nextMinute) {
      lastMinute.current = currentDateAndTime;
    }
  }, [currentDateAndTime]);

  const currentLocation = fastingTimes.locations[selectedLocation];
  const currentRegion = fastingTimes.regions[currentLocation.region];
  const timetable = fastingTimes.timetables[currentLocation.timetable];

  // NOTE: Due to the nature of the lunar calendar the Hijri date from the library won't always be
  // accurate. So a ramadanOffset value is used to manually adjust the date accordingly
  const dateWithRamadanOffset = subDays(
    currentDateAndTime,
    currentRegion.ramadanOffset
  );

  const islamicDate = getFullHijriDate(dateWithRamadanOffset);
  const islamicDay = getHijriDay(dateWithRamadanOffset);
  const gregorianDate = getFullGregorianDate(currentDateAndTime);
  const isNotRamadan = !islamicDate.toLowerCase().includes('ramadan');

  // Show Eid message when not in Ramadan
  // TODO: Should probably add an additional homescreen
  if (isNotRamadan) {
    send('START_EID');
  }

  let { startTime, endTime } = timetable.days[islamicDay];

  // Show next fast info if current has ended
  const fastHasEnded = isAfter(currentDateAndTime, endTime);
  const withinFiveMinutes =
    differenceInMinutes(currentDateAndTime, endTime) * 60000 <=
    IFTAR_DURATION_IN_MS;
  if (fastHasEnded) {
    if (withinFiveMinutes) send('IFTAR_STARTED');
    // TODO: Bad - fix this
    try {
      const tomorrow = timetable.days[parseInt(islamicDay) + 1];
      startTime = tomorrow.startTime;
      endTime = tomorrow.endTime;
    } catch {
      send('START_EID');
      return;
    }
  }

  const renderLocationMenu = useCallback(() => {
    const saveLocationSetting = value => {
      window.localStorage.setItem(LOCATION_LS_KEY, value);
    };

    const onLocationSelection = e => {
      const newLocationId = e.target.dataset.id;
      if (!newLocationId) return;
      setSelectedLocation(newLocationId);
      saveLocationSetting(newLocationId);
    };

    return (
      <LocationMenu
        selectedLocation={selectedLocation}
        onLocationSelection={onLocationSelection}
        onClose={() => send('CLOSE_MENU')}
      />
    );
  }, [selectedLocation]);

  return useMemo(() => {
    switch (screenState.value) {
      case 'menu':
        return renderLocationMenu();
      case 'iftar':
        return <IftarScreen />;
      case 'eid':
        return <EidScreen />;
      default:
        return (
          <HomeScreen
            islamicDate={islamicDate}
            gregorianDate={gregorianDate}
            startTime={startTime}
            endTime={endTime}
            currentLocation={currentLocation}
            currentRegion={currentRegion}
            currentDateAndTime={currentDateAndTime}
            stateMachineSend={send}
          />
        );
    }
  }, [screenState.value, selectedLocation, lastMinute.current]);
};

export default App;
