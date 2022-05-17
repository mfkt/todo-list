// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { Grid, Button, TextField, TextFieldProps } from '@mui/material';
import { Formik, FormikValues, Form, Field, ErrorMessage } from 'formik';

// import theme from 'theme';
import { Left, Right } from './LayoutStyle';
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

const Title = styled.h3`
  margin-bottom: 1em;
  background: lightgray;
`;

const Footer = styled.div`
  margin-top: 2em;
  background: lightgray;
`;

const ListsStyle: React.FC<Props> = (props: Props) => {
  return (
    <Body>
      <Left>
        <Title>{props.headline}</Title>
      </Left>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values: FormikValues, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
          props.onCreateList(values.name);
          values.name = '';
        }}
      >
        {({ isSubmitting }) => (
          <Right>
            <Form>
              <Field
                type='text'
                name='name'
                render={(props: JSX.IntrinsicAttributes & TextFieldProps) => (
                  <TextField
                    {...props}
                    id='searchField'
                    label='searchField'
                    variant='standard'
                  />
                )}
              />
              <ErrorMessage name='name' component='div' />
              <Button type='submit' disabled={isSubmitting}>
                <AddCircleRoundedIcon />
              </Button>
            </Form>
          </Right>
        )}
      </Formik>
      <Grid container spacing={2}>
        {props.children}
      </Grid>
      <Footer>description</Footer>
    </Body>
  );
};

export default ListsStyle;
