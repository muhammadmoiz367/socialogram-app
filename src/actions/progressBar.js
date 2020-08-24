import {SET_PROGRESS_BAR} from '../actionConstants'

export const setProgressBar = (isOpen) => (
{
    type: SET_PROGRESS_BAR,
    isOpen: isOpen
});