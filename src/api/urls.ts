import axios from 'axios';
import { type Url, type PaginatedResponse } from '../types/url';

const api = axios.create({
    baseURL: process.env.API_URL,
});

export const getUrls = async (page: number = 1): Promise<PaginatedResponse<Url>> => {
    const response = await api.get('/urls', { params: { page } });
    return response.data;
};

export const createUrl = async (original_url: string): Promise<Url> => {
    const response = await api.post('/urls', { original_url });
    const data = response.data;
    return data && data.data ? data.data : data;
};

export const deleteUrl = async (id: number): Promise<void> => {
    await api.delete(`/urls/${id}`);
};

export const resolveCode = async (code: string): Promise<{ original_url: string }> => {
    const response = await api.get(`/resolve/${code}`);
    return response.data;
};
