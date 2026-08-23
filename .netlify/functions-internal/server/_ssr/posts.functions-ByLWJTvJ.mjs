import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-BXP1ipXf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-OlnkJNGV.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType, e as enumType } from "../_libs/zod.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
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
}).parse(input)).handler(createSsrRpc("dee99e0ac5def9629cb8b9b9fe9535cff849dbaaa6d14014cc0e8f85a17360dc"));
const deletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("9781eea9f07b5d50a9898caafe9147f78d9c8c33a09b5bb298f3d78326686166"));
const updatePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  title: stringType().min(1).max(140).optional(),
  description: stringType().max(2e3).optional(),
  tags: arrayType(stringType().min(1).max(40)).max(12).optional(),
  pinned_comment: stringType().max(1e3).nullish()
}).parse(input)).handler(createSsrRpc("9ce5830f908e44fabf4b15199c54b71d19bdc79bd3480ac2213b37bcf1f6e63d"));
const getMyProfile = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("0294383a2dcc8cda48ac2e0db0e570cdd658b49afb14d5eb20819767a9497104"));
const updateMyProfile = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  display_name: stringType().min(1).max(60).optional(),
  bio: stringType().max(280).optional(),
  avatar_url: stringType().url().nullish(),
  handle: stringType().min(3).max(24).regex(/^[a-z0-9_]+$/, "lowercase letters, numbers, underscores").optional()
}).parse(input)).handler(createSsrRpc("4f6aeccb1ab551e8fc95e957a150b1dbc85b072c88e0aaaf578723d40279fcf3"));
export {
  updateMyProfile as a,
  createSsrRpc as b,
  createPost as c,
  deletePost as d,
  getMyProfile as g,
  requireVerifiedEmail as r,
  updatePost as u
};
