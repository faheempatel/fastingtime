import styled from '@emotion/styled';

const LocationButton = styled('button')`
  margin-left: -15px;
  outline: 0;
  border: 3px solid var(--light-grey);
  border-radius: 100px;
  padding: 9px 22px;
  background: white;
  cursor: ${props => (props.onClick ? 'pointer' : 'initial')};
}

  p {
    color: var(--grey);
    font-weight: 700;
    text-transform: capitalize;
  }
`;

export default ({ text, onClick }) => (
  <LocationButton onClick={onClick}>
    <p>{text}</p>
  </LocationButton>
);
