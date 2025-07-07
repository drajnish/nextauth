import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("reqBody: ", reqBody);
    const { uemail } = reqBody;

    // check if user exists
    const user = await User.findOne({ email: uemail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await sendEmail({ email: uemail, emailType: "RESET", userId: user._id });

    return NextResponse.json(
      {
        message: "An email is sent to your email Id to reset your password",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
