import { AxiosResponse } from 'axios';
import api from '../api';
import { UserInfo } from './types';

export const login = async (email: string, password: string):
    Promise<AxiosResponse<UserInfo>> => api.post('/user/login', { email, password });

export const signUp = async (name: string, email: string, password: string):
    Promise<AxiosResponse<{}>> => api.post('/user/register', { name, email, password });
