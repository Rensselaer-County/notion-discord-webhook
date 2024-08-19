# Notion-Discord Webhook

Looks for new pages in a Notion database and sends them to a Discord channel

## Development

1. Create `.env` with following variables:

   - `NOTION_API_KEY`
   - `DATABASE_ID`
   - `WEBHOOK_URL`

2. Run:

```bash
npx tsc && node src/index.js
```

> [!NOTE]
>
> `POLL_RATE` constant in `./src.index.ts` should equal to the cron schedule in `.github/workflows/schedule.yml`
