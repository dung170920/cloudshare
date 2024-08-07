import { EmailTemplate } from "@/components/email-template";
import { NextApiRequest } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextApiRequest) {
  const { email, fileName, url } = req.body;
  try {
    const { data, error } = await resend.emails.send({
      from: "cloudshare@resend.dev",
      to: [email],
      subject: "File shared with you",
      react: EmailTemplate({
        emailToSend: email || "",
        fileName: fileName || "",
        fileUrl: url || "",
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
