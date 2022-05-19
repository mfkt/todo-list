import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import theme from '../theme';

interface Props {
  title: string;
  color: string;
}

const CardBody = styled.div`
  font-size: 4em;
  height: 100px;
  text-align: center;
  margin: auto;
  padding: ${theme.space.medium}px;
  width: 50%;
  background: ${theme.colors.accent};
  border-radius: ${theme.radii.rounded};
  cursor: pointer;
  opacity: 0.5;
  transition-duration: 1s;
  &:hover {
    transition-duration: 1s;
    opacity: 1;
  }
`;

const CardStyle: React.FC<Props> = (props: Props) => {
  return <CardBody>{props.title}</CardBody>;
};

export default CardStyle;
