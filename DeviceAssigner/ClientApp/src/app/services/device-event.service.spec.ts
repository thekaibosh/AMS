import { TestBed } from '@angular/core/testing';

import { DeviceEventService } from './device-event.service';

describe('DeviceEventServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceEventService = TestBed.get(DeviceEventService);
    expect(service).toBeTruthy();
  });
});
