using System;
using System.Text;
using System.Threading;
using DeviceAssigner.Models;
using MongoDB.Driver;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace DeviceAssigner.Services
{
    public class WorkerService
    {
        private readonly IMongoCollection<Device> _devices;
        private Device _device;
        public WorkerService(IMongoCollection<Device> devices, Device device)
        {
            _devices = devices;
            _device = device;
        }

        public void AssignDevice()
        {
            //Do some work to assign the device
            var random = new Random();
            var workTime = random.Next(5) * 1000;
            Thread.Sleep(workTime);
            var factory = new ConnectionFactory() { HostName = "broker" };
            _device.Status = "assigned";
            //persist the "work" to the database
            _devices.ReplaceOne(d => d.Id == _device.Id, _device);
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "device", durable: false, exclusive: false, autoDelete: false, arguments: null);
                    
                    var jsonDevice = JsonConvert.SerializeObject(_device);
                    var messageBody = Encoding.UTF8.GetBytes(jsonDevice);

                    channel.BasicPublish(exchange: "", routingKey: "device", basicProperties: null, body: messageBody);

                    Console.WriteLine($"sent message {jsonDevice} to device queue");
                }
            }
        }
    }
}