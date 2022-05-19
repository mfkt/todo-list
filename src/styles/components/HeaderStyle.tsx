// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { Container, Left, Right } from './LayoutStyle';
import theme from '../theme';

interface Props {
  currentLocale: string;
  onChangeLocale: (value: string) => void;
  onNavigateHome: () => void;
  children?: JSX.Element | JSX.Element[];
}

interface ButtonProps {
  marked: boolean;
}

const Body = styled.div`
  background: ${theme.colors.dark};
  color: ${theme.colors.light};
`;

const Button = styled.button`
  outline: none;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.5em;
  background: ${theme.colors.transparent};
  font-weight: ${theme.fontWeights.normal};
  color: ${theme.colors.light};
  cursor: pointer;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: ${(props: ButtonProps) =>
    props.marked
      ? `${theme.lineHeights.normal}px solid ${theme.colors.accent}`
      : `${theme.lineHeights.normal}px solid ${theme.colors.transparent}`};
  opacity: 0.7;
  transition-duration: 0.3s;
  &:hover {
    transition-duration: 0.3s;
    opacity: 1;
  }
`;

const Headline = styled.h2`
  margin: 0.5em;
  padding: 0.5em;
  cursor: pointer;
  opacity: 0.5;
  transition-duration: 1s;
  color: ${theme.colors.light};
  &:hover {
    color: ${theme.colors.accent};
    transition-duration: 1s;
    opacity: 1;
  }
`;

const HeaderStyle: React.FC<Props> = (props: Props) => {
  return (
    <Body>
      <Container>
        <Left>
          <Headline onClick={() => props.onNavigateHome()}>
            {props.children}
          </Headline>
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
