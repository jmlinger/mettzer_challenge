import styled from 'styled-components';

const SubHeader = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  button {
    background-color: #1e90ff;
    border-radius: 15%;
    margin-left: 0.5em;
    margin-right: 1em;
    &:disabled {
      opacity: 0.6;
    }
  }
`;

export const SubHeaderOff = styled(SubHeader)`
  section {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    p {
      margin-right: 1em;
    }
  }
  div {
    align-content: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  button:first-child {
    background-color: gold;
  }
`;

export const SubHeaderOn = styled(SubHeader)`
  div {
    align-content: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
