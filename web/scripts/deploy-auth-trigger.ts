import { Client } from "pg";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    "❌ No database connection string found (DIRECT_URL or DATABASE_URL).",
  );
  process.exit(1);
}

const client = new Client({
  connectionString: connectionString,
});

const sql = `
-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nickname, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to execute the function on new user insert
-- We use separate 'drop trigger if exists' because 'create or replace trigger' is Postgres 14+ specific syntax 
-- and sometimes safer to be explicit for older versions or compatibility.
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
`;

async function deploy() {
  try {
    console.log("🔌 Connecting to database...");
    await client.connect();

    console.log("🚀 Deploying auth trigger...");
    await client.query(sql);

    console.log(
      "✅ Trigger successfully deployed! New users will now automatically get profiles.",
    );
  } catch (err) {
    console.error("❌ Deployment failed:", err);
  } finally {
    await client.end();
  }
}

deploy();
