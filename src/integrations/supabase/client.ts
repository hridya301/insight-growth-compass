// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oepbnqtznffhpqpostgl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lcGJucXR6bmZmaHBxcG9zdGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDIxODgsImV4cCI6MjA1OTI3ODE4OH0.DTvCptyxEtRz3it8SozahyrN3o3SFfLVHkLy5_y6tC4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);