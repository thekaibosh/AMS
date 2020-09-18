import { Component, OnInit } from '@angular/core';
import { Device } from 'src/models/device';
import { DeviceEventService } from '../services/device-event.service';
import { DeviceService } from '../services/device.service';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  devices: Device[];

  constructor(private deviceService: DeviceService, private deviceEventService: DeviceEventService) { }

  ngOnInit() {
    this.deviceService.getDevices().subscribe(devices => this.devices = devices);
    this.deviceService.getNewDevices().subscribe(device => this.devices.push(device));
    this.deviceEventService.topic().subscribe(device => {
      console.log(`received event for device ${device.id} with new status ${device.status}`);
      //TODO replace the device in the model
    });
  }

  onDelete(device: Device) {
    this.deviceService.deleteDevice(device.id).subscribe(_ => this.devices = this.devices.filter(d => d !== device));
  }

  onAssign(device: Device) {
    device.status = 'assigning'
    this.deviceService.updateDevice(device).subscribe(newDevice => console.log(device));
  }

}
