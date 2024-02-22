import {
    USER_ID_KEY,
    USER_NAME_KEY,
    USER_TOKEN_KEY,
} from '@constants/storage-keys';

export const getUserId = () => localStorage.getItem(USER_ID_KEY) as string;

export const getUserToken = () => localStorage.getItem(USER_TOKEN_KEY) as string;

export const getUserName = () => localStorage.getItem(USER_NAME_KEY) as string;
