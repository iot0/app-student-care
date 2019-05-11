import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { switchMap, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }
  
  sync(ip:string){
    return timer(0,5000)
    .pipe(
      switchMap(x => {
        return this.http.get(`http://${ip}/status`);
      }),
      share()
    )
  }

  send(data,ip){
    return this.http.post(`http://${ip}/updateEventAlert`,data);
  }
}
