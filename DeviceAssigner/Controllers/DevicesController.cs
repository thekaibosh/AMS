using DeviceAssigner.Models;
using DeviceAssigner.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DeviceAssigner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly DeviceService _deviceService;

        public DevicesController(DeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet]
        public ActionResult<List<Device>> Get() => _deviceService.Get();

        [HttpGet("{id:length(24)}", Name = "GetDevice")]
        public ActionResult<Device> Get(string id) 
        {
            var device = _deviceService.Get(id);

            if (device == null)
            {
                return NotFound();
            } 
            return device;
        }

        [HttpPost]
        public ActionResult<Device> Create(Device device)
        {
            //TODO decorate the model with validations, then validate the model
            _deviceService.Create(device);

            return CreatedAtRoute("GetDevice", new { id = device.Id.ToString()}, device);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Device replacement) 
        {
            var oldDevice = _deviceService.Get(id);

            if (oldDevice == null)
            {
                return NotFound();
            }

            _deviceService.Update(id, replacement);

            //TODO decide appropriate response. If the status update is a long operation
            //we could return accepted since the REST spec says to return accepted if the request
            //was processed but not completed (since we're relying on the message bus to tell us
            //when this id complete).
            //If none of the above applies, we should just return no content, per the REST spec
            return Accepted();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var device = _deviceService.Get(id);

            if (device == null)
            {
                return NotFound();
            }

            _deviceService.Remove(device.Id);

            return NoContent();
        }


        
    }
}