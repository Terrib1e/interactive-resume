import { Request, Response } from 'express';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export const handleContactForm = async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    // TODO: Implement your email sending logic here
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', validatedData);

    res.status(200).json({
      success: true,
      message: 'Message received successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form data',
        errors: error.issues
      });
    }

    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    });
  }
};