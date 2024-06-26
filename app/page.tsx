'use client'

import Totals from '@/components/Totals'
import Events from '@/components/Events'
import Platform from '@/components/Platform'
import LastEvents from '@/components/LastEvents'
import { Layout, Row } from '@/components/ui/layout'
import { useDateParams } from '@/lib/utils'
import { Suspense } from 'react'

function Home() {
  const [dateParams] = useDateParams()
  return (
    <Layout>
      <Totals {...dateParams} />
      <Row>
        <Events {...dateParams} />
        <Platform {...dateParams} />
      </Row>
      <Row>
        <LastEvents {...dateParams} />
      </Row>
    </Layout>
  )
}

export default function SuspendedHome() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  )
}
