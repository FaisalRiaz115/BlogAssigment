import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { EditModal } from '../components/AddEditModal';
import { deletePost, fetchPosts } from '../services/APIService';

export default function Posts() {
    const [modalVisibility, setModalVisibility] = useState(false)
    const [dataArray, setDataArray] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('userToken')
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || {})
    const [selectedRow, setRow] = useState(undefined);

    useEffect(() => {
        fetchPostsCallback()
    }, [])

    console.log(userInfo)
    const fetchPostsCallback = () => {
        const getData = fetchPosts(token);
        const data = getData.then((result) => {
            setDataArray(result.posts)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error);
            return null;
        });
    }

    const onModalClose = () => {
        setModalVisibility(false)
        fetchPostsCallback()
        setRow(undefined)
    }

    const onPostDelete = async (id) => {
        const res = await deletePost(id, token)
        if (res.success) {
            fetchPostsCallback()
        } else {
            alert(res?.message || "Something went wrong")
        }
    }

    const onLogout = () => {
        window.location.reload()
        localStorage.removeItem("userToken")
    }

    return (
        <div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>

                <div style={{ flex: 1 }}>
                    <h2>Posts</h2>
                    <Button variant="contained" onClick={() => setModalVisibility(true)}>Add New Post</Button>
                </div>
                <Button style={{ margin: 20, width: 120, height: 30 }} variant="contained" onClick={onLogout}>Logout</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Post Title</TableCell>
                            <TableCell align="left">Post Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataArray?.map((row, index) => (
                            <TableRow
                                key={row?.post_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row?.post_title ?? ""} {"(View comments)"}
                                </TableCell>
                                <TableCell align="left">{row?.post_description ?? ""}</TableCell>
                                <TableCell align="right">
                                    {userInfo.id == row.user_id && <EditIcon onClick={() => {
                                        setRow(row)
                                        setModalVisibility(true)
                                    }} />}
                                    {userInfo.id == row.user_id && <DeleteIcon onClick={() => onPostDelete(row.post_id)} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {modalVisibility && <EditModal row={selectedRow} visibility={modalVisibility} onClose={onModalClose} />}
        </div>
    );
}  