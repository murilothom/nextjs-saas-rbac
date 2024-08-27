import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from './routes/_errors/bad-request-error'
import { ConflictError } from './routes/_errors/conflict-error'
import { ForbiddenError } from './routes/_errors/forbidden-error'
import { NotFoundError } from './routes/_errors/not-found-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  if (error instanceof ForbiddenError) {
    return reply.status(403).send({
      message: error.message,
    })
  }

  if (error instanceof ConflictError) {
    return reply.status(409).send({
      message: error.message,
    })
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      message: error.message,
    })
  }

  console.error(error)

  // send error to some observability platform

  return reply.status(500).send({
    message: 'Internal server error.',
  })
}
