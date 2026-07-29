import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, surname, phone, email } = body;

    // Validate required fields
    if (!name || !surname || !phone || !email) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Get credentials from environment variables
    const credentials = {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    };

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!credentials.client_email || !credentials.private_key || !spreadsheetId) {
      console.error("Missing Google Sheets configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Prepare the row data
    const timestamp = new Date().toLocaleString();
    const values = [[timestamp, name, surname, phone, email]];

    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Лист1!A:E", // Russian sheet name
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return NextResponse.json(
      { message: "Call information saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to save call information" },
      { status: 500 }
    );
  }
}
