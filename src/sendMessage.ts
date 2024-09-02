export default async function sendMessage(
  webhookUrl: string,
  body: Record<string, any>,
) {
  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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
