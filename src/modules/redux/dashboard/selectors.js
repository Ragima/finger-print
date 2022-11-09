export const getDashBoardData = state => state?.dashboardReducer?.data;
export const getIsDrawer = state => state?.dashboardReducer?.isDrawer;
export const getDrawerType = state => state?.dashboardReducer?.drawerType;
export const getMaxLength = state => state?.dashboardReducer?.maxLength;
export const getTotalMonth = state => state.dashboardReducer.totalMonth;
export const getHistory = state => state.dashboardReducer.history;
export const getVacationDays = state => state.dashboardReducer.vacationDays;
export const getSickLeaveDays = state => state.dashboardReducer.sickLeaveDays;
export const getWorkDays = state => state.dashboardReducer.workDays;
export const getTargetHours = state => state.dashboardReducer.targetHours;
export const getTargetWorkDays = state => state.dashboardReducer.totalWorkDay;
export const getRemainHoursTotal = state => state.dashboardReducer.remainHoursTotal;
export const getRemainHoursInDay = state => state.dashboardReducer.remainHoursInDay;
export const getRemainDays = state => state.dashboardReducer.remainDays;