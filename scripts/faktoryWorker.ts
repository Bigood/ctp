import faktory from 'faktory-worker'

import {logger} from 'api/src/lib/logger'
import { createDiasporaProfile, initDiaspora, loginDiaspora, updateDiasporaProfile } from 'api/src/services/diaspora/diaspora'

faktory.register('init', async (taskArgs) => {
  logger.info("running init in background worker")
  await initDiaspora(taskArgs)
})

faktory.register('postLogin', async (taskArgs) => {
  logger.info("running postLogin in background worker")
  await loginDiaspora(taskArgs)
})

faktory.register('postSignup', async (taskArgs) => {
  logger.info("running postSignup in background worker")
  await createDiasporaProfile(taskArgs)
})

faktory.register('postEditUser', async (taskArgs) => {
  logger.info("running postEditUser in background worker")
  await updateDiasporaProfile(taskArgs)
})

export default async ({ _args }) => {
  logger.error(process.env.FAKTORY_URL)
  const worker = await faktory
    .work({
      url: process.env.FAKTORY_URL
    })
    .catch((error) => {
      logger.error(`worker failed to start: ${error}`)
      process.exit(1)
    })

  worker.on('fail', ({ _job, error }) => {
    logger.error(`worker failed to start: ${error}`)
  })
}