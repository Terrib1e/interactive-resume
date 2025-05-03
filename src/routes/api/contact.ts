import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // TODO: Implement your email sending logic here
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', validatedData);

    return new Response(JSON.stringify({
      success: true,
      message: 'Message received successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid form data',
        errors: error.errors
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    console.error('Contact form error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'An error occurred while processing your request'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}