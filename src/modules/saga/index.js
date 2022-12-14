
import { spawn } from "@redux-saga/core/effects";
import { approveDeclineTimeWatcher, getTimesWatcher } from "./approveTime";
import { authorizationWatcher } from "./authorization";
import { generateTimesheetWatcher, generateTimesheetAllWatcher, globalTimesheetWatcher, generateWeeksWatcher } from "./generateTimesheet"
import { dashboardAllWatcher, dashboardWatcher, getSelectUserWatcher, workdayHoursWatcher } from "./dashboard";
import { editUserWatcher, logOutWatcher } from "./profile";
import { approveTimesheetWatcher, timesheetListWatcher, timesheetAllListWatcher, exportTimesheetWatcher } from "./timesheetList";
import { sendTimeWatcher, deleteTimeWatcher, sendVacationSickLeaveWatcher } from "./time";
import { showRecHistoryWatcher } from "./showRecHistory";
import { downloadUsersWatcher } from "./downloadUsers";
import { updateUserTerminalWatcher } from "./updateUserTerminal";
import { addUserWatcher } from "./adduser";
import { connectUserToLoginWatcher } from "./connectUser2Login";
import { changePasswordWatcher } from "./changePassword";
import { deleteUserWatcher } from "./deleteUser";
import { addRightsWatcher } from "./addRights";
import { delRightsWatcher } from "./deleteRights";
import { sendShortHolidayWatcher } from "./addShortHoliday";


export function* rootSaga() {
    yield spawn(logOutWatcher);
    yield spawn(addUserWatcher);
    yield spawn(getTimesWatcher);
    yield spawn(editUserWatcher);
    yield spawn(sendTimeWatcher);
    yield spawn(dashboardWatcher);
    yield spawn(deleteTimeWatcher);
    yield spawn(workdayHoursWatcher);
    yield spawn(dashboardAllWatcher);
    yield spawn(downloadUsersWatcher);
    yield spawn(getSelectUserWatcher);
    yield spawn(authorizationWatcher);
    yield spawn(timesheetListWatcher);
    yield spawn(showRecHistoryWatcher);
    yield spawn(showRecHistoryWatcher);
    yield spawn(globalTimesheetWatcher);
    yield spawn(timesheetAllListWatcher);
    yield spawn(approveTimesheetWatcher);
    yield spawn(generateTimesheetWatcher);
    yield spawn(updateUserTerminalWatcher);
    yield spawn(approveDeclineTimeWatcher);
    yield spawn(generateTimesheetAllWatcher);
    yield spawn(sendVacationSickLeaveWatcher);
    yield spawn(connectUserToLoginWatcher);
    yield spawn(changePasswordWatcher);
    yield spawn(exportTimesheetWatcher);
    yield spawn(deleteUserWatcher);
    yield spawn(addRightsWatcher);
    yield spawn(delRightsWatcher);
    yield spawn(sendShortHolidayWatcher);
    yield spawn(generateWeeksWatcher);
};