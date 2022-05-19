// @ts-ignore
import React, { JSX, useState } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { Right, Left, Container, Headline } from './LayoutStyle';
import theme from '../theme';

import {
  FormControl,
  Grid,
  MenuItem,
  IconButton,
  TextField,
  Tooltip
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';

import CreateItem from '../../components/CreateItem';

import { useTranslation } from 'react-i18next';

interface Props {
  headline: string;
  onItemStateChange: (state: string) => void;
  onFilterStateChange: (state: string) => void;
  children?: JSX.Element | JSX.Element[];
}

interface StyleProps {
  extension: boolean;
}

const Body = styled.div`
  padding: 1em;
  background: ${theme.colors.light};
  border-radius: ${theme.radii.button};
`;

const Section = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  border-top: ${(props: StyleProps) =>
    props.extension
      ? `${theme.lineHeights.paragraph}px solid ${theme.colors.grey}`
      : `0px solid ${theme.colors.light}`};
`;

const ItemsStyle: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
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
          <Tooltip title={!expanded ? t('common.expand') : t('common.hide')}>
            <IconButton
              aria-label='left'
              size='large'
              onClick={handleExpandItem}
            >
              {expanded ? (
                <ExpandLessSharpIcon
                  fontSize='large'
                  sx={{ color: theme.colors.dark }}
                />
              ) : (
                <ExpandMoreSharpIcon
                  fontSize='large'
                  sx={{ color: theme.colors.dark }}
                />
              )}
            </IconButton>
          </Tooltip>
          <CreateItem />
        </Right>
      </Container>
      {expanded && (
        <Section extension={true}>
          <Container>
            <Left>
              <FormControl variant='standard'>
                <TextField
                  value={filterState}
                  onChange={handleInputChange}
                  id='searchField'
                  label={t('search')}
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
                  <MenuItem value='ALL'>{t('list.item.all')}</MenuItem>
                  <MenuItem value='ACTIVE'>{t('list.item.active')}</MenuItem>
                  <MenuItem value='FINISHED'>
                    {t('list.item.finished')}
                  </MenuItem>
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
