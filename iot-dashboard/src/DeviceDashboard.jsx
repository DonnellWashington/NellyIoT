import { useEffect, useState } from "react";
import axios from "axios";

export default function DeviceDashboard() {
  const [devices, setDevices] = useState({});

    // Fetch device data from backend
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const res = await axios.get("http://3.21.159.185:5000/devices");
                setDevices(res.data);
            } catch (err) {
                console.error("Error fetching device data:", err);
            }
        };

        fetchDevices(); // Initial fetch

        const interval = setInterval(fetchDevices, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount

    }, []);

  return (
    <div style={{ padding: "20px" }}>
        <h1>IoT Dashboard</h1>
        {Object.keys(devices).length === 0 ? (
            <p>Loading device data...</p>
        ) : (
            Object.entries(devices).map(([id, info]) => (
                <div 
                    key={id}
                    style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
          >
            <h2>{id}</h2>
            <p>Status: {info.status}</p>
            <p>Temp: {info.temp}</p>
            <p>Last Seen: {info.lastSeen}</p>
          </div>
        ))
      )}
    </div>
  );
}