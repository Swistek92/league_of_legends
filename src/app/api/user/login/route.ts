import { NextResponse } from "next/server";
import connectMongoDb from "../../../../../helpers/connectMongoDB";
import { UserDocument } from "../../../../../models/user.model";
import UserService from "../../../../../service/user.service";

export const maxDuration = 5;

export async function POST(req: Request, res: Response) {
  console.log("im in login ");
  await connectMongoDb();
  const body: UserDocument = await req.json();
  try {
    const user = await UserService.findUser({ email: body.email });
    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { msg: "smth went wrong user allredy exit" },
      { status: 404 }
    );
  }

  let newUser;

  try {
    newUser = await UserService.addUser(body);
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { msg: "smth went wrong cant create new user" },
      { status: 404 }
    );
  }
}
