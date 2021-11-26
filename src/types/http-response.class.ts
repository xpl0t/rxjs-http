import { cloneDeep } from 'lodash';
import {from, Observable} from 'rxjs';

export class HttpResponse {
    public headers: Headers;
    public ok: boolean;
    public redirected: boolean;
    public status: number;
    public statusText: string;
    public type: ResponseType;
    public url: string;

    constructor(private readonly response: Response) {
        this.headers = response.headers;
        this.ok = response.ok;
        this.redirected = response.redirected;
        this.status = response.status;
        this.statusText = response.statusText;
        this.type = response.type;
        this.url = response.url;
    }

    public arrayBuffer(): Observable<ArrayBuffer> {
        return from(this.response.arrayBuffer());
    }

    public blob(): Observable<Blob> {
        return from(this.response.blob());
    }

    public formData(): Observable<FormData> {
        return from(this.response.formData());
    }

    public json(): Observable<any> {
        return from(this.response.json());
    }

    public text(): Observable<string> {
        return from(this.response.text());
    }

    public clone(): HttpResponse {
        return cloneDeep(this);
    }
}
