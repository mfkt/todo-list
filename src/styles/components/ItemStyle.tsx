import React, { useState } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// components
import { ItemDto } from '../../model/itemDto';

// themes
import theme from '../theme';
import { Left, Right } from './LayoutStyle';

interface Props {
  onRemoveItem: (itemId: number) => void;
  onMarkAsFinishedItem: (itemId: number) => void;
  item: ItemDto;
}

const Section = styled.div`
  height: 30px;
  padding: 8px;
  background: whitesmoke;
  border-radius: ${theme.radii.button};
  cursor: pointer;
`;

const Def = styled.p`
  margin-top: 0.2em;
  margin-bottom: 0.2em;
`;

const State = styled.p`
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  margin-right: 2em;
  font-weight: bold;
`;

const ItemStyle: React.FC<Props> = (props: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandingItem = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={12} md={12}>
      <Section>
        <Left>
          <Def>{props.item.title}</Def>
        </Left>
        <Right>
          {!expanded ? (
            <IconButton
              aria-label='left'
              size='small'
              onClick={handleExpandingItem}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label='down'
              size='small'
              onClick={handleExpandingItem}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </Right>
        <Right>
          <State>{props.item.state}</State>
        </Right>
      </Section>
      <Section>
        <Def>{props.item.text ? props.item.text : 'Not defined'}</Def>
      </Section>
      {expanded && (
        <Section>
          <Left>
            <Def>{`deadline: ${props.item.deadline}`}</Def>
          </Left>
          <Right>
            {props.item.state === 'ACTIVE' && (
              <IconButton
                aria-label='check'
                size='small'
                onClick={() => props.onMarkAsFinishedItem(props.item.id)}
              >
                <CheckIcon />
              </IconButton>
            )}
            <IconButton
              aria-label='delete'
              size='small'
              onClick={() => props.onRemoveItem(props.item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Right>
        </Section>
      )}
    </Grid>
  );
};

export default ItemStyle;
