import React, { useState } from 'react';
// @ts-ignore
import styled from 'styled-components';
import theme from '../theme';
import { Left, Right, Container } from './LayoutStyle';

import { IconButton, Grid, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useTranslation } from 'react-i18next';

import { ItemDto } from '../../model/itemDto';

interface Props {
  onRemoveItem: (itemId: string) => void;
  onMarkAsFinishedItem: (itemId: string) => void;
  item: ItemDto;
}

interface StateProps {
  state: 'ACTIVE' | 'FINISHED';
}

interface SectionProps {
  header: boolean;
  extension?: boolean;
}

const Section = styled.div`
  height: 30px;
  padding: 8px;
  background: ${(props: SectionProps) =>
    props?.extension ? theme.colors.dark : theme.colors.grey};
  margin: auto;
  width: ${(props: SectionProps) => (props?.extension ? '94%' : '96%')};
  color: ${theme.colors.light};
  border-top-right-radius: ${(props: SectionProps) =>
    props.header ? theme.radii.button : 0};
  border-top-left-radius: ${(props: SectionProps) =>
    props.header ? theme.radii.button : 0};
  border-bottom-right-radius: ${(props: SectionProps) =>
    props.header ? 0 : theme.radii.button};
  border-bottom-left-radius: ${(props: SectionProps) =>
    props.header ? 0 : theme.radii.button};
  cursor: pointer;
`;

const Def = styled.p`
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  font-size: ${theme.fontSizes.body};
  @media (max-width: 1000px) {
    font-size: ${theme.fontSizes.subTitle}px;
  }
`;

const State = styled.p`
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  margin-right: 1em;
  font-weight: ${theme.fontWeights.extraBold};
  font-size: ${theme.fontSizes.body};
  color: ${(props: StateProps) =>
    props.state === 'ACTIVE' ? theme.colors.warning : theme.colors.success};
`;

const ItemStyle: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandingItem = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={12} md={12}>
      <Section header={true}>
        <Container>
          <Left>
            <Def>{props.item.title}</Def>
          </Left>
          <Right>
            {!expanded ? (
              <Tooltip title={t('common.expand')}>
                <IconButton
                  aria-label='left'
                  size='small'
                  onClick={handleExpandingItem}
                >
                  <KeyboardArrowLeftIcon
                    fontSize='medium'
                    sx={{ color: theme.colors.accent }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={t('common.hide')}>
                <IconButton
                  aria-label='down'
                  size='small'
                  onClick={handleExpandingItem}
                >
                  <KeyboardArrowDownIcon
                    fontSize='medium'
                    sx={{ color: theme.colors.accent }}
                  />
                </IconButton>
              </Tooltip>
            )}
            <State state={props.item.state}>{props.item.state}</State>
          </Right>
        </Container>
      </Section>
      <Section header={false}>
        <Container>
          <Def>{props.item.text ? props.item.text : t('notDefined')}</Def>
        </Container>
      </Section>
      {expanded && (
        <Section header={false} extension={true}>
          <Container>
            <Left>
              <Def>{`${props.item.deadline}`}</Def>
            </Left>
            <Right>
              {props.item.state === 'ACTIVE' && (
                <Tooltip title={t('common.markAs')}>
                  <IconButton
                    aria-label='check'
                    size='small'
                    sx={{ color: theme.colors.accent }}
                    onClick={() => props.onMarkAsFinishedItem(props.item.id)}
                  >
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={t('common.delete')}>
                <IconButton
                  aria-label='delete'
                  size='small'
                  sx={{ color: theme.colors.accent }}
                  onClick={() => props.onRemoveItem(props.item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Right>
          </Container>
        </Section>
      )}
    </Grid>
  );
};

export default ItemStyle;
