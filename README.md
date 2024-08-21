# Notion-Discord Webhook

Looks for new pages in a Notion database and sends them to a Discord channel

## Example

```yml
name: Run Action

on:
  schedule:
    - cron: "*/10 * * * *"

jobs:
  run-action:
    runs-on: ubuntu-latest

    steps:
      - uses: Rensselaer-County/notion-discord-webhook@0.1.5
        with:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          DATABASE_ID: ${{ secrets.DATABASE_ID }}
          WEBHOOK_URL: ${{ secrets.WEBHOOK_URL }}
```

## Inputs

| Name           | Required | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| NOTION_API_KEY | `true`   | Notion integration internal secret                |
| DATABASE_ID    | `true`   | Target Notion page database ID _(located in URL)_ |
| WEBHOOK_URL    | `true`   | Discord channel webhook URL                       |

## Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env` with the following variables:

   - `NOTION_API_KEY`
   - `DATABASE_ID`
   - `WEBHOOK_URL`

3. Run:

```bash
npx tsc && node dist/index.js
```

## Deployment

1. Before the final commit run:

```bash
npm run package
```

2. Create a new release on GitHub and publish it to the Marketplace

> [!WARNING]
>
> This action has been created for a specific use case and should be adjusted for your own needs before using it!
