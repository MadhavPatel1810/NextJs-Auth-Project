import { connectDB, disconnectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromData } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //extract data from token
    const userId = await getDataFromData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    //Check if there is no user
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
