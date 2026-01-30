import asyncio
from src.shared.config import SUPABASE_URL, SUPABASE_KEY
from supabase import create_client, Client

async def reset_db():
    print("🗑️ Resetting database...")
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Missing Supabase credentials")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Check if table exists/count
    count = supabase.table("blogs").select("*", count="exact", head=True).execute()
    print(f"📊 Current blog count: {count.count}")

    # Delete all rows
    # Note: 'delete' requires a filter. To delete all, we need a condition that matches all.
    # Typically 'id' > 0 or similar.
    # Supabase-py might not allow delete without where.
    # Let's try 'neq' id -1 or something.
    try:
        # Assuming id is int or uuid.
        # Check schema says id is Int autoincrement
        res = supabase.table("blogs").delete().neq("id", -1).execute()
        # count again
        print("✅ Delete command executed.")
    except Exception as e:
        print(f"❌ Error resetting DB: {e}")
        # Try raw SQL if possible? Client doesn't support raw SQL directly usually unless via RPC.
        # But we can iterate batch delete if needed, but 'neq -1' usually works for 'not equal'

if __name__ == "__main__":
    asyncio.run(reset_db())
