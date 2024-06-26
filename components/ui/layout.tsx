'use client'
import * as React from 'react'
import { useDateParams } from '@/lib/utils'
import { DateRangePicker } from './DateRangePicker'

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [dateParams, setDateParams] = useDateParams()

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#008060', 
    margin: 0, 
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8 max-w-[1400px] mx-auto">
      <h1 style={titleStyle}>Video Streaming Dashboard</h1>
      <div className="flex justify-end w-full">
        <DateRangePicker dateParams={dateParams} onChange={setDateParams} />
      </div>
      {children}
    </main>
  )
}

export function Row({ children }: Readonly<{ children?: React.ReactNode }>) {
  return <div className="flex gap-8 w-full">{children}</div>
}
