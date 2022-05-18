// @ts-ignore
import React, { JSX, useState } from 'react';
// @ts-ignore
import styled from 'styled-components';
import {
  FormControl,
  Grid,
  MenuItem,
  IconButton,
  TextField
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';

// components
import CreateItem from '../../components/CreateItem';

// import theme from 'theme';
import { Right, Left, Container, Headline } from './LayoutStyle';

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

const Section = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
`;

const ItemsStyle: React.FC<Props> = (props: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [itemState, setItemState] = useState<string>('ALL');
  const [filterState, setFilterState] = useState<string>('');

  const handleExpandItem = () => {
    setExpanded(!expanded);
  };

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
      <Container>
        <Left>
          <Headline>{props.headline}</Headline>
        </Left>
        <Right>
          <IconButton aria-label='left' size='large' onClick={handleExpandItem}>
            {expanded ? (
              <ExpandLessSharpIcon fontSize='large' />
            ) : (
              <ExpandMoreSharpIcon fontSize='large' />
            )}
          </IconButton>
          <CreateItem />
        </Right>
      </Container>
      {expanded && (
        <Section>
          <Container>
            <Left>
              <FormControl variant='standard'>
                <TextField
                  value={filterState}
                  onChange={handleInputChange}
                  id='searchField'
                  label='searchField'
                />
              </FormControl>
            </Left>
            <Right>
              <FormControl>
                <Select
                  style={{ minWidth: '150px' }}
                  variant='outlined'
                  aria-label='itemsState'
                  id='itemsState'
                  value={itemState}
                  onChange={handleSelectChange}
                >
                  <MenuItem value='ALL'>All</MenuItem>
                  <MenuItem value='ACTIVE'>Active</MenuItem>
                  <MenuItem value='FINISHED'>Finished</MenuItem>
                </Select>
              </FormControl>
            </Right>
          </Container>
        </Section>
      )}
      <Grid container spacing={2}>
        {props.children}
      </Grid>
    </Body>
  );
};

export default ItemsStyle;
