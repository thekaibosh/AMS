import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: "broker",
  port: 1883,
  protocol: "wss",
  path: ''
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DeviceListComponent,
    DeviceAddComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
