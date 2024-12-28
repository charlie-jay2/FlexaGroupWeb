const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use the secret key from environment variables
const querystring = require('querystring');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            const { token, discordUsername } = JSON.parse(event.body);

            // Create a payment intent and charge the card
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 800, // The amount in cents (800 = £8.00)
                currency: 'gbp',
                payment_method: token,
                confirmation_method: 'manual',
                confirm: true,
                description: `Payment from ${discordUsername}`,
            });

            // Check the payment status
            if (paymentIntent.status === 'succeeded') {
                // Payment succeeded
                return {
                    statusCode: 200,
                    body: JSON.stringify({ success: true }),
                };
            } else if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
                // If the payment requires further action (e.g., 3D Secure)
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        success: true,
                        requiresAction: true,
                        paymentIntentClientSecret: paymentIntent.client_secret,
                    }),
                };
            } else {
                // Payment failed
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Payment failed' }),
                };
            }
        } catch (error) {
            console.error('Stripe error:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: error.message }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
        };
    }
};
