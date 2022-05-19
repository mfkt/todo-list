// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';
import theme from '../theme';
import { Left, Right, Container, Headline } from './LayoutStyle';

import {
  Grid,
  TextField,
  IconButton,
  FormControl,
  Tooltip
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import { FormikErrors, FormikValues, useFormik } from 'formik';

import { useTranslation } from 'react-i18next';

interface Props {
  headline: string;
  onCreateList: (listName: string) => void;
  children?: JSX.Element | JSX.Element[];
}

interface FormValues {
  name: string;
}

const Body = styled.div`
  padding: 1em;
  background: ${theme.colors.light};
  border-radius: ${theme.radii.button};
  color: ${theme.colors.grey};
`;

const ListsStyle: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();

  const initialValues: FormValues = {
    name: ''
  };
  const formik = useFormik({
    initialValues,
    validate: (values: FormikValues) => {
      const errors: FormikErrors<FormValues> = {};
      if (values.name === '') {
        errors.name = 'Title cannot be empty';
      } else if (values.name.length > 30) {
        errors.name = 'Title is too long';
      }
      return errors;
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
                error={!!formik.errors.name}
                helperText={
                  formik.errors.name ? formik.errors.name.toString() : ''
                }
                id='createList'
                label={t('common.create')}
                name='name'
                disabled={formik.isSubmitting}
                value={formik.values.name}
                onChange={(val) => {
                  formik.setFieldValue('name', val.target.value);
                }}
              />
            </FormControl>
            <Tooltip title={`${t('common.create')} ${t('TODOLists')}`}>
              <IconButton
                type='submit'
                style={{ marginLeft: '0.5em' }}
                aria-label='addItem'
                size='large'
                disabled={formik.isSubmitting}
              >
                <AddCircleRoundedIcon
                  fontSize='large'
                  sx={{ color: theme.colors.accent }}
                />
              </IconButton>
            </Tooltip>
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
