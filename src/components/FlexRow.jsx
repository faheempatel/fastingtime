import styled from '@emotion/styled';

const FlexRow = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding: 0 24px;

  .separator {
    width: 1px;
    height: 56px;
    background-color: var(--light-grey);
  }
`;

export default FlexRow;
