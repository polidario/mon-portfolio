CREATE TABLE IF NOT EXISTS "public"."websites" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL PRIMARY KEY,
    "name" "text",
    "description" "text",
    "keywords" "text",
    "url" "text",
    "country" "text",
    "contact_email_address" "text",
    "contact_phone_number" "text",
    "copyright" "text",
    "logo_url" "text",
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
);

-- Enable Row Level Security
ALTER TABLE "public"."websites" ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all users to read from the websites table
CREATE POLICY "Allow read access for all users" 
ON "public"."websites"
FOR SELECT
USING (true);

-- Create an index on the URL for faster lookups
CREATE INDEX IF NOT EXISTS websites_url_idx ON "public"."websites" ("url");