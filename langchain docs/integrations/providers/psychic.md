# Psychic

[Psychic](https://www.psychic.dev/) is a platform for integrating with SaaS tools like `Notion`, `Zendesk`,
`Confluence`, and `Google Drive` via OAuth and syncing documents from these applications to your SQL or vector
database. You can think of it like Plaid for unstructured data.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

```bash
pip install psychicapi  

```

Psychic is easy to set up - you import the `react` library and configure it with your `Sidekick API` key, which you get
from the [Psychic dashboard](https://dashboard.psychic.dev/). When you connect the applications, you

view these connections from the dashboard and retrieve data using the server-side libraries.

1. Create an account in the [dashboard](https://dashboard.psychic.dev/).
1. Use the [react library](https://docs.psychic.dev/sidekick-link) to add the Psychic link modal to your frontend react app. You will use this to connect the SaaS apps.
1. Once you have created a connection, you can use the `PsychicLoader` by following the [example notebook](/docs/integrations/document_loaders/psychic.html)

## Advantages vs Other Document Loaders[​](#advantages-vs-other-document-loaders "Direct link to Advantages vs Other Document Loaders")

1. **Universal API:** Instead of building OAuth flows and learning the APIs for every SaaS app, you integrate Psychic once and leverage our universal API to retrieve data.
1. **Data Syncs:** Data in your customers' SaaS apps can get stale fast. With Psychic you can configure webhooks to keep your documents up to date on a daily or realtime basis.
1. **Simplified OAuth:** Psychic handles OAuth end-to-end so that you don't have to spend time creating OAuth clients for each integration, keeping access tokens fresh, and handling OAuth redirect logic.

- [Installation and Setup](#installation-and-setup)
- [Advantages vs Other Document Loaders](#advantages-vs-other-document-loaders)
