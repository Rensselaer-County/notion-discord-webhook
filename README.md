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
      - uses: Rensselaer-County/notion-discord-webhook@0.1.10
        with:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          BUGS_DATABASE_ID: ${{ secrets.BUGS_DATABASE_ID }}
          TASKS_DATABASE_ID: ${{ secrets.TASKS_DATABASE_ID }}
          BUGS_WEBHOOK_URL: ${{ secrets.BUGS_WEBHOOK_URL }}
          TASKS_WEBHOOK_URL: ${{ secrets.TASKS_WEBHOOK_URL }}
```

## Inputs

| Name              | Required | Description                                        |
| ----------------- | -------- | -------------------------------------------------- |
| NOTION_API_KEY    | `true`   | Notion integration internal secret                 |
| BUGS_DATABASE_ID  | `true`   | Target bugs Notion database ID _(located in URL)_  |
| TASKS_DATABASE_ID | `true`   | Target tasks Notion database ID _(located in URL)_ |
| BUGS_WEBHOOK_URL  | `true`   | Discord bugs channel webhook URL                   |
| TASKS_WEBHOOK_URL | `true`   | Discord tasks channel webhook URL                  |

## Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env` with the following variables:

   - `NOTION_API_KEY`
   - `BUGS_DATABASE_ID`
   - `TASKS_DATABASE_ID`
   - `BUGS_WEBHOOK_URL`
   - `TASKS_WEBHOOK_URL`

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
