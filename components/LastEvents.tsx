import { useState, useEffect } from 'react';

interface EventData {
  event_id: string;
  platform: string;
  subscription: string;
  timestamp: string;
  user_id: string;
  utm_source: string;
  video_id: string;
  watch_duration: number;
}

export default function LastEvents (params: { date_from?: string; date_to?: string }) {
  const dateFrom = params.date_from || '';
  const dateTo = params.date_to || '';
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tableStyle = {
    width: '100%',
    margin: '20px 0',
    fontSize: '1em',
    backgroundColor: '#ffffff', 
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
    fontFamily: 'monospace',
  };

  const thStyle = {
    padding: '12px 15px',
    border: '1px solid #dddddd', 
    backgroundColor: '#f4f4f4', 
    fontWeight: 'bold', 
  };

  const tdStyle = {
    padding: '12px 15px',
    border: '1px solid #dddddd',
  };

  const evenRowStyle = {
    backgroundColor: '#f9f9f9', 
  };

  const hoverRowStyle = {
    backgroundColor: '#f1f1f1', 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_DASHBOARD_TOKEN;
        if (!token) {
          throw new Error('API token is missing');
        }

        const response = await fetch(
          `https://api.tinybird.co/v0/pipes/get_last_events.json?date_from=${dateFrom}&date_to=${dateTo}&token=${token}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const output = await response.json();
        const data = output.data;
        if (data && data.length > 0) {
          setData(data);
        } else {
          throw new Error('No data found');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateFrom, dateTo]);

  if (loading) {
    return <div style={tableStyle}>Loading...</div>;
  }

  if (error) {
    return <div style={tableStyle}>Error: {error}</div>;
  }

  return (
    <div style={tableStyle}>
      <table>
        <thead>
          <tr>
            <th style={thStyle}>Event ID</th>
            <th style={thStyle}>Platform</th>
            <th style={thStyle}>Subscription</th>
            <th style={thStyle}>Timestamp</th>
            <th style={thStyle}>User ID</th>
            <th style={thStyle}>UTM Source</th>
            <th style={thStyle}>Video ID</th>
            <th style={thStyle}>Watch Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event) => (
            <tr key={event.event_id}>
              <td style={tdStyle}>{event.event_id}</td>
              <td style={tdStyle}>{event.platform}</td>
              <td style={tdStyle}>{event.subscription}</td>
              <td style={tdStyle}>{event.timestamp}</td>
              <td style={tdStyle}>{event.user_id}</td>
              <td style={tdStyle}>{event.utm_source}</td>
              <td style={tdStyle}>{event.video_id}</td>
              <td style={tdStyle}>{event.watch_duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};