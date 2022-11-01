import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useState } from 'react';
import { addPost, updatePost } from '../services/APIService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const EditModal = ({ visibility, onClose, row = {} }) => {
    const editMode = !!row?.post_id
    const { post_description, post_title, post_id, post_date: date } = row;
    const [title, setTitle] = useState(post_title)
    const [description, setDescription] = useState(post_description)
    const post_date = format(date ? new Date(date) : new Date(), 'yyyy/MM/dd hh:mm:ss')
    const token = localStorage.getItem('userToken')

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const onChaneDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const values = {
            post_title: title,
            post_description: description,
            post_date: post_date,
        }
        if (editMode) {
            const response = await updatePost(post_id, values, token)
            if (response?.success) {
                onClose()
            } else {
                alert(response?.message || "Something went wrong")
            }
        } else {
            const response = await addPost(values, token)
            if (response?.success) {
                onClose()
            } else {
                alert(response?.message || "Something went wrong")
            }
        }
    };
    return (
        <Modal
            open={visibility}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <TextField value={title} onChange={(e) => onChangeTitle(e)} id="postTitle" label="Post Title" variant="outlined" fullWidth />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField value={description} onChange={(e) => onChaneDescription(e)} id="postDescription" label="Post Description" variant="outlined" fullWidth />
                </Typography>
                <Button style={{ top: 10 }} onClick={(event) => handleSubmit(event)} variant="contained">Post</Button>
            </Box>
        </Modal>
    )
}