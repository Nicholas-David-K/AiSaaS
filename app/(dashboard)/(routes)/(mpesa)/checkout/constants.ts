import * as z from 'zod';

export const formSchema = z.object({
    phoneNumber: z.string().min(1, {
        message: 'Phone number is required',
    }),
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    email: z.string().min(1, {
        message: 'Name is required',
    }),
});
