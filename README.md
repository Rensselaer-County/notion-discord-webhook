# Notion-Discord Webhook

Looks for new pages in a Notion database and sends them to a Discord channel

## Inputs

| Name           | Required | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| NOTION_API_KEY | `true`   | Notion integration internal secret                |
| DATABASE_ID    | `true`   | Target Notion page database ID _(located in URL)_ |
| WEBHOOK_URL    | `true`   | Discord channel webhook URL                       |

## Development

1. Create `.env` with following variables:

   - `NOTION_API_KEY`
   - `DATABASE_ID`
   - `WEBHOOK_URL`

2. Run:

```bash
npx tsc && node dist/index.js
```

## Deployment

1. Before the final commit run:

```bash
npx tsc
```

2. Create a new release on GitHub and publish it to the Marketplace

> [!WARNING]
>
> This action has been created for a specific use case and should be adjusted for your own needs before using it!
