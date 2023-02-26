import {BaseApiParams} from './types';

export class BaseApi {
    private baseUrl: string = process.env.REACT_APP_API_BASE_URL || '';

    private url: string;

    constructor(path: string) {
        const url = new URL(path, this.baseUrl);
        this.url = url.toString();
    }

    protected async fetch<Response = any, Body = any>(params: BaseApiParams<Body>): Promise<Response> {
        const requestUrl = `${this.url}/${params.path || ''}`;

        const response = await fetch(requestUrl, {
            method: params.method,
        });

        return response.json();
    }
}