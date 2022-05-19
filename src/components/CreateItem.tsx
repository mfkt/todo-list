import React, { useState } from 'react';
// @ts-ignore
import styled from 'styled-components';
import theme from '../styles/theme';

import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useFormik, FormikValues, FormikErrors } from 'formik';

import { convertDateToString, getCurrentDate } from '../utils/dateUtils';
import { useDispatch, useSelector } from 'react-redux';
import { putList } from '../features/lists/listSlice';
import { RootState } from '../store/store';

import { useTranslation } from 'react-i18next';
import { Dayjs } from 'dayjs';

import { ItemDto } from '../model/itemDto';
import { ListDto } from '../model/listDto';

interface FormValues {
  title: string;
  text: string;
  deadline: Dayjs;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 14,
  pt: 2,
  px: 4,
  pb: 3
};

const InputRow = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  text-align: center;
  padding: 0.5em;
`;

const CreateItem: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedList = useSelector(
    (state: RootState) => state.data.selectedList
  );
  const [openedModal, setOpenedModal] = useState<boolean>(false);

  const initialValues: FormValues = {
    title: '',
    text: '',
    deadline: getCurrentDate()
  };
  const formik = useFormik({
    initialValues,
    validate: (values: FormikValues) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.deadline) {
        errors.deadline = 'Required';
      }
      if (values.title === '') {
        errors.title = 'Title cannot be empty';
      } else if (values.title.length > 30) {
        errors.title = 'Title is too long';
      }
      if (values.text.length > 80) {
        errors.title = 'Text is too long';
      }
      return errors;
    },
    onSubmit: (values: FormikValues, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        values.text = '';
        values.title = '';
        values.deadline = getCurrentDate();
      }, 400);
      if (selectedList) {
        const itemToAdd: ItemDto = {
          id: values.title,
          title: values.title,
          text: values.text,
          deadline: convertDateToString(values.deadline.toString()),
          state: 'ACTIVE'
        };
        const list: ListDto = {
          ...selectedList,
          items: [...selectedList.items, itemToAdd]
        };
        dispatch(putList(list));
        handleCloseModal();
      }
    }
  });

  const handleOpenModal = () => {
    setOpenedModal(true);
  };

  const handleCloseModal = () => {
    setOpenedModal(false);
  };

  return (
    <>
      <Tooltip title={`${t('common.create')} ${t('list.item.item')}`}>
        <IconButton aria-label='addItem' size='large' onClick={handleOpenModal}>
          <AddCircleRoundedIcon
            fontSize='large'
            sx={{ color: theme.colors.accent }}
          />
        </IconButton>
      </Tooltip>
      <Modal
        open={openedModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2 style={{ color: theme.colors.grey }} id='child-modal-title'>
            {t('CreateTODOItem')}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <InputRow>
              <TextField
                style={{ width: '100%' }}
                error={!!formik.errors.title}
                helperText={
                  formik.errors.title ? formik.errors.title.toString() : ''
                }
                id='itemTitleField'
                label={t('list.item.title')}
                variant='standard'
                name='title'
                disabled={formik.isSubmitting}
                value={formik.values.title}
                onChange={(val) => {
                  formik.setFieldValue('title', val.target.value);
                }}
              />
            </InputRow>
            <InputRow>
              <TextField
                style={{ width: '100%' }}
                error={!!formik.errors.text}
                helperText={
                  formik.errors.text ? formik.errors.text.toString() : ''
                }
                id='itemTextField'
                label='text'
                variant='standard'
                name='text'
                multiline
                rows={2}
                disabled={formik.isSubmitting}
                value={formik.values.text}
                onChange={(val) => {
                  formik.setFieldValue('text', val.target.value);
                }}
              />
            </InputRow>
            <InputRow>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  disabled={formik.isSubmitting}
                  value={formik.values.deadline}
                  onChange={(val) => {
                    formik.setFieldValue('list.item.deadline', val);
                  }}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      style={{ width: '100%' }}
                      variant='standard'
                    />
                  )}
                  label={t('list.deadline')}
                />
              </LocalizationProvider>
            </InputRow>
            <InputRow>
              <Button
                sx={{ color: theme.colors.accent }}
                type='submit'
                disabled={formik.isSubmitting}
              >
                {t('common.create')}
              </Button>
              <Button
                sx={{ color: theme.colors.accent }}
                onClick={handleCloseModal}
              >
                {t('common.close')}
              </Button>
            </InputRow>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CreateItem;
