export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
  const data = await res.json()

  return (
    <main>
      <h1>HireMate</h1>
      <p>API Status: {data.message}</p>
    </main>
  )
}