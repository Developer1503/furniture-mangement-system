import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that the URL is a proper HTTP/HTTPS URL before calling createClient.
// A bad URL causes createClient to throw synchronously, which crashes the entire app.
const isValidUrl = (url) => {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
        return false;
    }
};

if (!supabaseUrl || !isValidUrl(supabaseUrl)) {
    console.error(
        '⚠️  Invalid or missing VITE_SUPABASE_URL in frontend/.env\n' +
        '   It must be a full URL like: https://your-project.supabase.co\n' +
        `   Current value: "${supabaseUrl}"`
    );
}

if (!supabaseAnonKey) {
    console.error('⚠️  Missing VITE_SUPABASE_ANON_KEY in frontend/.env');
}

// Only create the client if the URL is valid; otherwise export a dummy to avoid a crash.
export const supabase = isValidUrl(supabaseUrl)
    ? createClient(supabaseUrl, supabaseAnonKey || '')
    : createClient('https://placeholder.supabase.co', 'placeholder-key-not-real');
