import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// GCP Service Account credentials
const GCP_CREDENTIALS = {
  type: "service_account",
  project_id: "extreme-tide-478009-s5",
  private_key_id: "f9ba55c2d3465bda1d09a3d689130d630b8872a6",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCX8GZEbhaA2lPV\nNgfWTWZsPh+Ty7AZMjaan87ciLZYOhWu3vCgHQR3z6uNb8Hm2Dq6aUpERf6/0OG9\nbLCSXExRsqUVnT3El96Et5Dner0g/X2LzDk38TnGPNGvPV1lSeZzT3t3glz08cJb\nl8agSDdxqPKg7eT5DeCVgttDrWLZL2kqOar8SwNoP4N4emv2RiIPrA/QSRf+Dy4v\nRx4AGQ1u5EmO1rWjWuQLlx7DYryHxARvD5t7XtZBRNwZB9B3UnpXwLJaR/wLE06v\nqzgyZGkdPFpbyjWsWNl2joVZWMaLy5x1hPeCC2Akq31yE9rya9TMO85ivSlfvMGv\ngpmr8cVbAgMBAAECggEALQ9ShQDRE62sJxM7B8c0lO1nmAFUXGST5Q933dd9nHS9\ncXsUiaeRZ6bjDbMTIk8GO7p2GAFaJ7DfAbp2MzHEQIZmhx527xLLHzkBdGTmKh6D\nWS5b2cdkhvIKjZn5VMyx14i+6RZ0UwBPz7IXafmA1+hu7GMhAOuoqy5/sHZ/VkFQ\nMMqEyad5lloUMJ+4nGwLRUP2z4xX0jgE2c5HuXqX3aUb1ldK2NlynOOIvS3Pszpv\nhbOMeajU//PXytCvWLkLCL1wOFgGhs4SYc1lWa3AO1lHxGIA5foxb/CwbOcC4NvY\nvctmrOu/d+Qbb0TkWEll6rxXY4cmG0NyuF5BWHpK4QKBgQDNKYRaOIj2WSEN9NPt\nQ+Rzutlozv4YgWMIQdh13cuBlQ7vatoMSEb5QVxWLWr8BaIssg2kXPmoPigzhcqO\nZi4z2OkJNyb1po7NXNWdbIXEXG+tM+9WNMdKsaht87U38VAV6RthBj1rNNfOMpCq\ne4K50d37/bZ9z54ynhM4XzOQ9wKBgQC9lqs7Ub4cDOkbi0p9RbwlfT4u1dafni7E\nssB1IysE+Oe4TBee+Y14YOHvFvYo6vLdDsnGDWnH8xWaGrAjHzQjETJ6bya621Dp\nAsFHb7ALUVlpYUJUsW3zKPlDodA8yMHkhKpwEku2Z1Lgdvx6GoeOGDWluAZ9lte5\nHR5Tq715vQKBgQCdEl8ZL9V0PdK3u6yRJ3x9Oh1/R5J0MoMebEMMIk3PHM69cCIW\nazOjW24VMFqLLsj1zS/ymZguPcBLifAFS6et3DC19Hqocec8xQlqqA5VwqthgLSJ\nXIkD37Ziz8X7WY4F6F0k0EEvldpvLHljfIIeP9XjOmCAO/cTK8DtVL3HCwKBgB/Y\nLurH0CbmBEGcI+bmz7N8VfWH9YTaDQD9BVankZJEPKe4ID+Tqy+NFmYSdUZqMGDx\nGvMpTZtIOVipIuzDUP6S5Oerw9WfAPgiflSBbhB4mYwZygpvwwgU2cmCZHfRQMAh\niH9Kk20P7dvGIKJh0mMLrfcn8e8mZxWwzmc/cZQBAoGBAJK4Hi6ToWxUKkQ8ACze\nrvsLOVyUkU2CnBYX9F0iM4uy/sRYe28vFyk/KJYxyXvZCyR0dguUAiGAdlv1PWsd\n0lAhv4Y2kVJVB9qQGWADSyz85cxVW8MKo+pjIzlf2qbgL2rJxh0iWYLHyeCRI7lk\nSyjBTyWfy/z7G0guouyBcTy9\n-----END PRIVATE KEY-----\n",
  client_email: "vertex-express@extreme-tide-478009-s5.iam.gserviceaccount.com",
  client_id: "103428221642040667359",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/vertex-express%40extreme-tide-478009-s5.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600;

  const header = {
    alg: "RS256",
    typ: "JWT",
    kid: GCP_CREDENTIALS.private_key_id,
  };

  const claimSet = {
    iss: GCP_CREDENTIALS.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: GCP_CREDENTIALS.token_uri,
    exp: expiry,
    iat: now,
  };

  const encoder = new TextEncoder();
  const headerBase64 = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const claimSetBase64 = btoa(JSON.stringify(claimSet)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const signatureInput = `${headerBase64}.${claimSetBase64}`;

  // Import private key
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = GCP_CREDENTIALS.private_key.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");

  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(signatureInput));

  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${signatureInput}.${signatureBase64}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch(GCP_CREDENTIALS.token_uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice = "en-IN-Neural2-A" } = await req.json();

    if (!text) {
      throw new Error("Text is required");
    }

    console.log("Generating speech for text:", text.substring(0, 50) + "...");

    // Get access token
    const accessToken = await getAccessToken();

    // Extract language code from voice name (e.g., 'en-IN-Neural2-A' -> 'en-IN')
    const languageCode = voice.split("-").slice(0, 2).join("-");

    // Call Google Cloud Text-to-Speech API
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: languageCode,
          name: voice,
        },
        audioConfig: {
          audioEncoding: "MP3",
          pitch: 0,
          speakingRate: 1.0,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("GCP TTS error:", error);
      throw new Error(error.error?.message || "Failed to generate speech");
    }

    const data = await response.json();
    console.log("Speech generated successfully");

    return new Response(JSON.stringify({ audioContent: data.audioContent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Text-to-speech error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
