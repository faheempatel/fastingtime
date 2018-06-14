import { h, Component } from 'preact';
import styled from 'preact-emotion';
import { format, subDays, isSameMinute } from 'date-fns';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import { fastHasStarted, fastHasEnded } from '../utils';
import { setInterval, clearInterval } from 'requestanimationframe-timer';

import fastingTimes from '../times.json';

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

const OuterContainer = styled('div')`
  @media only screen and (min-width: 600px) {
    display: flex;
  }

  @media only screen and (min-width: 600px) and (min-height: 720px) {
    min-height: 100vh;
  }
`;

const AppContainer = styled('div')`
  width: 100%;
  margin: auto;
  padding: 16px 24px;
  background-color: #fff;

  @media only screen and (min-width: 600px) {
    max-width: 375px;
  }

  @media only screen and (min-width: 600px) and (min-height: 720px) {
    max-width: 400px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
      0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 16px;
  }
`;

// const LocationIcon = styled('div')`
//   width: 20px;
//   height: 20px;
//   background: url(${locationIconUrl});
// `;

export default class App extends Component {
  constructor() {
    super();
    const currentDateAndTime = Date.now();
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

  // TODO - REFACTOR!!!
  render() {
    const ramadanOffset = subDays(this.state.currentDateAndTime, 2);
    const islamicDate = toHijri(ramadanOffset).format('dS mmmm yyyy', {
      locale: 'en'
    });
    const islamicDay = toHijri(ramadanOffset).format('d');
    const gregorianDate = format(this.state.currentDateAndTime, 'Do MMMM YYYY');

    let startTime = null;
    let endTime = null;
    let started = false;
    let isEid = false;

    // TODO - REFACTOR BAD CODE
    try {
      startTime = fastingTimes[islamicDay].startTime;
      endTime = fastingTimes[islamicDay].endTime;

      if (fastHasEnded(this.state.currentDateAndTime, endTime)) {
        startTime = fastingTimes[parseInt(islamicDay) + 1].startTime;
        endTime = fastingTimes[parseInt(islamicDay) + 1].endTime;
      }

      started = fastHasStarted(this.state.currentDateAndTime, startTime);
    } catch (error) {
      isEid = true;
    }

    return (
      <OuterContainer>
        <AppContainer>
          {isEid ? (
            <EidCard />
          ) : (
            <div>
              <NavBar islamicDate={islamicDate} gregorianDate={gregorianDate} />
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
              <Button
                text={'Rules For Fasting'}
                link={
                  'http://seekershub.org/ans-blog/2010/08/09/the-complete-guide-to-fasting/'
                }
              />

              <Footer />
            </div>
          )}
        </AppContainer>
      </OuterContainer>
    );
  }
}
