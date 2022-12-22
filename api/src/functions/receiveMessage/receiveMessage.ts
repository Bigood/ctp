import type { APIGatewayEvent, Context } from 'aws-lambda'
import {
  verifyEvent,
  VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/webhooks'

import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'
import { handleMessage, OPERATIONS_PER_HTTPMETHOD } from 'src/lib/relay'


/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked receiveMessage function')
  const relayInfo = { webhook: 'relay' }
  const webhookLogger = logger.child({ relayInfo })

  webhookLogger.trace('Invoked relayWebhook function')

  try {
    const options = {
      signatureHeader: 'X-CTP-Message-Signature',
    } as VerifyOptions

    verifyEvent('sha256Verifier', {
      event,
      secret: process.env.RELAY_CLIENT_SECRET,
      options,
    })

    webhookLogger.debug({ custom: event.headers }, 'Headers')

    const payload = JSON.parse(event.body)

    webhookLogger.debug({ custom: payload }, 'Body payload')

    //En fonction de la méthode HTTP
    const result = await handleMessage(OPERATIONS_PER_HTTPMETHOD[event.httpMethod], payload)
    webhookLogger.trace('Ended relayWebhook function')

    // Safely use the validated webhook payload
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: JSON.stringify({
        data: result,
      }),
    }
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      webhookLogger.warn('Unauthorized')

      return {
        statusCode: 401,
      }
    } else {
      webhookLogger.error({ custom: error }, "Erreur sur le webhook receiveMessage")

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      }
    }
  }
}
