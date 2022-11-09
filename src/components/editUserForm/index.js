import React, { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import { Autocomplete, Checkbox, FormControlLabel, IconButton, InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFirstnameLastname, getSelectedUserId, getGender, getDepartment } from '../../modules/redux/userInfo/selectors';
import { getDepartments, getGenders } from '../../modules/redux/applicationInfo/selectors';
import { setEditUser } from '../../modules/saga/profile/actions';
import { CMD } from '../../services/cmd';
import {styles} from './styles';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';


const EditUserForm = ({ userList }) => {
    const dispatch = useDispatch();
    const selectedUserId = useSelector(getSelectedUserId);
    const [userId, setUserId] = useState(selectedUserId);
    let user = userList?.find(i => i.user_id === userId);
    const firstnameLastname = user?.firstname_lastname;
    const genderName = user?.gender;
    const depatmentName = user?.department_text
    const [department, setDepartment] = useState(depatmentName);
    const [gender, setGender] = useState(genderName);
    const [name, setName] = useState(firstnameLastname);
    const departments = useSelector(getDepartments);
    const genders = useSelector(getGenders);
    const [mustChangePassword, setMustChangePassword] = useState(0);
    const [newPassword, setNewPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleChangeSelectUser = (_, user) => {
        setUserId(user?.user_id);
        setDepartment(user?.department_text);
        setGender(user?.gender);
        setName(user?.firstname_lastname);
        if (!user) {
            setName('');
        }
    };

    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangeInput = (event) => {
        setName(event.target.value);
    }

    const handleSendEditedData = () => {
        if(userId) {
            const editedGender = genders.find(currentGender => currentGender.text == gender).id;
            const editedDepartment = departments.find(currentDepartment => currentDepartment.department_text == department).id;
            dispatch(setEditUser({
                cmd: CMD.EDITUSER,
                user_id: userId,
                department_id: editedDepartment,
                firstname_lastname: name,
                gender_id: editedGender,
                change_password: mustChangePassword,
                user_password: newPassword
            }));
        }
    }

    const handlePasswordChange = (mustChange) => {
        setMustChangePassword(prev=>!prev);
        if(mustChange == 0) {
            setNewPassword('');
        }
    }

    const handleNewPassword = () => {
        setNewPassword(event.target.value);
    }

    const onPressPasswordIcon = () => {
        setIsVisible(!isVisible);
    };

    const endIcon = <InputAdornment position="end">
        <IconButton onClick={onPressPasswordIcon} edge="end">
            {
                isVisible ? (
                    <VisibilityOff />
                ) : (
                    <Visibility />
                )
            }
        </IconButton>
    </InputAdornment>;

    const renderUserList = useMemo(() => {
        let user = userList?.find(i => i.user_id === userId);
        return <Autocomplete
            disablePortal
            onChange={handleChangeSelectUser}
            id="combo-box-demo"
            value={user}
            options={userList}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option?.firstname_lastname}
            renderInput={(params) => <TextField {...params} label="Select user" />} />
    }, [userList, userId ]);

    return(
        <div style={{display: 'flex', margin: 50, flexDirection: 'column', width: 300}}>
            <Stack spacing={3}>
                {renderUserList}
                <TextField
                    select
                    value={department}
                    label="Select department"
                    id="outlined-select-currency"
                    onChange={handleChangeDepartment}
                    defaultValue={departments[0].department_text}>
                    {departments.map((option) => (
                    <MenuItem key={option.id} value={option.department_text}>
                        {option.department_text}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Change name"
                    value={name}
                    id="outlined-required"
                    onChange={handleChangeInput}
                />
                <TextField
                    select
                    value={gender}
                    label="Select gender"
                    id="outlined-select-currency"
                    onChange={handleChangeGender}
                    defaultValue={genders[0].text}>
                    {genders.map((option) => (
                    <MenuItem key={option.id} value={option.text}>
                        {option.text}
                    </MenuItem>
                    ))}
                </TextField>
                <FormControlLabel
                    label="Must change password"
                    control={
                    <Checkbox
                        checked={mustChangePassword}
                        onChange={()=>handlePasswordChange(!mustChangePassword)}
                    />
                    }
                />
                <TextField
                style={{display: mustChangePassword ? 'flex' : 'none'}}
                    label="New password"
                    InputProps={{endAdornment: (endIcon)}}
                    type={isVisible ? "text" : "password"}
                    value={newPassword}
                    id="outlined-required"
                    onChange={handleNewPassword}
                />
                <Button disabled={false} sx={styles.formButton} onClick={handleSendEditedData} variant="contained">EDIT</Button>
            </Stack>
        </div>
    )
};

export default EditUserForm;