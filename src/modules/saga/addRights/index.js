import { takeEvery, call, select, put } from "redux-saga/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from '../../redux/common/selectors';
import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { setSnackbar } from '../../redux/applicationInfo/actions';


function* addRightsWorker({ payload }) {
    try {
        const token = yield select(getUserToken);
        const body = yield call(createBody, { cmd: CMD.ADDRIGHTS2ROLE, "acc_list_control": payload });
        const headers = { token }
        const response = yield call(requestFunction, api.addRights, 'POST', headers, body);
        if (response.error) {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
        else {
            yield put(setSnackbar({ isOpen: true, text: "Rights has been added", type: 'success' }));
        }
    } catch (error) {
        console.warn("addRightsWorker ===>", error);
    }
};

export function* addRightsWatcher () {
    yield takeEvery(ActionTypes.SET_ADD_RIGHTS, addRightsWorker);
};