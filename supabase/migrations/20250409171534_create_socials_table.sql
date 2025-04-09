CREATE TABLE IF NOT EXISTS "public"."socials" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL PRIMARY KEY,
    "url" "text",
    "icon" "text",
    "label" "text"
);

INSERT INTO public.socials (url, icon, label) VALUES 
    ('https://www.linkedin.com/in/polidario/', 'entypo-social:linkedin', 'Bernard''s LinkedIn profile'),
    ('https://youtube.com/@weeklyhow', 'entypo-social:youtube', 'Bernard''s YouTube channel called WeeklyHow'),
    ('https://instagram.com/weeklyhow', 'entypo-social:instagram', 'WeeklyHow''s Instagram account'),
    ('https://github.com/polidario', 'entypo-social:github', 'Bernard''s GitHub profile');