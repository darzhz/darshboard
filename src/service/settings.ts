// services/userService.ts
import axiosInstance from '@/lib/axiosInstance';
import { widgetLayout } from '@/types/widgets';
import { AxiosResponse } from 'axios';

interface UserData {
  id: string;
  name: string;
  email: string;
}

export const getUserData = async (): Promise<UserData> => {
  const res = await axiosInstance.get<UserData>('/user/me');
  return res.data;
};
export const getLayout = async():Promise<AxiosResponse> => {
    const userid = sessionStorage.getItem('userId');
    const res = await axiosInstance.get<widgetLayout|null>(`/layout/${userid}`);
    return res;
}

export const upsertLayout = async (layout:widgetLayout): Promise<AxiosResponse> => {
    const userid = sessionStorage.getItem('userId');
    const response = await axiosInstance.post<widgetLayout>('/layout/2', {layout:layout,userid});
    return response;
}