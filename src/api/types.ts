export interface BaseApiParams<Body> {
    path?: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    body?: Body;
    query?: object;
}