'use client'

import { useState, useEffect } from 'react';

export default function Totals(params: { date_from?: string; date_to?: string }) {
  const dateFrom = params.date_from || '';
  const dateTo = params.date_to || '';
  const [totalEvents, setTotalEvents] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const containerStyle = {
    height: '150px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  };
  
  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#27F795', 
    margin: 0, 
  };
  
  const numberStyle = {
    fontFamily: 'monospace', 
    fontSize: '1.5rem',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '20px', 
  };

  useEffect(() => {
    const fetchTotalEvents = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_DASHBOARD_TOKEN;
        if (!token) {
          throw new Error('API token is missing');
        }

        const response = await fetch(
          `https://api.tinybird.co/v0/pipes/get_total_events.json?date_from=${dateFrom}&date_to=${dateTo}&token=${token}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const output = await response.json();
        const data = output.data[0];
        if (data) {
          setTotalEvents(data.events_total);
        } else {
          throw new Error('No results found');
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

    fetchTotalEvents();
  }, [dateFrom, dateTo]);

  if (loading) {
    return <div style={containerStyle}>Loading...</div>;
  }

  if (error) {
    return <div style={containerStyle}>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Total Events</h1>
      <p style={numberStyle}>{totalEvents !== null ? totalEvents : 'No data available'}</p>
    </div>
  );
};


