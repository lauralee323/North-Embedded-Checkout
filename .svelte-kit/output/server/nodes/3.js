import * as server from '../entries/pages/decline/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/decline/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/decline/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BqWouAd1.js","_app/immutable/chunks/Dhq99FVs.js","_app/immutable/chunks/s87MORXR.js","_app/immutable/chunks/BT3mV_6k.js","_app/immutable/chunks/C0uMtawa.js","_app/immutable/chunks/BQG8BRuh.js","_app/immutable/chunks/D_YrlqYP.js","_app/immutable/chunks/BHYF0eQx.js"];
export const stylesheets = ["_app/immutable/assets/3.DCi8xlXp.css"];
export const fonts = [];
