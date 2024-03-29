# Minimax

[Minimax](https://api.minimax.chat) is a Chinese startup that provides natural language processing models
for companies and individuals.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

Get a [Minimax api key](https://api.minimax.chat/user-center/basic-information/interface-key) and set it as an environment variable (`MINIMAX_API_KEY`)
Get a [Minimax group id](https://api.minimax.chat/user-center/basic-information) and set it as an environment variable (`MINIMAX_GROUP_ID`)

## LLM[​](#llm "Direct link to LLM")

There exists a Minimax LLM wrapper, which you can access with
See a [usage example](/docs/modules/model_io/models/llms/integrations/minimax.html).

```python
from langchain.llms import Minimax  

```

## Chat Models[​](#chat-models "Direct link to Chat Models")

See a [usage example](/docs/modules/model_io/models/chat/integrations/minimax.html)

```python
from langchain.chat\_models import MiniMaxChat  

```

## Text Embedding Model[​](#text-embedding-model "Direct link to Text Embedding Model")

There exists a Minimax Embedding model, which you can access with

```python
from langchain.embeddings import MiniMaxEmbeddings  

```

- [Installation and Setup](#installation-and-setup)
- [LLM](#llm)
- [Chat Models](#chat-models)
- [Text Embedding Model](#text-embedding-model)
