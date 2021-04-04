import styled from '@emotion/styled';

const Button = styled('button')`
  width: 100%;
  height: 64px;
  margin-top: 24px;
  margin-bottom: 16px;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  outline: 0;
  border: 0;
  border-radius: 100px;
  background-color: var(--black);
  color: var(--white);
  font-weight: 700;

  p {
    color: var(--white);
  }

  :hover {
    cursor: pointer;
  }

  > * {
    line-height: 0;
  }
`;

export default ({ children, onClick }) => (
  <Button onClick={onClick}>{children}</Button>
);
