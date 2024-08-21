export default async function sendMessage(
  webhookUrl: string,
  payload: Record<string, any>,
) {
  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Issue Tracker",
      avatar_url:
        "https://cdn.discordapp.com/attachments/1261742215265255426/1275173490575671347/Bug.jpg?ex=66c4ed5b&is=66c39bdb&hm=fe924ba2a4f9055fb11b318009f065bd4039946288428ddcdf325899b34e549f&",
      ...payload,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("Message sent successfully");
      } else {
        console.warn(
          `Connection was successful but could not send message: ${res.status}`,
        );
      }
    })
    .catch((err) => {
      console.error(`Could not send message: ${err}`);
    });
}
