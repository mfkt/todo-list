// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { Container, Left, Right } from './LayoutStyle';

interface Props {
  currentLocale: string;
  onChangeLocale: (value: string) => void;
  children?: JSX.Element | JSX.Element[];
}

interface ButtonProps {
  marked: boolean;
}

const Body = styled.div`
  background: lightgray;
  margin-bottom: 1em;
`;

const Button = styled.button`
  outline: none;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.5em;
  background: transparent;
  cursor: pointer;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: ${(props: ButtonProps) =>
    props.marked ? '4px solid black' : '4px solid transparent'};
`;

const Headline = styled.h2`
  margin: 0.5em;
  padding: 0.5em;
`;

const HeaderStyle: React.FC<Props> = (props: Props) => {
  return (
    <Body>
      <Container>
        <Left>
          <Headline>{props.children}</Headline>
        </Left>
        <Right>
          <Button
            onClick={() => props.onChangeLocale('SK')}
            marked={props.currentLocale === 'SK'}
          >
            SK
          </Button>
          <Button
            onClick={() => props.onChangeLocale('EN')}
            marked={props.currentLocale === 'EN'}
          >
            EN
          </Button>
        </Right>
      </Container>
    </Body>
  );
};

export default HeaderStyle;
