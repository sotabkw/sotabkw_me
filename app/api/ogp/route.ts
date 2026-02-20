import { NextRequest, NextResponse } from 'next/server'
import { fetchOgp } from '@/lib/ogp'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'url parameter is required' }, { status: 400 })
  }

  try {
    const ogpData = await fetchOgp(url)
    return NextResponse.json(ogpData, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch OGP data' },
      { status: 500 }
    )
  }
}
