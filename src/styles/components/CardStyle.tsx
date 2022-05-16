import React from 'react';
// @ts-ignore
import styled from 'styled-components';

interface Props {
  title: string;
  color: string;
}

const CardBody = styled.div`
  font-size: 2em;
  height: 100px;
  text-align: center;
  margin: auto;
  width: 50%;
  background: darkred;
  cursor: pointer;
`;

const CardStyle: React.FC<Props> = (props: Props) => {
  return <CardBody>{props.title}</CardBody>;
};

export default CardStyle;
