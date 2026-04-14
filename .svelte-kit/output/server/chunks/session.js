import { p as public_env, b as private_env } from "./shared-server.js";
const createSession = async (postData, type) => {
  const url = `${public_env.PUBLIC_CHECKOUT_API_URL}/api/sessions`;
  if (url.includes("localhost") || url.includes(".local")) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  const requestHeaders = {
    Authorization: `Bearer ${private_env.PRIVATE_KEY}`,
    "Content-Type": "application/json",
    "User-Agent": "CheckoutLive/1.0 (+https://checkout-live.vercel.app/)"
  };
  console.log("\n[DEBUG API HTTP] === OUTGOING REQUEST ===");
  console.log(`[DEBUG API HTTP] URL: POST ${url}`);
  console.log("[DEBUG API HTTP] Headers:", {
    ...requestHeaders,
    Authorization: `Bearer [REDACTED - length: ${requestHeaders.Authorization?.length || 0}]`
  });
  console.log("[DEBUG API HTTP] Body:", postData);
  console.log("[DEBUG API HTTP] ========================\n");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: postData
      // Native fetch seamlessly behaves like curl --location regarding redirects
    });
    console.log("\n[DEBUG API HTTP] === INCOMING RESPONSE ===");
    console.log(`[DEBUG API HTTP] Status: ${res.status} ${res.statusText}`);
    console.log(`[DEBUG API HTTP] Headers:`, Object.fromEntries(res.headers.entries()));
    console.log("[DEBUG API HTTP] =========================\n");
    console.log("Response: test", res);
    if (!res.ok) {
      const text = await res.text();
      console.error(`[DEBUG API HTTP] Error Body: ${text}`);
      throw new Error(`[${res.status} ${res.statusText}] API error: ${text}`);
    }
    const bodyText = await res.text();
    try {
      return JSON.parse(bodyText);
    } catch (parseErr) {
      console.error(
        "[DEBUG API HTTP] Response was not JSON (Content-Type may be wrong or body is HTML)."
      );
      console.error(`[DEBUG API HTTP] Body length: ${bodyText.length}`);
      console.error("[DEBUG API HTTP] Raw body:\n", bodyText);
      throw parseErr;
    }
  } catch (error) {
    console.error("\n[DEBUG API HTTP] !!! NETWORK FETCH FAILED !!!");
    console.error(`[DEBUG API HTTP] Error Message: ${error.message}`);
    console.error(`[DEBUG API HTTP] Error Stack: ${error.stack}`);
    if (error.cause) {
      console.error(`[DEBUG API HTTP] Error Cause:`, error.cause);
    }
    console.error("[DEBUG API HTTP] !!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
    throw error;
  }
};
export {
  createSession as c
};
