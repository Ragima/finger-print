import "./styles.css";
import React,{ useState } from "react";
import Stack from "@mui/material/Stack";
import Logo from "../../assets/svg/logo";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ButtonDropdown from "../buttonDropdown";
import { setLogOut } from "../../modules/saga/profile/actions";
import { setDrawer } from "../../modules/redux/dashboard/action";
import {
  setGenerateTimesheet,
  setGenerateTimesheetAll,
} from "../../modules/saga/generateTimesheet/actions";
import { getRolesCMD } from "../../modules/redux/common/selectors";
import { CMD } from "../../services/cmd";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserInfo from "../userInfo";
import { setDownloadUsers } from "../../modules/saga/downloadUsers/actions";
import { setExportTimesheet } from "../../modules/saga/timesheetList/action";
import { getRoles } from "../../modules/redux/applicationInfo/selectors";


const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const rolesCMD = useSelector(getRolesCMD);
  const roles = useSelector(getRoles);
  const [isAddTime, setIsAddTime] = useState(null);
  const [isTerminal, setTerminal] = useState(null)
  const [isGenerateTimeSheet, setIsGenerateTimeSheet] = useState(null);
  const [isProfile, setIsProfile] = useState(null);
  const onClickApproveTime = () => {
    dispatch(setDrawer({ isDrawer: true, drawerType: "approveTime" }));
  };

  const matches = useMediaQuery("(max-width:1050px)");

  const onClickTerminal = (event) => {
    setTerminal(event.currentTarget);
  };

  const onCloseTerminal = () => {
    setTerminal(null);
  };

  const onClickAddTime = (event) => {
    setIsAddTime(event.currentTarget);
  };

  const onCloseAddTime = () => {
    setIsAddTime(null);
  };

  const onClickGenerateTimeSheet = (event) => {
    setIsGenerateTimeSheet(event.currentTarget);
  };

  const onCloseGenerateTimeSheet = () => {
    setIsGenerateTimeSheet(null);
  };

  const onClickProfile = (event) => {
    setIsProfile(event.currentTarget);
  };

  const onCloseProfile = () => {
    setIsProfile(null);
  };

  const terminalButtons = [
    rolesCMD.includes(CMD.DOWNLOADUSER) && {
      label: "Get users from deck",
      onClick: () => dispatch(setDownloadUsers()),
    },
    rolesCMD.includes(CMD.UPDATEUSERTERMINAL) && {
      label: "Change user name",
      onClick: () =>
        dispatch(
          setDrawer({ isDrawer: true, drawerType: "updateUserTerminal" })
        ),
    },
    rolesCMD.includes(CMD.CONUSER2LOGIN) && {
      label: "Connect",
      onClick: () =>
        dispatch(
          setDrawer({ isDrawer: true, drawerType: "CONNECT" })
        ),
    },
    rolesCMD.includes(CMD.DELUSER) && {
      label: "Disable User",
      onClick: () =>
        dispatch(
          setDrawer({ isDrawer: true, drawerType: "DELUSER" })
        )
    },
    rolesCMD.includes(CMD.ADDRIGHTS2ROLE) && {
      label: "Add Rights",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "ADDRIGHTS2ROLE" })),
    },
    rolesCMD.includes(CMD.DELRIGHT4ROLE) && {
      label: "Delete Rights",
      onClick: () => dispatch(setDrawer({ isDrawer: true, drawerType: "DELRIGHT4ROLE" })),
    }
  ].filter(i => i);

  const addNewButtons = [
    {
      label: "Time",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "addTime" })),
    },
    {
      label: "Vacation",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "addVacation" })),
    },
    {
      label: "Sick leave",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "addSickLeave" })),
    },
    rolesCMD.includes(CMD.ADDUSER) &&{
      label: "User",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "ADD_USER" })),
    },
    rolesCMD.includes(CMD.ADDSHORTHOLIDAY) && {
      label: "Shortday/Holiday",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "addShortHoliday" })),
    },
  ].filter((i) => i);

  const timeSheetButtons = [
    {
      label: "Generate",
      onClick: () => {
        if (rolesCMD.includes(CMD.TIMESHEETALL)) {
          dispatch(setGenerateTimesheetAll());
        } else if (rolesCMD.includes(CMD.TIMESHEET)) {
          dispatch(setGenerateTimesheet());
        }
      },
    },
    rolesCMD.includes(CMD.GLOBALTIMESHEET) && {
      label: "Global generate",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "globalTimeSheet" })),
    },
    {
      label: "Info",
      onClick: () =>
        dispatch(
          setDrawer({ isDrawer: true, drawerType: "timeSheetStatuses" })
        ),
    },
    rolesCMD.includes(CMD.GENERATEWEEKS) && {
      label: "Generate year",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "GENERATEYEAR" })),
    },
    rolesCMD.includes(CMD.EXPORTTIMESHEET) && {
      label: "Export timesheet",
      onClick: () => dispatch(setExportTimesheet())
    },
  ].filter((i) => i);

  const profileButtons = [
    rolesCMD.includes(CMD.EDITUSER) && {
      label: "Edit User",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "EDIT_USER" })),
    },
    rolesCMD.includes(CMD.CHANGEPASSWORD) && {
      label: "Change password",
      onClick: () =>
        dispatch(setDrawer({ isDrawer: true, drawerType: "CHANGE_PASSWORD" })),
    },
    {
      label: "Logout",
      onClick: () => dispatch(setLogOut({ push: history.push })),
      sx: { color: "red" },
    },
  ].filter((i) => i);

  return (
    <div className="headerContainer">
      <Stack
        sx={{ marginBottom: 2, alignItems: "center", marginTop: "15px" }}
        spacing={2}
        direction={matches ? "column" : "row"}
      >
        <Logo width={50} height={50} />
        <UserInfo />
      </Stack>
      <Stack
        sx={{ marginBottom: 2, alignContent: "center", marginTop: "15px" }}
        spacing={2}
        direction={matches ? "column" : "row"}
        width={matches ? "350px" : "760px"}
      >
        {rolesCMD.includes(CMD.DOWNLOADUSER) ||
        rolesCMD.includes(CMD.UPDATEUSERTERMINAL) || rolesCMD.includes(CMD.CONUSER2LOGIN) ? (
          <ButtonDropdown
            label="Terminal"
            isMenu
            onClickButton={onClickTerminal}
            menuEl={isTerminal}
            onClose={onCloseTerminal}
            menuButtons={terminalButtons}
          />
        ) : null}
        {rolesCMD.includes(CMD.APPRTIME) ? (
          <ButtonDropdown
            label="Approve time"
            onClickButton={onClickApproveTime}
            isMenu={false}
          />
        ) : null}
        <ButtonDropdown
          label="Add new"
          isMenu
          onClickButton={onClickAddTime}
          menuEl={isAddTime}
          onClose={onCloseAddTime}
          menuButtons={addNewButtons}
        />
        <ButtonDropdown
          label="Time sheet"
          onClickButton={onClickGenerateTimeSheet}
          isMenu
          menuEl={isGenerateTimeSheet}
          onClose={onCloseGenerateTimeSheet}
          menuButtons={timeSheetButtons}
        />
        <ButtonDropdown
          label="Profile"
          onClickButton={onClickProfile}
          isMenu
          menuEl={isProfile}
          onClose={onCloseProfile}
          menuButtons={profileButtons}
        />
      </Stack>
    </div>
  );
};

export default Header;