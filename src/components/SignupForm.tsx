import type { FormEvent } from 'react'

interface SignupFormProps {
  message: string
  onSuccess: () => void
}

export function SignupForm({ message, onSuccess }: SignupFormProps) {
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onSuccess()
    event.currentTarget.reset()
  }
  return (
    <section className="signup" id="signup" aria-labelledby="signup-title">
      <h2 id="signup-title">Join the board</h2>
      <p>Get occasional notes about good finds.</p>
      <form onSubmit={submit}>
        <label>
          Your name
          <input name="name" required />
        </label>
        <label>
          Email address
          <input name="email" type="email" required />
        </label>
        <button type="submit">Try registration</button>
        <p role="status">{message}</p>
      </form>
    </section>
  )
}
