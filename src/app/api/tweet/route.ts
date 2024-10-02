export const dynamic = 'force-dynamic'; 

import { NextRequest, NextResponse } from "next/server";
import { twitterClient } from "@/lib/twitterClient";
import generateProgressBarImage from "@/lib/generateImg";

async function uploadImageToTwitter(imageBuffer: Buffer) {
  try {
    const mediaId = await twitterClient.v1.uploadMedia(imageBuffer, {
      type: "png",
    });
    return mediaId;
  } catch (error) {
    console.error("Error uploading media to Twitter:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const nowUTC: Date = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const nowIST: Date = new Date(nowUTC.getTime() + istOffset);

    const startOfYearIST: Date = new Date(nowIST.getFullYear(), 0, 0);
    const diff: number = nowIST.getTime() - startOfYearIST.getTime();
    const oneDay: number = 1000 * 60 * 60 * 24;
    const dayOfYear: number = Math.floor(diff / oneDay);
    const daysLeft: number = 365 - dayOfYear;
    const percentage = ((daysLeft / 365) * 100).toFixed(1);

    const tweetText = `GM,\n${daysLeft} days left — that\'s ${percentage}% of 2024. Let\'s keep going till we all WAGMI! 🚀\n @gulshanprr @lalitcap @snhpndy @JAIN_SAMYAK15`;

    const imgBuffer = generateProgressBarImage(daysLeft);

    if (!twitterClient) {
      throw new Error("Twitter client is not initialized");
    }

    const mediaId = await uploadImageToTwitter(imgBuffer);

    const postOnTwitter = await twitterClient.v2.tweet({
      text: tweetText,
      media: { media_ids: [mediaId] },
    });

    const headers = new Headers();
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");
    headers.set("Surrogate-Control", "no-store");

    return NextResponse.json(
      { success: true, tweet: postOnTwitter },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error in route.ts:", error);

    const headers = new Headers();
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");
    headers.set("Surrogate-Control", "no-store");

    return NextResponse.json({ success: false, error }, { status: 500, headers });
  }
}
