import { NextResponse } from "next/server";
import { LoginRequestValidation } from "../validations/login.validation";

import bcrypt from "bcryptjs";

import User from "@/models/user.model";
import { connectDB } from "@/database/mongodb";

export async function POST(request: Request) {
  const body = await request.json();

  const values = LoginRequestValidation.parse(body);

  try {
    await connectDB();
    const userFound = await User.findOne({ email: values.email });

    if (userFound) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const bcryptPassword = await bcrypt.hash(values.password, 12);

    const user = new User({
      email: values.email,
      password: bcryptPassword,
      fullname: values.fullname,
    });

    const savedUser = await user.save();

    console.log(savedUser);

    console.log(values);

    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}
