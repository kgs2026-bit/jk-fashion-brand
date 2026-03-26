import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate customer fields
    const requiredCustomerFields = ['email', 'firstName', 'lastName', 'address', 'city', 'country', 'postalCode']
    if (!requiredCustomerFields.every(field => customer[field])) {
      return NextResponse.json(
        { error: 'Missing required customer fields' },
        { status: 400 }
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

    // Get Airtable credentials from environment
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    if (!airtableApiKey || !airtableBaseId) {
      console.error('Airtable credentials not configured')
      return NextResponse.json(
        { error: 'Configuration error', orderId },
        { status: 500 }
      )
    }

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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Airtable API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to save order', details: errorData },
        { status: 500 }
      )
    }

    const airtableData = await response.json()

    return NextResponse.json({
      success: true,
      orderId,
      recordId: airtableData.id,
      message: 'Order saved successfully',
    })
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
