// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Body = styled.div`
  background: lightgray;
  margin-bottom: 1em;
`;

const HeaderStyle: React.FC<Props> = (props: Props) => {
  return <Body>{props.children}</Body>;
};

export default HeaderStyle;
