import styled from '@emotion/styled'
import { FC } from 'react';

export interface CloseButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {}

const CloseButton: FC<CloseButtonProps> = props => {
  const { children, ...rest } = props;

  return <button {...rest}>{ children }</button>
}

const CardCloseButton = styled(CloseButton)`
  background:black;
  color:white;
  position: absolute;
  right:0;
  top:0;
  height: 25px;
  width: 30px;
  cursor:pointer;
`;

export default CardCloseButton;
