// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

/*
 * Instance of the Prisma Client
 */
export const db = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
})

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error'],
})

/**
 * Set Redwood's logger's logLevels to print nothing.
 * @param db Previously retrieved PrismaClient
 */
export const removePrismaLogging = (db) => {
  handlePrismaLogging({
    db,
    logger,
    logLevels: [],
  })
}