import { API_URL } from "@/constants/api"
import { Api } from "@/utils/Api_func"

export async function Register<T>(data: T) {
  try {
    const response = await Api(
      `${API_URL.REGISTER_URL}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )

    return response

  } catch (error) {
    if(error instanceof Error) {
        throw new Error(error.message)
    }
    throw new Error("terjadi kesalahan diserver")
  }
}