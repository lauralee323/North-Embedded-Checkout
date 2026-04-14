import { b as private_env } from "../../../chunks/shared-server.js";
import { c as createSession } from "../../../chunks/session.js";
async function load({}) {
  try {
    const session = await createSession(
      JSON.stringify({
        checkoutId: private_env.PRIVATE_CHECKOUT_ID,
        profileId: private_env.PRIVATE_PROFILE_ID,
        metadata: "Test metadata",
        fields: ["cardField", "cvvField"],
        amount: 1.05,
        products: [
          {
            name: "Product 1",
            price: 1.05,
            quantity: 1,
            logoUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/logo-organic-product-design-template-3abf71131287c02170f994587fb56eb1_screen.jpg?ts=1649667032"
          }
        ]
      }),
      "form"
    );
    return {
      session
    };
  } catch (err) {
    console.error("Error: ", err);
    return {
      err: {
        message: err instanceof Error ? err.message : String(err),
        code: err?.code
      }
    };
  }
}
export {
  load
};
