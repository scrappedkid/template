# DingoDB

This page covers how to use the DingoDB ecosystem within LangChain.
It is broken into two parts: installation and setup, and then references to specific DingoDB wrappers.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

- Install the Python SDK with `pip install dingodb`

## VectorStore[​](#vectorstore "Direct link to VectorStore")

There exists a wrapper around DingoDB indexes, allowing you to use it as a vectorstore,
whether for semantic search or example selection.

To import this vectorstore:

```python
from langchain.vectorstores import Dingo  

```

For a more detailed walkthrough of the DingoDB wrapper, see [this notebook](/docs/integrations/vectorstores/dingo.html)

- [Installation and Setup](#installation-and-setup)
- [VectorStore](#vectorstore)
