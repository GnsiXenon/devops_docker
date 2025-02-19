export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  var res
  if (id !== null) {
     res = await fetch(`http://localhost:7000/score/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } else {
    res = await fetch(`http://localhost:7000/score`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const score = await res.json()

  return Response.json({ score })
}