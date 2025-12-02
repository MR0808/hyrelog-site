# Supabase Setup Guide for Early Access Waitlist

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
    - Name: `hyrelog-site` (or your preferred name)
    - Database Password: (save this securely)
    - Region: Choose closest to your users (Australia recommended)
4. Wait for the project to be created (~2 minutes)

## Step 2: Get Your Supabase Credentials

You need two pieces of information:

### Get the Project URL

1. In your Supabase project dashboard, go to **Settings** → **General** (or look for **Project Settings**)
2. Look for **Project URL** or **Reference ID** section
3. Copy the **Project URL** (it looks like `https://xxxxx.supabase.co`)
    - This is your `NEXT_PUBLIC_SUPABASE_URL`
    - It's usually displayed prominently at the top of the General settings page

### Get the Service Role Key

1. In your Supabase project dashboard, go to **Settings** → **API Keys**
2. Look for the **service_role** key (it may be in a "Legacy" section or you may need to click "Reveal" to see it)
3. Copy the **service_role** key (it's a long JWT token)
    - This is your `SUPABASE_SERVICE_ROLE_KEY`
    - ⚠️ **Important**: Never expose the service_role key in client-side code! It bypasses Row Level Security and should only be used in server-side code.

**Note**: If you don't see the service_role key:

-   Look for a "Legacy" or "Service Role" section
-   You may need to click "Reveal" to see it
-   The service_role key is required for server actions to bypass RLS

## Step 3: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-setup.sql`
4. Click "Run" to execute the SQL
5. Verify the table was created by going to **Table Editor** → you should see `early_access_signups`

## Step 4: Add Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
RESEND_API_KEY=your-resend-api-key-here
```

## Step 5: Test the Integration

1. Start your dev server: `npm run dev`
2. Submit the early access form on your site
3. Check Supabase **Table Editor** to see the submission
4. Check the email inbox for the confirmation email

## Viewing Signups

You can view all signups in the Supabase dashboard:

-   Go to **Table Editor** → `early_access_signups`
-   You can filter, sort, and export the data

## Optional: Create an Admin Page

If you want a custom admin page to view signups, I can create one that:

-   Lists all signups with pagination
-   Allows filtering by date, email, etc.
-   Shows signup statistics
-   Exports data to CSV

Let me know if you'd like me to build this!
