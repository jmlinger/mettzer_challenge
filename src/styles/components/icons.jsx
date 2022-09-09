import styled from 'styled-components';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const favIconsConfig = `
  color: Gold;
  width: max(3.5vw, 25px);
  height: max(3.5vh, 25px);
`;

export const FavOffIcon = styled(AiOutlineStar)`
  ${favIconsConfig}
`;

export const FavOnIcon = styled(AiFillStar)`
  ${favIconsConfig}
`;

export const FavBtn = styled.button`
  background-color: inherit;
  border: none;
  :hover {
    transform: scale(1.4);
    transition-duration: 500ms;
    cursor: pointer;
  }
`;
