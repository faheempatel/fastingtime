import { h, Component } from 'preact';
import styled from 'styled-components';

import {
  format,
  setHours,
  setMinutes,
  isAfter,
  parse,
  addDays,
  subDays,
  isSameMinute
} from 'date-fns';

import HijriDate, { toHijri } from 'hijri-date/lib/safe';

import NavBar from './NavBar';
import TimeRing from './TimeRing';
import TimeLabel from './TimeLabel';
import FlexRow from './FlexRow';
import StatusRow from './StatusRow';
import Button from './Button';
import Footer from './Footer';

import '../styles/global.css';

// import locationIconUrl from '../assets/location.svg';

const Container = styled.div`
  position: relative;
  min-height: 100%;
  padding: 16px 24px;
  padding-bottom: 60px;
`;

// const LocationIcon = styled.div`
//   width: 20px;
//   height: 20px;
//   background: url(${locationIconUrl});
// `;

export default class App extends Component {
  constructor() {
    super();
    const currentDateAndTime = parse(new Date());
    this.state = {
      currentDateAndTime
    };
    this.lastMinute = currentDateAndTime;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ currentDateAndTime: parse(Date.now()) });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return isSameMinute(this.lastMinute, nextState.currentDateAndTime)
      ? false
      : true;
  }

  componentDidUpdate(previousProps, previousState) {
    this.lastMinute = parse(Date.now());
  }

  render() {
    const ramadanOffset = subDays(this.state.currentDateAndTime, 2);
    const islamicDate = toHijri(ramadanOffset).format('dS mmmm yyyy', {
      locale: 'en'
    });
    const gregorianDate = format(this.state.currentDateAndTime, 'Do MMMM YYYY');

    const startTime = setMinutes(
      setHours(this.state.currentDateAndTime, 3),
      16
    );
    const endTime = setMinutes(setHours(this.state.currentDateAndTime, 20), 53);

    const fastHasStarted = (currentDateAndTime, startTime) => {
      return isAfter(currentDateAndTime, startTime) ? true : false;
    };

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
