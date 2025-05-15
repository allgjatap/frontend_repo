import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

export const useLoginClientSchema = () => {
    const schema =z.object({
        email: z.string().nonempty('Email is required').email('Invalid email address'),
        password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
      
    })
  return (
    zodResolver(schema)
  )
}


