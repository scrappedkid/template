# Infino

[Infino](https://github.com/infinohq/infino) is an open-source observability platform that stores both metrics and application logs together.

Key features of `Infino` include:

- **Metrics Tracking**: Capture time taken by LLM model to handle request, errors, number of tokens, and costing indication for the particular LLM.
- **Data Tracking**: Log and store prompt, request, and response data for each LangChain interaction.
- **Graph Visualization**: Generate basic graphs over time, depicting metrics such as request duration, error occurrences, token count, and cost.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

First, you'll need to install the `infinopy` Python package as follows:

```bash
pip install infinopy  

```

If you already have an `Infino Server` running, then you're good to go; but if
you don't, follow the next steps to start it:

- Make sure you have Docker installed
- Run the following in your terminal:

```text
docker run --rm --detach --name infino-example -p 3000:3000 infinohq/infino:latest  

```

```text
docker run --rm --detach --name infino-example -p 3000:3000 infinohq/infino:latest  

```

## Using Infino[​](#using-infino "Direct link to Using Infino")

See a [usage example of `InfinoCallbackHandler`](/docs/integrations/callbacks/infino.html).

```python
from langchain.callbacks import InfinoCallbackHandler  

```

- [Installation and Setup](#installation-and-setup)
- [Using Infino](#using-infino)
