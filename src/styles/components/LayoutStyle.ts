// @ts-ignore
import styled from 'styled-components';
import theme from '../theme';

const Container = styled.div`
  display: inline-flex;
  margin-bottom: 0.6em;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  padding-left: 0.4em;
  width: 50%;
  flex-direction: row;
`;

const Right = styled.div`
  display: flex;
  padding-right: 0.4em;
  width: 50%;
  flex-direction: row-reverse;
`;

const Center = styled.div`
  display: block;
  padding-top: 4em;
  padding-bottom: 4em;
  text-align: center;
`;

const Headline = styled.h3`
  margin-bottom: 1em;
  color: ${theme.colors.grey};
`;

export { Left, Right, Container, Center, Headline };
