import React from 'react';
import { Card, Grid, CardContent, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { ListDto } from '../../model/listDto';

type Props = {
  onSelectList: (listId: number) => void;
  selectedList: boolean;
  list: ListDto;
};

const ListStyle: React.FC<Props> = (props: Props) => {
  return (
    <Grid item xs={6} md={6}>
      <Card
        style={{ cursor: 'pointer' }}
        sx={{ minWidth: 120 }}
        onClick={() => props.onSelectList(props.list.id)}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {props.list.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {`Items count: ${props.list.items.length}`}
          </Typography>
        </CardContent>
        <CardActions>{props.selectedList && <CheckSharpIcon />}</CardActions>
      </Card>
    </Grid>
  );
};

export default ListStyle;
