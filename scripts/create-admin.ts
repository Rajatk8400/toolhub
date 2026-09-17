/**
 * Create the first admin user.
 *
 * Usage:
 *   npx tsx scripts/create-admin.ts admin@example.com "Admin Name" "strong-password"
 *
 * Requires MONGODB_URI to be set (e.g. via .env.local, loaded automatically by tsx --env-file
 * on Node 20+, or export it in your shell first).
 */
import mongoose from "mongoose";
import User from "../lib/models/User";
import { hashPassword } from "../lib/auth/password";

async function main() {
  const [email, name, password] = process.argv.slice(2);
  if (!email || !name || !password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <email> "<name>" <password>');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.error(`A user with email ${email} already exists.`);
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  await User.create({ email: email.toLowerCase(), name, passwordHash, role: "admin" });

  console.log(`Admin user created: ${email}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
