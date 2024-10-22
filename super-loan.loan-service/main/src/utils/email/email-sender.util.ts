import { transporter } from '@/utils/email/transporter.nodemailer';

export async function sendEmail(data: {
  from: {
    name: string;
  };
  to: {
    emailAddress: string[];
  };
  subject: string;
  text: string;
}): Promise<void> {
  const mailOptions = {
    from: {
      name: data.from.name,
      address: process.env.EMAIL_USERNAME || ''
    },
    to: data.to.emailAddress,
    subject: data.subject,
    text: data.text
  };

  const result = await transporter.sendMail(mailOptions);
  console.log('Email sent: ', result);
}
