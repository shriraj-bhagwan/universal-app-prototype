import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audioKey, language, userName } = await req.json();
    
    if (!audioKey || !language) {
      throw new Error('audioKey and language are required');
    }

    const serviceAccountKey = Deno.env.get('GCP_SERVICE_ACCOUNT_KEY');
    if (!serviceAccountKey) {
      throw new Error('GCP_SERVICE_ACCOUNT_KEY not configured');
    }

    const credentials = JSON.parse(serviceAccountKey);
    
    // Construct the audio file path based on parameters
    // Format: gs://bucket-name/language/audioKey_userName.mp3
    const bucketName = 'bandhan-life-audio'; // Update with your actual bucket name
    const fileName = userName ? `${audioKey}_${userName}.mp3` : `${audioKey}.mp3`;
    const filePath = `${language}/${fileName}`;
    
    console.log(`Fetching audio: ${filePath} from bucket: ${bucketName}`);

    // Get OAuth2 token for GCP
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: await createJWT(credentials),
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get OAuth token');
    }

    const { access_token } = await tokenResponse.json();

    // Fetch the audio file from Google Cloud Storage
    const audioUrl = `https://storage.googleapis.com/storage/v1/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
    
    const audioResponse = await fetch(audioUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!audioResponse.ok) {
      console.error(`Audio fetch failed: ${audioResponse.status} ${audioResponse.statusText}`);
      throw new Error(`Audio file not found: ${filePath}`);
    }

    const audioData = await audioResponse.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData)));

    return new Response(
      JSON.stringify({ audioUrl: `data:audio/mp3;base64,${base64Audio}` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in gcp-audio function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Helper function to create JWT for GCP authentication
async function createJWT(credentials: any) {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaim = base64UrlEncode(JSON.stringify(claim));
  const signatureInput = `${encodedHeader}.${encodedClaim}`;

  // Import the private key
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(credentials.private_key),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  // Sign the JWT
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signatureInput)
  );

  const encodedSignature = base64UrlEncode(signature);
  return `${signatureInput}.${encodedSignature}`;
}

function base64UrlEncode(data: string | ArrayBuffer): string {
  let base64: string;
  if (typeof data === 'string') {
    base64 = btoa(data);
  } else {
    base64 = btoa(String.fromCharCode(...new Uint8Array(data)));
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
