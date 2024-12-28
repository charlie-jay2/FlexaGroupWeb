// ./netlify/functions/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key
const querystring = require('querystring');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            const { token, discordUsername } = JSON.parse(event.body);

            // Create a payment intent and charge the card
            const charge = await stripe.paymentIntents.create({
                amount: 800, // The amount in cents (500 = $5.00)
                currency: 'gbp',
                payment_method: token,
                confirmation_method: 'manual',
                confirm: true,
                description: `Payment from ${discordUsername}`,
            });

            // Handle the charge response
            if (charge.status === 'succeeded') {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ success: true }),
                };
            } else {
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
