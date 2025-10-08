import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    // Mock submission
    console.log("Contact form submitted:", data);
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    reset();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
              <Input placeholder="Your Name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Input placeholder="Your Email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <Textarea placeholder="Your Message" {...register("message")} />
              {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span>hello@neocitymysteries.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>123 NeoCity Ave, Virtual District, NC 12345</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;