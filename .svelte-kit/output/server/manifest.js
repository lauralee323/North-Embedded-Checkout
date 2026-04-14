export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.Mv1n0lRq.js",app:"_app/immutable/entry/app.DqZAKl-_.js",imports:["_app/immutable/entry/start.Mv1n0lRq.js","_app/immutable/chunks/B_oBm6E0.js","_app/immutable/chunks/s87MORXR.js","_app/immutable/chunks/BT3mV_6k.js","_app/immutable/entry/app.DqZAKl-_.js","_app/immutable/chunks/s87MORXR.js","_app/immutable/chunks/C0uMtawa.js","_app/immutable/chunks/Dhq99FVs.js","_app/immutable/chunks/BT3mV_6k.js","_app/immutable/chunks/BQG8BRuh.js","_app/immutable/chunks/D_YrlqYP.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/decline",
				pattern: /^\/decline\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
