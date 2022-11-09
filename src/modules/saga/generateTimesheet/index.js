import { takeEvery, call, select, put } from "redux-saga/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from '../../redux/common/selectors';
import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { getSelectedUserId, getUserId } from "../../redux/userInfo/selectors";
import { setGlobalTimesheetData } from '../../redux/generateTimesheet/actions';
import {getMonth, getYear} from '../../redux/applicationInfo/selectors'
import { setSnackbar } from '../../redux/applicationInfo/actions';


function* generateTimesheetWorker() {
    try {
        const token = yield select(getUserToken);
        const year = new Date().getFullYear();
        const user_id = yield select(getUserId);
        const month = new Date().getMonth() + 1;
        const body = yield call(createBody, { cmd: CMD.TIMESHEET, user_id, year, month });
        const headers = { token }
        const response = yield call(requestFunction, api.getGenerateTimeSheet, 'POST', headers, body);
        if(response.message === "timesheet approved") {
            yield put(setSnackbar({isOpen: true, text: `${month}.${year}: impossible to generate timesheet, timesheet had already been approved`, type: 'error'}));
        }
        else if (response.error) {
            yield put(setSnackbar({isOpen: true, text: `${month}.${year}: ` + response?.message, type: 'error'}));
        }else {
            yield put(setSnackbar({isOpen: true, text: "Timesheet has been generated", type: 'success'}));
        }
    } catch (error) {
        console.warn("generateTimesheetWorker ===>", error);
    }
};

function* generateTimesheetAllWorker() {
    try {
        const token = yield select(getUserToken);
        const year = yield select(getYear);
        const user_id = yield select(getSelectedUserId);
        const month = yield select(getMonth);
        const body = yield call(createBody, { cmd: CMD.TIMESHEETALL, user_id, year, month });
        const headers = { token };
        const response = yield call(requestFunction, api.getGenerateTimeSheet, 'POST', headers, body);
        if(response.message === "timesheet approved") {
            yield put(setSnackbar({isOpen: true, text: `${month}.${year}: impossible to generate timesheet, timesheet had already been approved`, type: 'error'}));
        }
        else if (response.error) {
            yield put(setSnackbar({isOpen: true, text: `${month}.${year}: ` + response?.message, type: 'error'}));
        }else {
            yield put(setSnackbar({isOpen: true, text: "Timesheet has been generated", type: 'success'}));
        }
    } catch (error) {
        console.warn("generateTimesheetAllWorker ===>", error);
    }
};

function* globalTimesheetWorker() {
    try {
        const token = yield select(getUserToken);
        const year = yield select(getYear);
        const month = yield select(getMonth);
        const body = yield call(createBody, { cmd: CMD.GLOBALTIMESHEET, year, month });
        const headers = { token };
        const response = yield call(requestFunction, api.globaltimesheet, 'POST', headers, body);
        yield put(setGlobalTimesheetData(response))
    } catch (error) {
        console.warn("globalTimesheetWorker ===>", error);
    }
};

function* generateWeeksWorker(action) {
    const year = action.payload.getFullYear()
    try {
        const token = yield select(getUserToken);
        const body = yield call(createBody, { cmd: CMD.GENERATEWEEKS, year });
        const headers = { token }
        const response = yield call(requestFunction, api.generateweek, 'POST', headers, body);
        if(!response.error) {
            yield put(setSnackbar({isOpen: true, text: `${response.message}`, type: 'success'}));
        }else {
            yield put(setSnackbar({isOpen: true, text: `${response.message}`, type: 'error'}));
        }
    } catch (error) {
        console.warn("generateWeeksWorker ===>", error);
    }
};


export function* generateTimesheetWatcher() {
    yield takeEvery(ActionTypes.SET_GENERATE_TIMESHEET, generateTimesheetWorker);
};

export function* generateTimesheetAllWatcher() {
    yield takeEvery(ActionTypes.SET_GENERATE_TIMESHEET_ALL, generateTimesheetAllWorker);
};

export function* globalTimesheetWatcher() {
    yield takeEvery(ActionTypes.SET_GLOBAL_TIMESHEET, globalTimesheetWorker);
};

export function* generateWeeksWatcher() {
    yield takeEvery(ActionTypes.SET_GENERATE_WEEKS, generateWeeksWorker);
};