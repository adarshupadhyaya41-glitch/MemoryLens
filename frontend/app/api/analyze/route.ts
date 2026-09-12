import { NextResponse } from "next/server";
import { pipeline } from "@huggingface/transformers";

let classifier: any = null;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    if (!classifier) {
      classifier = await pipeline(
        "image-classification",
        "Xenova/vit-base-patch16-224"
      );
    }

    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer], { type: file.type });

    const result = await classifier(blob);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}