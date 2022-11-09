import { Button, IconButton, List, ListItem, ListItemText, Stack, TextareaAutosize } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../modules/redux/showRecHistory/actions';
import './styles.css';


const UsersList = ({ items, users, onClick, timeTypes }) => {
    const dispatch = useDispatch();
    const showRecHistoryClick = (uid) => {
        dispatch(setModal(true));
        dispatch({ type: 'SET_SHOW_REC_HISTORY', payload: uid });
    };
    const [search, setSearch] = useState("");
    const [description, setDescription] = useState('');
    const searchDescribe = (event) => {
        setSearch(event.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    return (
        <>
            <List sx={{ width: '100%', marginTop: '10px'}}>
                {items.length ? (
                    <input
                        className="searchInputUserList"
                        onChange={searchDescribe}
                        value={search}
                        placeholder="Search added for..."
                    ></input>
                ) : (
                    <></>
                )}
                {items.filter((item) => {
                    if (search === "") {
                        return item;
                    } else if (
                        users.find(user => user?.user_id === item?.id)?.firstname_lastname
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ) {
                        return item;
                    }
                }).sort(function (a, b) {
                    return new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);
                }).map((i, index) => (
                    <ListItem
                        sx={{ margin: '10px 0', backgroundColor: 'rgb(50, 0, 100)', padding: 2, borderRadius: 1, display: 'flex', flexDirection: 'row' }}
                        key={index}
                        disableGutters
                        secondaryAction={
                            <Stack spacing={2} sx={{ paddingRight: 2}}>
                                <Button onClick={() => {
                                    onClick(i?.uid, 2, description, setDescription(''))
                                }} color="custom" variant="outlined">
                                    Accept
                                </Button>
                                <Button onClick={() => {
                                    onClick(i?.uid, 3, description, setDescription(''))
                                }} sx={{ color: '#f25c66', border:"1px solid #f25c66" }} color="custom" variant="outlined">
                                    Decline
                                </Button>
                                <Button
                                    onClick={() => i?.uid ? showRecHistoryClick(i?.uid) : null}
                                    sx={{ color: '#56DFF5', borderBottom:"1px solid #56DFF5"}} color="custom" >
                                    History
                                </Button>
                            </Stack>
                        } >
                        <Stack sx={{ color: 'white' }}>
                            {/* Надо будет переделать реагирование на статусы, потому что сейчас приходит 3 и 1, а может быть будет еще другой. Можно вынести в функцию */}
                            <ListItemText primary={i?.status === "1" ? 'New!' : 'Deleted'} sx={{ color: i?.status === "1" ? '#23e9b4' : '#f25c66' }} />
                            <ListItemText primary={`Added by: ${i?.added_by !== "Fingerprint" ? users.find(user => user?.user_id === i?.added_by)?.firstname_lastname : "Fingerprint"}`} />
                            <ListItemText primary={`Added for: ${users.find(user => user?.user_id === i?.id)?.firstname_lastname}`} />
                            <ListItemText primary={`Type: ${i?.timetype_id !== "0" ? timeTypes.find(type => type?.id === i?.timetype_id)?.timetype_text : "Time"}`} />
                            <ListItemText primary={`Date: ${i?.date}, time: ${i?.time}`} />
                            <ListItemText primary={`Created: ${i?.create_time}`} />
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Description"
                                style={{ minWidth: 250, maxWidth: 250, minHeight: 60, maxHeight: 60, marginTop: 10 }}
                                onChange={onChangeDescription}
                            />
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </>
    )
};

export default UsersList;