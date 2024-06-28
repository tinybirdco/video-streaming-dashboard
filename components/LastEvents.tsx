'use client'

import { Table } from '@tinybirdco/charts'

const token = process.env.NEXT_PUBLIC_DASHBOARD_TOKEN;

export default function LastEvents(params: {
  date_from?: string
  date_to?: string
}) {
  return (
    <Table
      endpoint="https://api.tinybird.co/v0/pipes/get_last_events.json"
      token = {token}
      categories={['event_id', 'platform', 'subscription', 'timestamp', 'user_id', 'utm_source', 'video_id', 'watch_duration']}
      title="Last Events"
      height="500px"
      params={params}
      padding="20px"
    />
  )
}