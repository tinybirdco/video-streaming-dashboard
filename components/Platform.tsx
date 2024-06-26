'use client'

import { DonutChart } from '@tinybirdco/charts'

const token = process.env.NEXT_PUBLIC_DASHBOARD_TOKEN;

export default function EventsByPlatform(params: {
  date_from?: string
  date_to?: string
}) {
  return (
    <DonutChart
      endpoint="https://api.tinybird.co/v0/pipes/get_events_by_platform.json"
      token={token}
      index="platform"
      categories={['event_count']}
      colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
      title="Events by Platform"
      showLegend={true}
      height="400px"
      params={params}
    />
  )
}