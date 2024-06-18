
const accessToken = await fetch(OAuthServerTokenEndpoint, {
method: "POST",
// token request with authorization code and PKCE
// submits data in as x-www-form-urlencoded encoded format
body: new URLSearchParams({
 client_id: "example-client",
grant_type: "authorization_code",
code: authorization_code,
 code_verifier: pkce_code_verifier
})
})
// server responds with JSON object
.then (response => response.json())
.then (tokenResponse => {
  // parse access token from response
  if (tokenResponse.accessToken) {
    return tokenResponse.accessToken;
  } // else handle error response
})
.catch( 
// handle network error
)