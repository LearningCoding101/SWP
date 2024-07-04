import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import api from '../../config/axios';

const RevenueChart = () => {
    const { clubId } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('month');
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/transactions/totalRevenueForClubOwner/${clubId}`, {
                    params: {
                        period,
                        month,
                        year,
                    },
                });
                const sortedData = response.data.sort((a, b) => {
                    let dateA, dateB;
                    if (period === 'month') {
                        const [yearA, monthA] = a.period.split('-');
                        const [yearB, monthB] = b.period.split('-');
                        dateA = new Date(yearA, monthA - 1);
                        dateB = new Date(yearB, monthB - 1);
                    } else if (period === 'year') {
                        const [yearA, monthA = '0'] = a.period.split('-');
                        const [yearB, monthB = '0'] = b.period.split('-');
                        dateA = new Date(yearA, monthA);
                        dateB = new Date(yearB, monthB);
                    }
                    return dateA - dateB;
                });
                const chartData = {
                    labels: sortedData.map((item) => item.period),
                    datasets: [
                        {
                            label: 'Total Revenue',
                            data: sortedData.map((item) => item.totalAmount),
                            fill: false,
                            backgroundColor: 'rgb(75,192,192)',
                            borderColor: 'rgba(75,192,192,0.2)',
                        },
                    ],
                };
                setData(chartData);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, [clubId, period, month, year]);

    return (
        <div>
            <h2>Revenue Chart</h2>
            <select onChange={(e) => setPeriod(e.target.value)}>
                <option value="month">Month</option>
                <option value="year">Year</option>
            </select>
            {period === 'month' && (
                <select onChange={(e) => setMonth(e.target.value)}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            )}
            <select onChange={(e) => setYear(e.target.value)}>
                {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
            <div style={{ width: '80%', height: '80%' }}>
                {loading ? <div>Loading...</div> : <Line data={data} />}
            </div>
        </div>
    );
};

export default RevenueChart;
