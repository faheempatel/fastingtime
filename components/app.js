import { h, Component } from 'preact';
import styled from 'styled-components';
import { format, subDays, isSameMinute } from 'date-fns';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import { fastHasStarted, fastHasEnded } from '../utils';

import fastingTimes from '../times.json';

import NavBar from './NavBar';
import TimeRing from './TimeRing';
import TimeLabel from './TimeLabel';
import FlexRow from './FlexRow';
import StatusRow from './StatusRow';
import Button from './Button';
import Footer from './Footer';

// import locationIconUrl from '../assets/location.svg';

const Container = styled.div`
  min-width: 375px;
  padding: 16px 24px;
  @media only screen and (min-width: 600px) and (min-height: 720px) {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
`;

// const LocationIcon = styled.div`
//   width: 20px;
//   height: 20px;
//   background: url(${locationIconUrl});
// `;

export default class App extends Component {
  constructor() {
    super();
    const currentDateAndTime = new Date();
    this.state = {
      currentDateAndTime
    };
    this.lastMinute = currentDateAndTime;
  }

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

  render() {
    const ramadanOffset = subDays(this.state.currentDateAndTime, 2);
    const islamicDate = toHijri(ramadanOffset).format('dS mmmm yyyy', {
      locale: 'en'
    });
    const islamicDay = toHijri(ramadanOffset).format('d');
    const gregorianDate = format(this.state.currentDateAndTime, 'Do MMMM YYYY');

    let startTime = fastingTimes[islamicDay].startTime;
    let endTime = fastingTimes[islamicDay].endTime;

    // WARNING WARNING WARNING
    // will cause a bug after 30/31 days - FIX
    startTime = fastHasEnded(this.state.currentDateAndTime, endTime)
      ? fastingTimes[parseInt(islamicDay) + 1].startTime
      : startTime;

    endTime = fastHasEnded(this.state.currentDateAndTime, endTime)
      ? fastingTimes[parseInt(islamicDay) + 1].endTime
      : endTime;

    const started = fastHasStarted(this.state.currentDateAndTime, startTime);

    return (
      <Container>
        <NavBar islamicDate={islamicDate} gregorianDate={gregorianDate} />

        <FlexRow>
          <TimeLabel text={'Fast Starts'} time={format(startTime, 'hh:mma')} />
          <TimeLabel text={'Fast Ends'} time={format(endTime, 'hh:mma')} />
        </FlexRow>

        <TimeRing
          fastHasStarted={started}
          currentDateAndTime={this.state.currentDateAndTime}
          startTime={startTime}
          endTime={endTime}
        />

        <StatusRow fastHasStarted={started} />

        <Button text={'Rules For Fasting'} />

        <Footer />
      </Container>
    );
  }
}
