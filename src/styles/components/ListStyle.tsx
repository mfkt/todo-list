import React from 'react';

import { Card, Grid, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';

import { ListDto } from '../../model/listDto';

import { useTranslation } from 'react-i18next';

import theme from '../theme';

type Props = {
  onSelectList: (listId: number) => void;
  selectedList: boolean;
  list: ListDto;
};

const ListStyle: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={6} md={6}>
      <Card
        style={{
          cursor: 'pointer',
          background: theme.colors.grey
        }}
        sx={{ minWidth: 120 }}
        onClick={() => props.onSelectList(props.list.id)}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: theme.fontSizes.h2,
              fontWeight: theme.fontWeights.bold
            }}
            color={theme.colors.light}
            gutterBottom
          >
            {props.list.name}
            <CheckIcon
              sx={{
                float: 'right',
                color: props.selectedList
                  ? theme.colors.accent
                  : theme.colors.grey
              }}
            />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color={theme.colors.light}>
            {`${t('list.itemsCount')}: ${props.list.items.length}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ListStyle;
