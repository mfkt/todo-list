// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { Grid, TextField, IconButton, FormControl } from '@mui/material';
import { FormikValues, useFormik } from 'formik';

// import theme from 'theme';
import { Left, Right, Container, Headline } from './LayoutStyle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

interface Props {
  headline: string;
  onCreateList: (listName: string) => void;
  children?: JSX.Element | JSX.Element[];
}

const Body = styled.div`
  padding: 1em;
  background: lightgray;
`;

const ListsStyle: React.FC<Props> = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: (values: FormikValues, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
      }, 400);
      props.onCreateList(values.name);
      values.name = '';
    }
  });

  return (
    <Body>
      <Container>
        <Left>
          <Headline>{props.headline}</Headline>
        </Left>
        <Right>
          <form onSubmit={formik.handleSubmit}>
            <FormControl variant='standard'>
              <TextField
                id='createList'
                label='Create'
                name='name'
                disabled={formik.isSubmitting}
                value={formik.values.name}
                onChange={(val) => {
                  formik.setFieldValue('name', val.target.value);
                }}
              />
            </FormControl>
            <IconButton
              type='submit'
              style={{ marginLeft: '0.5em' }}
              aria-label='addItem'
              size='large'
              disabled={formik.isSubmitting}
            >
              <AddCircleRoundedIcon fontSize='large' />
            </IconButton>
          </form>
        </Right>
      </Container>
      <Grid container spacing={2}>
        {props.children}
      </Grid>
    </Body>
  );
};

export default ListsStyle;
