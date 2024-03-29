# Xata

[Xata](https://xata.io) is a serverless data platform, based on `PostgreSQL`.
It provides a Python SDK for interacting with your database, and a UI
for managing your data.
`Xata` has a native vector type, which can be added to any table, and
supports similarity search. LangChain inserts vectors directly to `Xata`,
and queries it for the nearest neighbors of a given vector, so that you can
use all the LangChain Embeddings integrations with `Xata`.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

We need to install `xata` python package.

```bash
pip install xata==1.0.0a7   

```

## Vector Store[​](#vector-store "Direct link to Vector Store")

See a [usage example](/docs/integrations/vectorstores/xata).

```python
from langchain.vectorstores import XataVectorStore  

```

- [Installation and Setup](#installation-and-setup)
- [Vector Store](#vector-store)
