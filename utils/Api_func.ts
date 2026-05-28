export async function Api(
  url: string,
  options?: RequestInit
) {
  const response = await fetch(url, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Request gagal")
  }

  return result
}