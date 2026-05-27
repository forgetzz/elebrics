"server only"

import { PinataSDK } from "pinata"

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_KEY}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`
})