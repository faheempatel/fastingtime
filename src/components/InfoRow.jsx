import styled from '@emotion/styled';

import FlexRow from './FlexRow';

const InfoRow = styled(FlexRow)`
  align-items: center;
  padding: 0 20px;
`;

export default ({ leftComponent, rightComponent }) => (
  <InfoRow>
    {leftComponent}
    <div className="separator" />
    {rightComponent}
  </InfoRow>
);
