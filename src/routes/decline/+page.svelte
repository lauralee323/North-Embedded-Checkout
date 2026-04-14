<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { waitForCheckoutSdk } from '$lib/helpers/waitForCheckoutSdk';
	import { onDestroy, onMount } from 'svelte';

	let checkoutInstance: any;
	let unsubscribePaymentComplete: (() => void) | undefined;
	let errorMessage = $state('');
	let sessionId = $state('');

	let { data } = $props();

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
			try {
				const checkout = await waitForCheckoutSdk(env.PUBLIC_CHECKOUT_JS_URL);
				checkoutInstance = checkout.mount(data.session.token, 'checkout-container');
				console.log('Checkout mounted!');

				unsubscribePaymentComplete = checkout.onPaymentComplete((response: any) => {
					console.log('Payment completed! Response:', response);
				});
			} catch (error: any) {
				console.error('Checkout SDK error', error);
				errorMessage = error?.message ?? String(error);
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
