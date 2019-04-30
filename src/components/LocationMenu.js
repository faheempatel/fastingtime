import { h, Component } from 'preact';
import styled from 'preact-emotion';
import { route } from 'preact-router';

import fastingTimes from '../times.json';
import backIconUrl from '../assets/icons/back.svg';

import Container from './Container';
import NavBar from './NavBar';

// TODO: MOVE THESE INTO A UTILITY FOLDER
const Heading = styled('h2')`
  margin-top: 32px;
  margin-bottom: 24px;
  font-weight: 800;
  color: var(--grey);
  text-transform: capitalize;
  cursor: pointer;
`;
const SelectedHeading = styled(Heading)`
  color: var(--black);
`;

class LocationMenu extends Component {
  state = {};
  locations = Object.keys(fastingTimes).sort();

  renderLocations() {
    return this.locations.map(location =>
      location === this.props.selectedLocation ? (
        <SelectedHeading>{location}</SelectedHeading>
      ) : (
        <Heading onClick={this.props.onLocationClick}>{location}</Heading>
      )
    );
  }

  render() {
    return (
      <Container>
        <NavBar
          title={'Change Location'}
          icon={backIconUrl}
          onClick={this.props.onNavBarClick}
        />
        {this.renderLocations()}
      </Container>
    );
  }
}

export default LocationMenu;
