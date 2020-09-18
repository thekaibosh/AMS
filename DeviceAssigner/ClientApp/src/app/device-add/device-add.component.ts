import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device } from '../../models/device';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {
  model: Device = new Device();
  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    
  }

  

  onSubmit() {
    this.model.status = 'unassigned'; //all new devices are unassigned
    this.deviceService.addDevice(this.model).subscribe();
  }
}
