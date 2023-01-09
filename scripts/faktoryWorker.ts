import faktory from 'faktory-worker'
import { logger } from 'api/src/lib/logger'
import { sendMessage, handleMessage } from 'api/src/lib/relay'

faktory.register('sendMessage', async (operation, entity, payload) => {
  logger.info("running sendMessage in background worker")
  await sendMessage(operation, entity, payload)
})

faktory.register('handleMessage', async (operation, message) => {
  logger.info("running handleMessage in background worker")
  await handleMessage(operation, message)
})

export default async ({ _args }) => {
  logger.error(process.env.FAKTORY_URL)
  const worker = await faktory
    .work({
      url: process.env.FAKTORY_URL,
      queues: [process.env.FAKTORY_QUEUE]
    })
    .catch((error) => {
      logger.error(`worker failed to start: ${error}`)
      process.exit(1)
    })

  worker.on('fail', ({ _job, error }) => {
    logger.error(`worker failed to start: ${error}`)
  })
}