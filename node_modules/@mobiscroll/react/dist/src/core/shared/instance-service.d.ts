import { Observable } from '../util/observable';
export declare class InstanceServiceBase {
    onInstanceReady: Observable<any>;
    onComponentChange: Observable<any>;
    protected _inst: any;
    instance: any;
}
