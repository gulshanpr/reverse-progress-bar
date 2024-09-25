import { NextResponse } from "next/server";
import { twitterClient } from "@/lib/twitterClient";

export async function POST(request: Request) {
  try {
    const { tweet } = await request.json();

    if (!twitterClient) {
      throw new Error("twitter client is not initialised");
    }

    const postOnTwitter = await twitterClient.v2.tweet(tweet);

    return NextResponse.json(
      { success: true, data: "Successfully made the tweet" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in route.ts", error);
    return NextResponse.json(
      { success: false, message: "Error" },
      { status: 500 }
    );
  }
}
