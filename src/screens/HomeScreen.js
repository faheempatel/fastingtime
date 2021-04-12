import { format } from 'date-fns';
import { route } from 'preact-router';

import { isAfter } from '../utils';

import { CONTAINER_VARIANTS } from '../components/variants';
import Container from '../components/Container';
import NavBar, { NavBarWithLocationMenu } from '../components/NavBar';
import TimeRing from '../components/TimeRing';
import InfoRow from '../components/InfoRow';
import Button from '../components/Button';
import Footer from '../components/Footer';
import TimeLabel from '../components/TimeLabel';
import LocationButton from '../components/LocationButton';
import EatStatus from '../components/EatStatus';

const renderNavBar = ({ islamicDate, gregorianDate }) => {
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
};

const HomeScreen = ({
  islamicDate,
  gregorianDate,
  currentLocation,
  currentRegion,
  currentDateAndTime,
  startTime,
  endTime
}) => {
  const fastHasStarted = isAfter(currentDateAndTime, startTime);
  return (
    <Container variant={CONTAINER_VARIANTS.HOMESCREEN}>
      {renderNavBar({ islamicDate, gregorianDate })}
      <InfoRow
        leftComponent={
          <LocationButton
            text={`${currentLocation.name}, ${currentRegion.code}`}
            onClick={
              FEATURE_FLAGS.LOCATION_MENU ? this.onLocationMenuClick : null
            }
          />
        }
        rightComponent={<EatStatus fastHasStarted={fastHasStarted} />}
      />
      <TimeRing
        fastHasStarted={fastHasStarted}
        currentDateAndTime={currentDateAndTime}
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
};

export default HomeScreen;
