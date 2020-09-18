import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Device } from '../../models/device'


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private apiServer = "https://device-app:443/api/devices";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }
  private newDeviceSub = new Subject<Device>();

  constructor(private httpClient: HttpClient) { }

  getDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.apiServer)
    .pipe(
      catchError(this.handleError<Device[]>('getDevices', []))
    );
  }

  getDevice(id: string): Observable<Device> {
    return this.httpClient.get<Device>(`${this.apiServer}/${id}`)
    .pipe(
      catchError(this.handleError<Device>(`getDevice id = ${id}`))
    );
  }

  getNewDevices(): Observable<Device> {
    return this.newDeviceSub.asObservable();
  }

  addDevice(device: Device): Observable<Device> {
    return this.httpClient.post(this.apiServer, device, this.httpOptions).pipe(
      tap((newDevice: Device) => {
        console.log(`added new device with id ${newDevice.id}`);
        this.newDeviceSub.next(newDevice);
      }),
      catchError(this.handleError<Device>('adding a device'))
    );
  }

  deleteDevice(id: string): Observable<Device> {
    return this.httpClient.delete<Device>(`${this.apiServer}/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted device with id ${id}`)),
      catchError(this.handleError<Device>('delete device'))
    );
  }

  updateDevice(device: Device): Observable<any> {
    return this.httpClient.put(`${this.apiServer}/${device.id}`, device, this.httpOptions).pipe(
      tap(_ => console.log(`updated device with id ${device.id}`)),
      catchError(this.handleError<any>('updateDevice'))
    )
  }
  //todo better error handling
  //create a global error handler class
  private handleError<T>(operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error)

      return of(result as T);
    };
  }
}
