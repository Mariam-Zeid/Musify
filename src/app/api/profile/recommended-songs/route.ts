import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the incoming request
    const { songs, numberOfSongs } = body;

    // Ensure numberOfSongs is an integer before sending it
    const numberOfSongsInt = parseInt(numberOfSongs, 10);

    if (isNaN(numberOfSongsInt)) {
      return NextResponse.json(
        { error: "'numberOfSongs' should be a valid integer" },
        { status: 400 }
      );
    }

    // Forward the request to the Python API
    const response = await fetch("http://127.0.0.1:5001/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songs: songs, numberOfSongs: numberOfSongsInt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error },
        { status: response.status }
      );
    }

    const recommendations = await response.json();
    console.log({ recommendations });
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error forwarding request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
