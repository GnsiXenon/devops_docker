export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    var pokemon
    if (id !== null) {
      pokemon = await fetch(`http://api:7000/salle/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      pokemon = await fetch(`http://api:7000/salle`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  
    const salle = await pokemon.json()
  
    return Response.json({ salle })
  }