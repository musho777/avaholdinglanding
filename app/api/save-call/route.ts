import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
  const GOOGLE_SERVICE_ACCOUNT_EMAIL =
    "sheets-service-account@project-3b02420b-ecd7-4dbd-8a2.iam.gserviceaccount.com";

  const GOOGLE_PRIVATE_KEY =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+zR2urojts84g\nl35K3b6O+vkROrYG/5ZBlNUcAR629iP+3tf7iEH9MIwZbcCx41xAdO3x+zIJRBtv\n6iy+N18jx0uMbSyAUHWxB30ScucMDKil1bjpvV4qmfsK4HELIzV2+gnvUU+6/92m\nftwnAD85152sG6uy+FZbT7XuEo01oeqYcu72NiBzERRfkE/6z5Sa9jRUHKpDQuHo\nXTDILWcMnKFHsvY+od7ptZ8+YP+X0Pf9eUkoPR+uyLEGdFq0LNjomn4uQ968ttXb\nJIg3FmW254vDAHr8E7WDp4sbR/gyENEErUme2irqNVazD/MADMsI/TlRJp8xZ9qX\nehS84DO7AgMBAAECggEAQZ20mYA4Yta1CoxOyFxdzjoNMZmpQ9rdx4vxhgH0mCMp\n2dq1GDGR0ArEA3K1E/gGn7wWoGMsn/cmIGS+ImRUea9uEcrxxObmsozKvG97ea9Y\nyD8pqmiPW8M8jE8HUTc4icQPapfh/YNErJ9wApGZLMEz3h5d+9xfhmNxQ4Bpw4lk\nlgG9WbCx7xi0NlpfXHSdgh07qZHRIbr1/NKlNuPix/tfEj8I2XN2SM13/evRGchQ\n3+ZBm9pyh6AdDnT5WgA1S5AbQ6VyAKkS2fUAvIecVTKXcYr+6zKTy62mTETgLB+i\nzrbtH5INtjDrHuIv3Ps5Rh5iB2urjMNCIIjdNQPsEQKBgQD1Y+HWWOhjuzSbQWMe\nTyq9+3RbJDj3wGhiX46+vjdDG9idembWjO8T24bCDeC0AwhapVlgE/YisJwxwtUe\n+4JlTwKghYLoCTQJxqhC5oAXuIHjE2OozOYSyC8ShGEvxNXICrE3fvH5ZvSm+79K\nEppvDrbsKwpReeorUwMsQ8YaXQKBgQDHDQMwbbXsJ3DY0DorNZsMNGMjJSZutJpk\nuwblsoiCzxjaAbRn7eU6dR4RJo2eXf8VPjynPllREX+z00Mvdzj8uTjr3DkM/E6q\nsl8d4hBmVl7KgqZ4eM92LlXCa9bOxrFtLZQSxx1nvGEWw3Q0K63xjhlpF97MEJnv\nSW2kdYuU9wKBgQDA84UE0mwI348B9WxGzOFC+ZIIiHby+Kwbjh/kBBXYAvFVAoYS\ndkcXSiqwM9FYOno7LIEWdxu3Mz/eMOD7t7BUkMf0CIdihLoSZc6wrCZUgJRBRWG7\nvUG7ywSYftcchJ3E6gNnK76A6V++XX2QdQhSAzP6h+1ZG4/x+RgpmjEPUQKBgBup\nv0u3s5TCVniLV8oxhP7JOQ3lV9YC24IsS+UYTsh/J6EEo6Hd+gGJzUfs57merpix\nMZS8oYUWvXysW6X5F75nr3V4AaXAWt52M6nfhQ/z6PCT/7a2c36lKd3/Rrct/fKC\nZxXE/l0wXP3g5AFsIJx1dyqX2qrZk8shlU9J1sA5AoGAa431OnjRuZwv6MUM3swm\nerRkU0oMnRQxKiyTR3JbYyBKivP8XEXG2e9EyWhVgTGDIJ+2dNe7e+2VXLmxEbyw\nIMIYQ0VFvnTVpuNnt/tjYlkmfzW3Mj7jMHGba/Wngw5bycu37qey0ZlIp6JuL0gx\nqW+trYHPkx1VfRBk6L5mwsA=\n-----END PRIVATE KEY-----\n";
  const GOOGLE_SHEET_ID = "1EwTIPu0jChIQj1fMY8dpAgSaUp-b7TcfWTCOWMuzXCQ";
  try {
    const body = await request.json();
    const { fullName, phone, email, agreeToEmails } = body;

    // Validate required fields
    if (!fullName || !phone || !email) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Get credentials from environment variables
    const credentials = {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    };

    const spreadsheetId = GOOGLE_SHEET_ID;

    if (!credentials.client_email || !credentials.private_key || !spreadsheetId) {
      console.error("Missing Google Sheets configuration");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Prepare the row data
    const timestamp = new Date().toLocaleString();
    const values = [[timestamp, fullName, phone, email, agreeToEmails ? "Yes" : "No"]];

    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Лист1!A:E", // Russian sheet name
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ message: "Call information saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return NextResponse.json({ error: "Failed to save call information" }, { status: 500 });
  }
}
