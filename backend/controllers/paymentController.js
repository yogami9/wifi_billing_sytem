const axios = require('axios');

// MPesa credentials and endpoint
const MPESA_API_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'; // Use the sandbox URL for testing
const SHORTCODE = 'YOUR_SHORTCODE';
const LIPA_NA_MPESA_ONLINE = 'YOUR_LIPA_NA_MPESA_ONLINE'; // Replace with actual LIPA_NA_MPESA_ONLINE value
const CONSUMER_KEY = 'YOUR_CONSUMER_KEY'; // Replace with your consumer key
const CONSUMER_SECRET = 'YOUR_CONSUMER_SECRET'; // Replace with your consumer secret
const CALLBACK_URL = 'https://yourcallbackurl.com/callback'; // Replace with your callback URL

exports.processPayment = async (req, res) => {
    try {
        const { mpesaNumber } = req.body;

        // Setup the payment request
        const response = await axios.post(MPESA_API_URL, {
            BusinessShortCode: SHORTCODE,
            Password: LIPA_NA_MPESA_ONLINE,
            Timestamp: getFormattedTimestamp(),
            TransactionType: 'CustomerPayBillOnline',
            Amount: 1, // Example amount
            PartyA: mpesaNumber,
            PartyB: SHORTCODE,
            PhoneNumber: mpesaNumber,
            CallBackURL: CALLBACK_URL,
            AccountNumber: 'Test123'
        }, {
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ success: true, message: 'Payment request sent', response: response.data });
    } catch (error) {
        console.error('Payment processing error:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: 'Payment processing failed', error: error.message });
    }
};

// Function to get an access token for the MPesa API
const getAccessToken = async () => {
    try {
        const authResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')}`
            }
        });
        return authResponse.data.access_token;
    } catch (error) {
        throw new Error('Error fetching access token');
    }
};

// Function to get current timestamp in the required format
const getFormattedTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};
