import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HttpService{
    constructor(private http:HttpClient){}

    getmainData():Observable<any>{
        const url = 'http://localhost:4000/api/v1/main/Mainget';
        return this.http.get(url);
    }
    postmaintData(body:any):Observable<any>{
        const url = 'http://localhost:4000/api/v1/main/Mainpost';
        return this.http.post(url,body);
    }
    REData(body:any):Observable<any>{
        const url = 'http://localhost:4000/api/v1/re/Rpost';
        return this.http.post(url,body);
    }
    
    RGData():Observable<any>{
        const url = 'http://localhost:4000/api/v1/re/Rget';
        return this.http.get(url);
    }

        // .................................................................................................................

        
    getphotoData():Observable<any>{
        const url = 'http://localhost:4000/api/v1/verify/get';
        return this.http.get(url);
    }
    getphotoID():Observable<any>{
        const url = 'http://localhost:4000/api/v1/verify/get/:id';
        return this.http.get(url);
    }

    uploadAvatar(data:FormData): Observable<any> {
        
    
        return this.http.post<any>('http://localhost:4000/api/v1/verify/pt', data);
      }
    // .................................................................................................................



    getfinanceData():Observable<any>{
        const url = 'http://localhost:4000/api/v1/fi/fget';
        return this.http.get(url);
    }


    onpostfinance(body:any){
        const url = 'http://localhost:4000/api/v1/fi/data';
        return this.http.post(url,body)
    }
    // .................................................................................................................
    
    getiotData():Observable<any>{
        const url = 'http://localhost:4000/api/v1/iot/iotget';
        return this.http.get(url);
    }


    onpostiot(body:any){
        const url = 'http://localhost:4000/api/v1/iot/iotpost';
        return this.http.post(url,body)
    }
    // .................................................................................................................


    onUpdate(body:any,userId: string,){
        const url = `http://localhost:8000/api/v1/users/sos/${userId} `;
        return this.http.put(url,body)
    }
    onDelete(body:any,userId: string,){
        const url = `http://localhost:8000/api/v1/users/del/${userId}`;
        return this.http.delete(url,body)
    }
    onmap(){
        const url = 'http://139.84.165.121:8000/api/location/all/';
        return this.http.get(url)
    }
   

}