import { e as escape_html } from "../../chunks/context.js";
import "clsx";
import { p as public_env } from "../../chunks/shared-server.js";
import { o as onDestroy } from "../../chunks/index-server.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let errorMessage = "";
    let sessionId = "";
    let { data } = $$props;
    (() => {
      const u = public_env.PUBLIC_CHECKOUT_JS_URL?.trim() ?? "";
      if (!u) return "";
      if (u.endsWith(".js")) return u;
      return `${u.replace(/\/$/, "")}/checkout.js`;
    })();
    console.log(data.session);
    if (data && data.err) {
      console.error("Error getting session token:", data.err);
      errorMessage = JSON.stringify(data.err);
    } else if (data.session && data.session.error) {
      console.error("Error getting session token:", data.session.error);
      errorMessage = data.session.error;
    } else if (data.session && data.session.session) {
      console.log("Session id " + data.session.session.requestId);
      sessionId = data.session.session.requestId;
    } else {
      console.error("No data returned from page.server.ts!!");
    }
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="flex h-screen w-full flex-col"><div class="flex-shrink-0"><h3 class="pt-5 pl-5">Checkout Demo</h3> `);
    if (errorMessage) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="error pl-5 svelte-1uha8ag">${escape_html(errorMessage)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (sessionId) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="pl-5">Session id: ${escape_html(sessionId)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="w-full flex-1 overflow-hidden" id="checkout-container"></div></div>`);
  });
}
export {
  _page as default
};
