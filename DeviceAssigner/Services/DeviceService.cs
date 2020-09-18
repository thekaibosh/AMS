using DeviceAssigner.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace DeviceAssigner.Services
{
    /// <summary>
    /// This is my device service. In a real app, it would implment an interface for the CRUD methods
    /// </summary>
    public class DeviceService
    {
        private readonly IMongoCollection<Device> _devices;

        public DeviceService(IDeviceDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var db = client.GetDatabase(settings.DatabaseName);

            _devices = db.GetCollection<Device>(settings.DevicesCollectionName);
        }

        public List<Device> Get() => _devices.Find(d => true).ToList();

        public Device Get(string id) => _devices.Find(d => d.Id == id).FirstOrDefault();

        public Device Create(Device device)
        {
            _devices.InsertOne(device);
            return device;
        }

        public void Update(string id, Device replacement) 
        {
            _devices.ReplaceOne(d => d.Id == id, replacement);
            //Invoke the worker service 
            WorkerService worker = new WorkerService(_devices, replacement);
            Thread workerThread = new Thread(new ThreadStart(worker.AssignDevice));
            workerThread.Start();
        }

        public void Remove(Device deviceDeletion)
        {
            _devices.DeleteOne(d => d.Id == deviceDeletion.Id);
        }

        public void Remove(string id)
        {
            _devices.DeleteOne(d => d.Id == id);
        }

        
    }
}