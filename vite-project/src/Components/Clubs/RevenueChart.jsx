import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../../config/axios";

const RevenueChart = ({ clubId }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("month");
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);

  useEffect(() => {
    let cancel = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/transactions/totalRevenueForClubOwner/${clubId}`,
          {
            params: {
              period,
              month,
              year,
            },
          }
        );
        if (cancel) return;
        const sortedData = response.data.sort((a, b) => {
          let dateA, dateB;
          if (period === "month") {
            const [yearA, monthA] = a.period.split("-");
            const [yearB, monthB] = b.period.split("-");
            dateA = new Date(yearA, monthA - 1);
            dateB = new Date(yearB, monthB - 1);
          } else if (period === "year") {
            const [yearA, monthA = "0"] = a.period.split("-");
            const [yearB, monthB = "0"] = b.period.split("-");
            dateA = new Date(yearA, monthA);
            dateB = new Date(yearB, monthB);
          }
          return dateA - dateB;
        });
        const chartData = {
          labels: sortedData.map((item) => {
            if (period === "month") {
              const [day, month, ____] = item.period.split("-");
              return `${day}-${month}`;
            } else if (period === "year") {
              const [month, __] = item.period.split("-");
              return month;
            } else {
              return item.period;
            }
          }),
          datasets: [
            {
              label: "Total Revenue",
              data: sortedData.map((item) => item.totalAmount),
              fill: false,
              backgroundColor: "rgb(75,192,192)",
              borderColor: "rgba(75,192,192,0.2)",
            },
          ],
        };

        setData(chartData);

        const [monthlyResponse, yearlyResponse] = await Promise.all([
          api.get(`/transactions/monthlyRevenue/${clubId}`, {
            params: {
              year,
              month,
            },
          }),
          api.get(`/transactions/yearlyRevenue/${clubId}`, {
            params: {
              year,
            },
          }),
        ]);


        setMonthlyRevenue(monthlyResponse.data);
        setYearlyRevenue(yearlyResponse.data);
      } catch (error) {
        if (!cancel) {
          console.error("Error fetching revenue data:", error);
        }
      }
      if (!cancel) {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancel = true;
    };
  }, [clubId, period, month, year]);

  const options = {
    hover: {
      mode: "nearest",
      intersect: true,
    },
    tooltips: {
      mode: "nearest",
      intersect: true,
      backgroundColor: "rgba(0, 0, 0, .03)",
      titleFontColor: "rgba(0, 0, 0, .5)",
      bodyFontColor: "rgba(0, 0, 0, .5)",
      footerFontColor: "rgba(0, 0, 0, .5)",
    },
    legend: {
      labels: {
        fontColor: "rgba(0, 0, 0, .5)",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: period === "month" ? 'Day' : 'Month'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'VND'
        }
      }
    }

  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="RevenueDisplay" style={{ gap: "5%", display: "flex", flexDirection: "row", width: "100%", borderRadius: "20px", marginTop: "20px", height: "10%" }}>
        <div className="RevenueDisplayPerMonth" style={{ flex: 1, boxShadow: "0px 10px 15px rgba(0.1, 0.1, 0.1, 0.1)", borderRadius: "10px", padding: "20px" }}>
          <h2>Revenue Per Month</h2>
          {loading ? <div>Loading...</div> : <div style={{ fontSize: "2em" }}>{monthlyRevenue}</div>}
        </div>
        <div className="RevenueDisplayPerYear" style={{ flex: 1, boxShadow: "0px 10px 15px rgba(0.1, 0.1, 0.1, 0.1)", borderRadius: "10px", padding: "20px" }}>
          <h2>Revenue Per Year</h2>
          {loading ? <div>Loading...</div> : <div style={{ fontSize: "2em" }}>{yearlyRevenue}</div>}
        </div>
      </div>

      <div className="RevenueChart" style={{ width: "100%", marginBottom: "5%", height: "40%", boxShadow: "0px 10px 15px rgba(0.1, 0.1, 0.1, 0.1)", borderRadius: "20px", padding: "20px" }}>
        <h2>Revenue Chart</h2>
        <select onChange={(e) => setPeriod(e.target.value)}>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        {period === "month" && (
          <select onChange={(e) => setMonth(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        )}
        <select onChange={(e) => setYear(e.target.value)}>
          {Array.from(
            { length: 11 },
            (_, i) => new Date().getFullYear() - i
          ).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <div style={{ width: "100%", height: "500px" }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </div>

    </div>

  );
};

export default RevenueChart;