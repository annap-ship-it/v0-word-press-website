import { getPayload as getPayloadClient } from "payload"
import configPromise from "@payload-config"

export const getPayload = async () => {
  const payload = await getPayloadClient({
    config: configPromise,
  })
  return payload
}
