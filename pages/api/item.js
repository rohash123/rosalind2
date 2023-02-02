export default async function getkey(user){
  let sub = user['attributes']['sub']
  let key = process.env.ADMIN_KEY
  console.log(key)
  let requestOptions = {
      method: 'POST',
      headers: { 'mysub': sub, 'x-api-key' : key, 'Content-Type' : 'application/json'},
      body: JSON.stringify({ title: 'API key Retrieval' })
  };
  console.log(requestOptions)
  let response = await fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/get-key', requestOptions)
  let data = await response.json()
  console.log(data)
  return (data.apikey)
}