import { z } from 'zod';

const loginWithPhoneNumberSchema = z.object({
	phone_number: z.string().min(1, 'required'),
	password: z.string().min(1, 'required'),
});

const loginWithEmailSchema = z.object({
	email: z.string().min(1, 'required'),
	password: z.string().min(1, 'required'),
});

type Login = z.infer<typeof loginWithEmailSchema> | z.infer<typeof loginWithPhoneNumberSchema>;

export { loginWithEmailSchema, loginWithPhoneNumberSchema };
export type { Login };
