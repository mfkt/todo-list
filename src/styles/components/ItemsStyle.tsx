// @ts-ignore
import React, { JSX, useState } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { Grid, MenuItem, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// components
import CreateItem from '../../components/CreateItem';

// import theme from 'theme';
import { Right, Left } from './LayoutStyle';

interface Props {
  headline: string;
  onItemStateChange: (state: string) => void;
  onFilterStateChange: (state: string) => void;
  children?: JSX.Element | JSX.Element[];
}

const Body = styled.div`
  padding: 1em;
  background: lightgray;
`;

const Headline = styled.h3`
  margin-bottom: 1em;
  background: lightgray;
`;

const Footer = styled.div`
  margin-top: 2em;
  background: lightgray;
`;

const ItemsStyle: React.FC<Props> = (props: Props) => {
  const [itemState, setItemState] = useState<string>('ALL');
  const [filterState, setFilterState] = useState<string>('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    setItemState(event.target.value);
    return props.onItemStateChange(event.target.value);
  };

  const handleInputChange = (event: { target: { value: string } }) => {
    setFilterState(event.target.value);
    return props.onFilterStateChange(event.target.value);
  };

  return (
    <Body>
      <Left>
        <Headline>{props.headline}</Headline>
      </Left>
      <Left>
        <CreateItem />
      </Left>
      <Right>
        <TextField
          value={filterState}
          onChange={handleInputChange}
          id='searchField'
          label='searchField'
          variant='standard'
        />
        <Select
          aria-label='itemsState'
          id='itemsState'
          variant='standard'
          value={itemState}
          onChange={handleSelectChange}
        >
          <MenuItem value='ALL'>All</MenuItem>
          <MenuItem value='ACTIVE'>Active</MenuItem>
          <MenuItem value='FINISHED'>Finished</MenuItem>
        </Select>
      </Right>
      <Grid container spacing={2}>
        {props.children}
      </Grid>
      <Footer>Footer</Footer>
    </Body>
  );
};

export default ItemsStyle;
