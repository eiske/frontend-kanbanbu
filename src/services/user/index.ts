import { AxiosResponse } from "axios";
import api from "../api";
import { UserInfo } from "./types";

export const login = async (email: string, password: string):
    Promise<AxiosResponse<UserInfo>> => api.post("/user/login", {email, password})
