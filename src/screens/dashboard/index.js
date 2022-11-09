import "./index.css";
import { CMD } from "../../services/cmd";
import { Drawer } from "@mui/material";
import Header from "../../components/header";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTimeForm from "../../components/addTimeForm";
import EditUserForm from "../../components/editUserForm";
import ApproveTimeForm from "../../components/approveTime";
import DashboardTable from "../../components/dashboardTable";
import DashboardHeader from "../../components/dashBoardHeader";
import { setDrawer } from "../../modules/redux/dashboard/action";
import { getRolesCMD } from "../../modules/redux/common/selectors";
import {
  getMonth,
  getYear,
} from "../../modules/redux/applicationInfo/selectors";
import {
  getChangePassword,
  getSelectedUserId,
  getSelectUserList,
  getUserList,
} from "../../modules/redux/userInfo/selectors";
import {
  setUserLogin,
  setTimeSheetAllData,
  setTimeSheetData,
} from "../../modules/saga/dashboard/action";
import {
  getDashBoardData,
  getDrawerType,
  getIsDrawer,
  getMaxLength,
  getTotalMonth,
  getHistory,
} from "../../modules/redux/dashboard/selectors";
import GlobalTimeSheetList from "../../components/globalTimesheet";
import TimesheetStatuses from "../../components/timesheetList";
import DeleteTimeForm from "../../components/deleteTimeForm";
import {
  getStatuses,
  getApprovedStatuses,
} from "../../modules/redux/applicationInfo/selectors";
import AddVacationForm from "../../components/addVacation";
import AddSickLeaveForm from "../../components/addSickLeave";
import ChangeUserNameForm from "../../components/changeUserNameForm";
import AddUser from "../../components/addUser";
import ConnectForm from "../../components/connectUser2Login";
import ChangePassword from "../../components/changePassword";
import DeleteUserForm from "../../components/deleteUser";
import AddRightsForm from "../../components/addRights";
import DeleteRightsForm from "../../components/deleteRights";
import AddShortHoliday from "../../components/addShortHoliday";
import GenerateYear from "../../components/generateYear";


const Dashboard = () => {
  const dispatch = useDispatch();
  const rolesCMD = useSelector(getRolesCMD);
  const isDrawer = useSelector(getIsDrawer);
  const drawerType = useSelector(getDrawerType);
  const dashboardData = useSelector(getDashBoardData);
  const maxLength = useSelector(getMaxLength);
  const userList = useSelector(getUserList);
  const totalMonth = useSelector(getTotalMonth);
  const year = useSelector(getYear);
  const month = useSelector(getMonth);
  const userId = useSelector(getSelectedUserId);
  const history = useSelector(getHistory);
  const selectUserList = useSelector(getSelectUserList);
  const mustChangePassword = useSelector(getChangePassword);
  useEffect(() => {
    if(mustChangePassword){
      dispatch(setDrawer({ isDrawer: true, drawerType: "CHANGE_PASSWORD" }));
    }
    if (rolesCMD.includes(CMD.VIEWTIMEALL)) {
      dispatch(setTimeSheetAllData());
    } else if (rolesCMD.includes(CMD.VIEWTIME)) {
      dispatch(setTimeSheetData());
    }
    if (rolesCMD.includes(CMD.GETUSER)) {
      dispatch(setUserLogin());
    }
  }, [year, month, userId, mustChangePassword]);

  const contents = {
    approveTime: <ApproveTimeForm />,
    addTime: <AddTimeForm userList={userList} />,
    DELETE_TIME: <DeleteTimeForm />,
    addVacation: <AddVacationForm userList={userList} />,
    addSickLeave: <AddSickLeaveForm userList={userList} />,
    addShortHoliday: <AddShortHoliday/>,
    globalTimeSheet: <GlobalTimeSheetList />,
    timeSheetStatuses: <TimesheetStatuses />,
    EDIT_USER: <EditUserForm userList={userList} />,
    updateUserTerminal: <ChangeUserNameForm selectUserList={selectUserList} />,
    ADD_USER: <AddUser />,
    CONNECT: <ConnectForm selectUserList={selectUserList} userList={userList}/>,
    CHANGE_PASSWORD: <ChangePassword/>,
    DELUSER: <DeleteUserForm userList={userList}/>,
    ADDRIGHTS2ROLE: <AddRightsForm />,
    DELRIGHT4ROLE: <DeleteRightsForm />,
    GENERATEYEAR: <GenerateYear />
  };

  const drawerContent = useMemo(() => {
    return contents[drawerType];
  }, [drawerType, userList, selectUserList]);

  const onCloseDrawer = () => {
    if(mustChangePassword == 0){
    dispatch(setDrawer({ isDrawer: false, drawerType: "" }));
    }
  };

  return (
    <div className="dashboardContainer">
      <Header />
      <DashboardHeader {...{ userList, totalMonth }} />
      <Drawer open={isDrawer} onClose={onCloseDrawer}>
        {drawerContent}
      </Drawer>
      <DashboardTable {...{ maxLength, dashboardData, history }} />
    </div>
  );
};

export default Dashboard;