# DeepInfra

This page covers how to use the DeepInfra ecosystem within LangChain.
It is broken into two parts: installation and setup, and then references to specific DeepInfra wrappers.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

- Get your DeepInfra api key from this link [here](https://deepinfra.com/).
- Get an DeepInfra api key and set it as an environment variable (`DEEPINFRA_API_TOKEN`)

## Available Models[​](#available-models "Direct link to Available Models")

DeepInfra provides a range of Open Source LLMs ready for deployment.
You can list supported models for
[text-generation](https://deepinfra.com/models?type=text-generation) and
[embeddings](https://deepinfra.com/models?type=embeddings).
google/flan\* models can be viewed [here](https://deepinfra.com/models?type=text2text-generation).

You can view a [list of request and response parameters](https://deepinfra.com/meta-llama/Llama-2-70b-chat-hf/api).

## Wrappers[​](#wrappers "Direct link to Wrappers")

### LLM[​](#llm "Direct link to LLM")

There exists an DeepInfra LLM wrapper, which you can access with

```python
from langchain.llms import DeepInfra  

```

### Embeddings[​](#embeddings "Direct link to Embeddings")

There is also an DeepInfra Embeddings wrapper, you can access with

```python
from langchain.embeddings import DeepInfraEmbeddings  

```

- [Installation and Setup](#installation-and-setup)

- [Available Models](#available-models)

- [Wrappers](#wrappers)

  - [LLM](#llm)
  - [Embeddings](#embeddings)

- [LLM](#llm)

- [Embeddings](#embeddings)
