import MainButton from "../mainButton";
import { CMD } from "../../services/cmd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRolesCMD } from "../../modules/redux/common/selectors";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { updateUserTerminal } from "../../modules/saga/updateUserTerminal/action";
import { getSelectUserList } from "../../modules/redux/userInfo/selectors";
import { setUserLogin } from "../../modules/saga/dashboard/action";


const ChangeUserNameForm = ({selectUserList}) => {
  const dispatch = useDispatch();
  const rolesCMD = useSelector(getRolesCMD);
  const [userId, setUserId] = useState();
  const [userUid, setUserUid] = useState();
  const [newName, setNewName] = useState("");

  const handleChangeSelectUser = (_, data) => {
    setUserId(data?.id);
    setUserUid(data?.uid);
    setNewName(data ? data?.name : "");
  };
  const handleChangeInput = (event) => {
    setNewName(event.target.value);
  };

  const handleSendChangedName = () => {
    if (userId && userUid && newName) {
      dispatch(updateUserTerminal({ uid: userUid, id: userId, name: newName }));
    } else {
      //Надо сделать варнинг!!!
    }
  };

  const renderUserList = useMemo(() => {
    let user = selectUserList?.find((i) => i.id === userId);
    return rolesCMD.includes(CMD.GETUSER) ? (
      <Autocomplete
        disablePortal
        onChange={handleChangeSelectUser}
        id="combo-box-demo"
        value={user}
        isOptionEqualToValue={(o, v) => o?.uid === v?.uid}
        options={selectUserList}
        sx={{ width: 500 }}
        getOptionLabel={(option) => option?.id}
        renderInput={(params) => <TextField {...params} label="Select user id" />}
      />
    ) : (
      <></>
    );
  }, [rolesCMD, selectUserList, userId]);

  return (
    <div
      style={{
        display: "flex",
        margin: 50,
        flexDirection: "column",
        width: 500,
      }}
    >
      <Stack spacing={3}>
        {renderUserList}
        <Typography>
          User name: {newName}
        </Typography>
        <TextField
          required
          value={newName}
          label="Change users name"
          id="outlined-required"
          onChange={handleChangeInput}
        />
        <MainButton label="SEND" onClick={handleSendChangedName} />
      </Stack>
    </div>
  );
};

export default ChangeUserNameForm;