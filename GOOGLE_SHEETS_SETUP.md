# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets API to save call booking information.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown (top left) → "New Project"
3. Name your project (e.g., "AVA Call Bookings")
4. Click "Create"

## Step 2: Enable Google Sheets API

1. In your Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## Step 3: Create Service Account Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **Service Account**
3. Fill in the details:
   - **Service account name**: `sheets-service-account` (or any name)
   - **Service account ID**: (auto-generated)
4. Click **Create and Continue**
5. Skip the optional steps (click **Continue** then **Done**)

## Step 4: Generate Service Account Key

1. In the **Credentials** page, find your newly created service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** → **Create new key**
5. Choose **JSON** format
6. Click **Create**
7. A JSON file will download automatically - **KEEP THIS FILE SAFE!**

## Step 5: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it (e.g., "Call Bookings")
4. In the first row, add these headers:
   ```
   Timestamp | Name | Surname | Phone | Email
   ```
5. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```

## Step 6: Share the Sheet with Service Account

1. In your Google Sheet, click the **Share** button
2. Paste your service account email (found in the downloaded JSON file as `client_email`)
   - It looks like: `your-service@your-project.iam.gserviceaccount.com`
3. Give it **Editor** permissions
4. Uncheck "Notify people"
5. Click **Share**

## Step 7: Set Up Environment Variables

1. Open the JSON file you downloaded in Step 4
2. Copy the values and add them to your `.env.local` file:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_spreadsheet_id_from_url
```

**Important Notes:**
- Keep the `GOOGLE_PRIVATE_KEY` in quotes
- Make sure the private key includes `\n` for line breaks (it should already be formatted this way in the JSON)
- Never commit the `.env.local` file to git
- The `GOOGLE_SHEET_ID` is the long string from your sheet's URL

## Step 8: Install Required Package

Run this command in your terminal:

```bash
npm install googleapis
```

## Step 9: Restart Your Development Server

```bash
npm run dev
```

## Testing

1. Open your application
2. Click "Book a Call"
3. Fill in the form with test data
4. Submit
5. Check your Google Sheet - the data should appear!

## Troubleshooting

### Error: "Requested entity was not found"
- Make sure you shared the sheet with your service account email
- Double-check the `GOOGLE_SHEET_ID` in your `.env.local`

### Error: "Invalid credentials"
- Verify your `GOOGLE_PRIVATE_KEY` is properly formatted with `\n` line breaks
- Make sure the `GOOGLE_SERVICE_ACCOUNT_EMAIL` matches the one in your JSON file

### Error: "Insufficient permissions"
- Ensure you gave the service account **Editor** access to the sheet
- Verify the Google Sheets API is enabled in your Google Cloud project

### Data not appearing
- Check your browser console for errors
- Check your server logs (terminal where you run `npm run dev`)
- Verify the sheet name in the API route matches your actual sheet name (default is "Sheet1")

## Security Notes

- Never share your service account JSON file
- Never commit `.env.local` to version control
- Add `.env.local` to your `.gitignore` file
- Restrict access to your Google Sheet to only necessary accounts
