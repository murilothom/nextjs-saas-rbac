import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import githubIcon from '../../assets/github-icon.svg'
import { signInWithEmailAndPassword } from './actions'

export default function SignInPage() {
  return (
    <form action={signInWithEmailAndPassword} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        <Link
          className="text-xs font-medium text-foreground hover:underline"
          href="/auth/forgot-password"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign in with e-mail
      </Button>

      <Button variant="link" type="button" size="sm" className="w-full" asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />

      <Button
        type="button"
        variant="outline"
        className="flex w-full items-center justify-center gap-2"
      >
        <Image src={githubIcon} className="size-6 dark:invert" alt="" />
        Sign in with GitHub
      </Button>
    </form>
  )
}
