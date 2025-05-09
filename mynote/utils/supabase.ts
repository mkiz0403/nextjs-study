import { createClient } from "@supabase/supabase-js";
// 해당 명령어를 통해 슈파베이스 인스턴스 생성 했음. 아래 필요한 URL, KEY
import { Database } from "../types_db";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
