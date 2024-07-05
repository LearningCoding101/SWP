import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChartComponent = () => {
  const [clubId, setClubId] = useState(1); // default clubId
  const [data, setData] = useState({
    labels: ["CANCELED", "COMPLETED"],
    datasets: [
      {
        label: "Booking Status",
        data: [0, 0],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/booking/status-counts?clubId=${clubId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData({
          labels: ["CANCELED", "COMPLETED"],
          datasets: [
            {
              label: "Booking Status",
              data: [data.CANCELED, data.COMPLETED],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        });
      });
  }, [clubId]);

  return (
    <div className="App">
      <h1>Booking Status Pie Chart</h1>
      <div style={{ width: "300px", height: "300px" }}>
        <Pie data={data} width={300} height={300} />
      </div>
      <input
        type="number"
        value={clubId}
        onChange={(e) => setClubId(Number(e.target.value))}
        min="1"
        placeholder="Enter Club ID"
      />
    </div>
  );
};

export default PieChartComponent;
