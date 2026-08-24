import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import { o as objectType, n as numberType, a as arrayType, s as stringType, e as enumType } from "../_libs/zod.mjs";
async function requireVerifiedEmail(userId) {
  const {
    data,
    error
  } = await supabaseAdmin.auth.admin.getUserById(userId);
  if (error) throw new Error(error.message);
  if (!data.user?.email_confirmed_at) {
    throw new Error("Please verify your email before posting. Check your inbox for a confirmation link.");
  }
}
const STORAGE_BASE = `${process.env.SUPABASE_URL ?? ""}/storage/v1/object/public/`;
const isBucketUrl = (bucket) => (u) => STORAGE_BASE !== "/storage/v1/object/public/" && u.startsWith(`${STORAGE_BASE}${bucket}/`);
const createPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  type: enumType(["audio", "video"]),
  mediaUrl: stringType().url().refine(isBucketUrl("media"), "mediaUrl must point to the media bucket"),
  coverUrl: stringType().url().refine(isBucketUrl("covers"), "coverUrl must point to the covers bucket").nullish(),
  title: stringType().min(1).max(140),
  description: stringType().max(2e3).optional(),
  tags: arrayType(stringType().min(1).max(40)).max(12).optional(),
  aiTools: arrayType(stringType().min(1).max(60)).max(12).optional(),
  durationSeconds: numberType().int().min(1).max(60 * 60).nullish()
}).parse(input)).handler(createSsrRpc("a00c888f79f54113952aa7643ca974e1dcd18a98adc202da5bf6750141609551"));
const deletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("9b164c50ac331cd46966f09b659ba2f9f52e826800c7787b0acb02b3f9b5d425"));
const updatePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  title: stringType().min(1).max(140).optional(),
  description: stringType().max(2e3).optional(),
  tags: arrayType(stringType().min(1).max(40)).max(12).optional(),
  pinned_comment: stringType().max(1e3).nullish()
}).parse(input)).handler(createSsrRpc("d8633714da91ec2a3a254f04b1c5a06d0177e86adca49fd675acb1e90459487d"));
const getMyProfile = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d398b6985b0853878fdfbeee802c02182bedf628a0957ed68b2628a83a344040"));
const updateMyProfile = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  display_name: stringType().min(1).max(60).optional(),
  bio: stringType().max(280).optional(),
  avatar_url: stringType().url().nullish(),
  handle: stringType().min(3).max(24).regex(/^[a-z0-9_]+$/, "lowercase letters, numbers, underscores").optional()
}).parse(input)).handler(createSsrRpc("351c6cc263a6b8d2974e57efe465ce1e5a4a1e1191232c55b20fc9fae9068059"));
export {
  updatePost as a,
  createPost as c,
  deletePost as d,
  getMyProfile as g,
  requireVerifiedEmail as r,
  updateMyProfile as u
};
