import { h, Component } from 'preact';
import styled from 'preact-emotion';
import { route } from 'preact-router';
import { format, subDays, isSameMinute } from 'date-fns';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import { fastHasStarted, fastHasEnded } from '../utils';
import { setInterval, clearInterval } from 'requestanimationframe-timer';

import fastingTimes from '../times.json';
import settingsIconUrl from '../assets/icons/settings.svg';

import Container from './Container';
import NavBar from './NavBar';
import StatusRow from './StatusRow';
import TimeRing from './TimeRing';
import TimeRow from './TimeRow';
import Button from './Button';
import Footer from './Footer';
import EidCard from './EidCard';

// import locationIconUrl from '../assets/location.svg';

if (module.hot) {
  require('preact/debug');
}

// const LocationIcon = styled('div')`
//   width: 20px;
//   height: 20px;
//   background: url(${locationIconUrl});
// `;

export default class App extends Component {
  lastMinute = Date.now();

  state = {
    currentDateAndTime: this.lastMinute
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ currentDateAndTime: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update if we're on a new minute
    return isSameMinute(this.lastMinute, nextState.currentDateAndTime)
      ? false
      : true;
  }

  componentDidUpdate(previousProps, previousState) {
    this.lastMinute = Date.now();
  }

  renderEidCard() {
    return (
      <Container>
        <EidCard />
      </Container>
    );
  }

  render() {
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

    let startTime = fastingTimes[islamicDay].startTime;
    let endTime = fastingTimes[islamicDay].endTime;

    // Show next fast info if current has ended
    if (fastHasEnded(this.state.currentDateAndTime, endTime)) {
      const nextDay = parseInt(islamicDay) + 1;
      startTime = fastingTimes[nextDay].startTime;
      endTime = fastingTimes[nextDay].endTime;
    }

    const started = fastHasStarted(this.state.currentDateAndTime, startTime);

    return (
      <Container>
        <NavBar
          title={islamicDate}
          subtitle={gregorianDate}
          icon={settingsIconUrl}
          onClick={() => alert('Coming soon, inshaAllah')}
        />
        <StatusRow fastHasStarted={started} />
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
