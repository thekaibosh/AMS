import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from 'src/models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceEventService {

  private endpoint: string;
  constructor(private mqttService: MqttService) { 
    this.endpoint = 'device';
  }

  topic(): Observable<Device> {
    const topicName = `${this.endpoint}`;
    return this.mqttService.observe(topicName).pipe(
      map((message: IMqttMessage) => {
        const payload = message.payload.toString();
        const device = JSON.parse(payload) as Device;
        return device;
      })
    );
  }
}
