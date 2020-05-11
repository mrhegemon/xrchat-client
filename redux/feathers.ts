import io from 'socket.io-client'
import getConfig from 'next/config'

import feathers from '@feathersjs/client'

const { publicRuntimeConfig } = getConfig()
const apiServer: string = publicRuntimeConfig.apiServer
const featherStoreKey: string = publicRuntimeConfig.featherStoreKey

// Socket.io is exposed as the `io` global.
const socket = io(apiServer)
// @feathersjs/client is exposed as the `feathers` global.
export const client = feathers()

client.configure(feathers.socketio(socket, { timeout: 10000 }))
client.configure(feathers.authentication({
  storageKey: featherStoreKey
}))
