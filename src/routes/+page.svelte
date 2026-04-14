<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onDestroy, onMount } from 'svelte';

	let checkoutInstance: any;
	let unsubscribePaymentComplete: (() => void) | undefined;
	let errorMessage = $state('');
	let sessionId = $state('');

	let { data }: any = $props();

	/** Full URL to checkout.js (env may be base host or path ending in .js). */
	const checkoutJsUrl = (() => {
		const u = env.PUBLIC_CHECKOUT_JS_URL?.trim() ?? '';
		if (!u) return '';
		if (u.endsWith('.js')) return u;
		return `${u.replace(/\/$/, '')}/checkout.js`;
	})();

	function loadCheckoutScript(src: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const w = window as any;
			if (w.checkout?.mount) {
				resolve();
				return;
			}
			const script = document.createElement('script');
			script.src = src;
			script.async = true;
			script.onload = () => {
				if (!(window as any).checkout?.mount) {
					reject(
						new Error('checkout.js loaded but window.checkout.mount is missing (unexpected global API)')
					);
					return;
				}
				resolve();
			};
			script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
			document.head.appendChild(script);
		});
	}

	console.log(data.session);

	if (data && data.err) {
		console.error('Error getting session token:', data.err);
		errorMessage = JSON.stringify(data.err);
	} else if (data.session && data.session.error) {
		console.error('Error getting session token:', data.session.error);
		errorMessage = data.session.error;
	} else if (data.session && data.session.session) {
		console.log('Session id ' + data.session.session.requestId);
		sessionId = data.session.session.requestId;
	} else {
		console.error('No data returned from page.server.ts!!');
	}

	onMount(async () => {
		// If checkout-demo is loaded inside an iframe, it means PUBLIC_CHECKOUT_FORM_URL
		// is not set on checkout-js, so the iframe src resolved to checkout-demo instead
		// of checkout-form. Bail out to prevent a recursive iframe loop.
		if (window.self !== window.top) {
			errorMessage =
				'Recursive iframe detected: checkout-js PUBLIC_CHECKOUT_FORM_URL is not set. ' +
				'The iframe is loading checkout-demo instead of checkout-form.';
			console.error(errorMessage);
			return;
		}

		if (data && data.session && data.session.token) {
			if (!checkoutJsUrl) {
				errorMessage = 'PUBLIC_CHECKOUT_JS_URL is not set.';
				return;
			}
			try {
				await loadCheckoutScript(checkoutJsUrl);
				checkoutInstance = (window as any).checkout.mount(data.session.token, 'checkout-container');
				console.log('Checkout mounted!');

				unsubscribePaymentComplete = (window as any).checkout.onPaymentComplete((response: any) => {
					console.log('Payment completed! Response:', response);
				});
			} catch (error: any) {
				console.error('Failed to load Checkout-js', error);
				errorMessage = `Failed to load Checkout-js at ${checkoutJsUrl}`;
			}
		}
	});

	onDestroy(() => {
		if (unsubscribePaymentComplete) {
			unsubscribePaymentComplete();
		}
	});
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex-shrink-0">
		<h3 class="pt-5 pl-5">Checkout Demo</h3>
		{#if errorMessage}
			<p class="error pl-5">{errorMessage}</p>
		{/if}
		{#if sessionId}
			<p class="pl-5">Session id: {sessionId}</p>
		{/if}
	</div>
	<div class="w-full flex-1 overflow-hidden" id="checkout-container"></div>
</div>

<style>
	.error {
		color: red;
		font-weight: bold;
	}
</style>
