import { NextResponse } from 'next/server';
import axios from 'axios';
import { format } from 'date-fns';

// MPESA PASSWORD
export function createLipaNaMpesaPassword() {
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    const business_short_code = '174379';
    const lipa_na_mpesa_passkey =
        'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    const data_to_encode = business_short_code + lipa_na_mpesa_passkey + timestamp;
    const encoded_string = btoa(data_to_encode);

    return encoded_string;
}

// MPESA ACCESS TOKEN UTIL
export async function generateAccessToken() {
    const consumer_key = 'YKPYkGecnszbycN89DxGL73VqEnLJqmO';
    const consumer_secret_key = 'xkQvd5jxLn6OTjaL';
    const auth = {
        username: consumer_key,
        password: consumer_secret_key,
    };

    try {
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            { auth }
        );
        const { access_token } = response.data;
        return access_token;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function formatPhoneNumber(phoneNumber: string) {
    // Remove any non-digit characters (e.g., spaces or hyphens)
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.startsWith('254')) {
        return cleanedNumber;
    } else if (cleanedNumber.startsWith('0')) {
        return `254${cleanedNumber.substring(1)}`;
    } else if (cleanedNumber.startsWith('+254')) {
        return `254${cleanedNumber.substring(4)}`;
    } else {
        return cleanedNumber;
    }
}

export async function registerC2BUrls() {
    try {
        const response = await axios.post('/api/registerurls');
        console.log('REGISTERED_URLS', response.data);
    } catch (error) {
        console.log('ERROR_REGISTERING_URLS', error);
    }
}
