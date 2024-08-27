import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['auth'],
        summary: 'Recover user password by email',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          200: z.void(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        // Retorna OK mesmo se o usuário não existir
        return reply.status(200).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: user.id,
        },
      })

      // Envia email para o usuário com o link para recuperar a senha
      console.log('Recover password token:', code)
      return reply.status(200).send()
    },
  )
}
