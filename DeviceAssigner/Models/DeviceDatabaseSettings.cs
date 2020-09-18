namespace DeviceAssigner.Models {
    public class DeviceDatabaseSettings : IDeviceDatabaseSettings
    {
        public string DevicesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}