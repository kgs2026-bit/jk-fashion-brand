import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'

export async function POST(request: NextRequest) {
  try {
    console.log('=== API /orders POST STARTED ===')

    // Get request body
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))

    // Validate required fields
    const {
      orderId,
      customer,
      items,
      totals,
      paymentMethod,
      timestamp = new Date().toISOString(),
    } = body

    if (!orderId || !customer || !items || !totals || !paymentMethod) {
      console.error('Missing required fields:', { orderId, customer, items, totals, paymentMethod })
      return NextResponse.json(
        { error: 'Missing required fields', details: { orderId, customer, items, totals, paymentMethod } },
        { status: 400 }
      )
    }

    // Validate customer fields
    const requiredCustomerFields = ['email', 'firstName', 'lastName', 'address', 'city', 'country', 'postalCode']
    const missingFields = requiredCustomerFields.filter(field => !customer[field])
    if (missingFields.length > 0) {
      console.error('Missing required customer fields:', missingFields)
      return NextResponse.json(
        { error: 'Missing required customer fields', missing: missingFields },
        { status: 400 }
      )
    }

    // Get Airtable credentials from environment
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    console.log('Airtable config:', { hasApiKey: !!airtableApiKey, hasBaseId: !!airtableBaseId, baseId: airtableBaseId })

    if (!airtableApiKey || !airtableBaseId) {
      console.error('Airtable credentials not configured')
      return NextResponse.json(
        { error: 'Configuration error', message: 'Airtable credentials missing' },
        { status: 500 }
      )
    }

    // Map checkout data to Airtable fields
    const airtableRecord = {
      fields: {
        'Order ID': orderId,
        Timestamp: timestamp,
        'Customer Email': customer.email,
        'First Name': customer.firstName,
        'Last Name': customer.lastName,
        'Address': customer.address,
        'City': customer.city,
        'Country': customer.country,
        'Postal Code': customer.postalCode,
        'Phone': customer.phone || '',
        // Store items as JSON string (Airtable multiple line text field)
        Items: JSON.stringify(items, null, 2),
        Subtotal: totals.subtotal,
        Shipping: totals.shipping,
        Tax: totals.tax,
        Total: totals.total,
        'Payment Method': paymentMethod === 'card' ? 'Card' : 'PayPal',
        Status: 'paid',
      },
    }

    console.log('Sending to Airtable:', JSON.stringify(airtableRecord, null, 2))

    // Create record in Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/Orders`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: airtableRecord.fields }),
      }
    )

    console.log('Airtable response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }))
      console.error('Airtable API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to save order', status: response.status, details: errorData },
        { status: 500 }
      )
    }

    const airtableData = await response.json()
    console.log('Airtable response data:', airtableData)

    return NextResponse.json({
      success: true,
      orderId,
      recordId: airtableData.id,
      message: 'Order saved successfully',
    })
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
