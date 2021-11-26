import fetch from 'node-fetch';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpErrorHandler } from "./helpers/http-error-handler.helper";
import { RequestMapper } from './mappers/request.mapper';
import { HttpRequestConfigurations } from './types/http-configurations.enum';
import { IHttpInterceptor } from './types/http-interceptor.interface';
import { HttpInterceptors } from './types/http-interceptors.class';
import { HttpRequestConfig } from './types/http-request-config.class';
import { HttpRequest } from './types/http-request.class';
import { HttpResponse } from './types/http-response.class';
import { IHttp } from './types/http.interface';

export class RxJSHttpClient implements IHttp {
    private readonly _reqInterceptors: HttpInterceptors<HttpRequest>;
    private readonly _resInterceptors: HttpInterceptors<HttpResponse>;

    constructor(reqInterceptors: IHttpInterceptor<HttpRequest>[] = [],
                resInterceptors: IHttpInterceptor<HttpResponse>[] = []) {
        this._reqInterceptors = new HttpInterceptors<HttpRequest>(reqInterceptors);
        this._resInterceptors = new HttpInterceptors<HttpResponse>(resInterceptors);
    }

    public get(url: string, config: Partial<HttpRequestConfig> = {}): Observable<HttpResponse> {
        const request = this._reqInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.GET);

        return from(fetch(url, configObject as any)).pipe(
            map(res => this._resInterceptors.execute(new HttpResponse(res))),
            tap(HttpErrorHandler.throwIfNotOkResponse)
        );
    }

    public post(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        const request = this._reqInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.POST);

        return from(fetch(url, configObject as any)).pipe(
            map((response) => this._resInterceptors.execute(new HttpResponse(response))),
            tap(HttpErrorHandler.throwIfNotOkResponse)
        );
    }

    public put(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        const request = this._reqInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.PUT);

        return from(fetch(url, configObject as any)).pipe(
            map((response) => this._resInterceptors.execute(new HttpResponse(response))),
            tap(HttpErrorHandler.throwIfNotOkResponse)
        );
    }

    public patch(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        const request = this._reqInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.PATCH);

        return from(fetch(url, configObject as any)).pipe(
            map((response) => this._resInterceptors.execute(new HttpResponse(response))),
            tap(HttpErrorHandler.throwIfNotOkResponse)
        );
    }

    public delete(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        const request = this._reqInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.DELETE);

        return from(fetch(url, configObject as any)).pipe(
            map((response) => this._resInterceptors.execute(new HttpResponse(response))),
            tap(HttpErrorHandler.throwIfNotOkResponse)
        );
    }
}
