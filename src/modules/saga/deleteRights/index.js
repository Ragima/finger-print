import { takeEvery, call, select, put } from "redux-saga/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from '../../redux/common/selectors';
import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { setSnackbar } from '../../redux/applicationInfo/actions';


function* delRightsWorker({ payload }) {
    try {
        const token = yield select(getUserToken);
        const body = yield call(createBody, { cmd: CMD.DELRIGHT4ROLE, "acc_list_control": payload });
        const headers = { token }
        const response = yield call(requestFunction, api.deleteRight, 'POST', headers, body);
        if (response.error) {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
        else {
            yield put(setSnackbar({ isOpen: true, text: "Rights has been deleted", type: 'success' }));
        }
    } catch (error) {
        console.warn("addRightsWorker ===>", error);
    }
};

export function* delRightsWatcher () {
    yield takeEvery(ActionTypes.SET_DEL_RIGHTS, delRightsWorker);
};