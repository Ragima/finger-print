import MainButton from "../mainButton";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSendTimeData } from "../../modules/saga/time/actions";
import { Utils } from "../../services/utils";
import {
  List,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  ListItem,
} from "@mui/material";
import {
  getAccListControl,
  getRoles,
} from "../../modules/redux/applicationInfo/selectors";
import { setDelRights } from "../../modules/saga/deleteRights/actions";


const DeleteRightsForm = () => {
  const dispatch = useDispatch();
  const rolesList = useSelector(getRoles);
  const accListControl = useSelector(getAccListControl);
  const [roles, setRoles] = useState({
    id: rolesList?.[0].id,
    text: rolesList?.[0]?.role_text,
  });
  const [data, setData] = useState([])
  const selectedRole = Utils.findRole(accListControl,roles?.id)
  const [rights, setRights] = useState({
    text: selectedRole?.[0],
  });
  const handleChangeSelectReason = (event) => {
    setRoles({
      id: event.id,
      text: event.role_text,
    });
  };
  const handleChangeSelectRights = (event) => {
    setRights({
      text: event,
    });
  };
  const handleAddTimeData = () => {
      const newItem = {
          role_id: roles.id, short_code: rights.text, role_text: roles.text
        }
        if(newItem.role_id && newItem.short_code){
            setData([...data, newItem])
        }
    }
  const handleDelRights = () => {
    dispatch(setDelRights(data));
  };

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
        <TextField
          select
          value={roles.text}
          label="Roles"
          required
          sx={{ width: 500 }}
          id="outlined-select-currency"
          defaultValue={roles.text}
        >
          {rolesList.map((option) => (
            <MenuItem
              onClick={() => handleChangeSelectReason(option)}
              key={option.id}
              value={option.role_text}
            >
              {option.role_text}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          value={rights.text}
          label="Rights"
          required
          sx={{ width: 500 }}
          id="outlined-select-currency"
        >
          {selectedRole.map((option) => (
            <MenuItem
              onClick={() => handleChangeSelectRights(option)}
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
        <MainButton label="Add" onClick={handleAddTimeData} />
        {data.length ? (
          <>
            <List sx={{ width: 500 }}>
              {data.map((value, index) => (
                <ListItem
                  key={index}
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                  disableGutters
                >
                  <ListItemText primary={`Name: ${value?.role_text}`} />
                  <ListItemText
                    primary={`Rights: ${value?.short_code}`}
                  />
                </ListItem>
              ))}
            </List>
            <MainButton label="Send" onClick={handleDelRights} />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </div>
  );
};

export default DeleteRightsForm;