import * as AuthSession from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session';

const googleOAuthDiscovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
const instagramOAuthDiscovery = AuthSession.useAutoDiscovery('https://api.instagram.com');
const tiktokOAuthDiscovery = AuthSession.useAutoDiscovery('https://api.tiktok.com');

// To add as env variables once acquired
const googleAuthRequestConfig = {
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    redirectUri: AuthSession.makeRedirectUri({
        native: 'com.yourapp://redirect',
    }),
};

const instagramAuthRequestConfig = {
    clientId: 'YOUR_INSTAGRAM_CLIENT_ID',
    scopes: ['user_profile'],
    redirectUri: AuthSession.makeRedirectUri({
        native: 'com.yourapp://redirect',
    }),
}

const tiktokAuthRequestConfig = {
    clientId: 'YOUR_TIKTOK_CLIENT_ID',
    scopes: ['user_profile'],
    redirectUri: AuthSession.makeRedirectUri({
        native: 'com.yourapp://redirect',
    }),
}


const [googleRequest, googleResponse, promptGoogleAsync] = useAuthRequest(googleAuthRequestConfig, googleOAuthDiscovery);
const [instagramRequest, instagramResponse, promptInstaAsync] = useAuthRequest(instagramAuthRequestConfig, instagramOAuthDiscovery);
const [tiktokRequest, tiktokResponse, promptTiktokAsync] = useAuthRequest(tiktokAuthRequestConfig, tiktokOAuthDiscovery);

async function signInWithGoogle() {
    const result = await promptGoogleAsync();
    if (result.type === 'success') {
        const { accessToken } = result.authentication as AuthSession.TokenResponseConfig;

        // Fetch user info using the access token
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = await userInfoResponse.json();
        return { accessToken, userInfo };
    } else {
        throw new Error('Authentication failed');
    }
}

async function signInWithInstagram() {
    const result = await promptInstaAsync();
    if (result.type === 'success') {
        const { accessToken } = result.authentication as AuthSession.TokenResponseConfig;

        // Fetch user info using the access token
        const userInfoResponse = await fetch('https://graph.instagram.com/me?fields=id,username&access_token=' + accessToken);

        const userInfo = await userInfoResponse.json();
        return { accessToken, userInfo };
    } else {
        throw new Error('Authentication failed');
    }
}

async function signInWithTiktok() {
    const result = await promptTiktokAsync();
    if (result.type === 'success') {
        const { accessToken } = result.authentication as AuthSession.TokenResponseConfig;

        // Fetch user info using the access token
        const userInfoResponse = await fetch('https://graph.instagram.com/me?fields=id,username&access_token=' + accessToken);

        const userInfo = await userInfoResponse.json();
        return { accessToken, userInfo };
    } else {
        throw new Error('Authentication failed');
    }
}



export { googleRequest, googleResponse, instagramRequest, instagramResponse, signInWithGoogle, signInWithInstagram, signInWithTiktok};
