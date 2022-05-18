import React, { useState } from 'react';
// @ts-ignore
import styled from 'styled-components';

import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useFormik, FormikValues } from 'formik';

import { convertDateToString, getCurrentDate } from '../utils/dateUtils';
import { useDispatch, useSelector } from 'react-redux';
import { putList } from '../features/lists/listSlice';
import { RootState } from '../store/store';
import { ItemDto } from '../model/itemDto';
import { ListDto } from '../model/listDto';

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
  text-align: center;
  padding: 0.5em;
`;

const CreateItem: React.FC = () => {
  const dispatch = useDispatch();
  const selectedList = useSelector(
    (state: RootState) => state.data.selectedList
  );
  const [openedModal, setOpenedModal] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
      deadline: getCurrentDate()
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
      <IconButton aria-label='addItem' size='large' onClick={handleOpenModal}>
        <AddCircleRoundedIcon fontSize='large' />
      </IconButton>
      <Modal
        open={openedModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2 id='child-modal-title'>Create new TODO item</h2>
          <form onSubmit={formik.handleSubmit}>
            <InputRow>
              <TextField
                style={{ width: '100%' }}
                id='itemTitleField'
                label='title'
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
                    formik.setFieldValue('deadline', val);
                  }}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      style={{ width: '100%' }}
                      variant='standard'
                    />
                  )}
                  label='Deadline'
                />
              </LocalizationProvider>
            </InputRow>
            <InputRow>
              <Button onClick={handleCloseModal}>Close</Button>
              <Button type='submit' disabled={formik.isSubmitting}>
                Pridat
              </Button>
            </InputRow>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CreateItem;
