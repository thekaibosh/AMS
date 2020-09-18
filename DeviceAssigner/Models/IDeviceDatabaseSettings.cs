namespace DeviceAssigner.Models {
    public interface IDeviceDatabaseSettings 
    {
        string DevicesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}