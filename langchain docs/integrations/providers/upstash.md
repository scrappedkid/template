# Upstash Redis

Upstash offers developers serverless databases and messaging platforms to build powerful applications without having to worry about the operational complexity of running databases at scale.

This page covers how to use [Upstash Redis](https://upstash.com/redis) with LangChain.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

- Upstash Redis Python SDK can be installed with `pip install upstash-redis`
- A globally distributed, low-latency and highly available database can be created at the [Upstash Console](https://console.upstash.com)

## Integrations[​](#integrations "Direct link to Integrations")

All of Upstash-LangChain integrations are based on `upstash-redis` Python SDK being utilized as wrappers for LangChain.
This SDK utilizes Upstash Redis DB by giving UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN parameters from the console.
One significant advantage of this is that, this SDK uses a REST API. This means, you can run this in serverless platforms, edge or any platform that does not support TCP connections.

### Cache[​](#cache "Direct link to Cache")

[Upstash Redis](https://upstash.com/redis) can be used as a cache for LLM prompts and responses.

To import this cache:

```python
from langchain.cache import UpstashRedisCache  

```

To use with your LLMs:

```python
import langchain  
from upstash\_redis import Redis  
  
URL = "<UPSTASH\_REDIS\_REST\_URL>"  
TOKEN = "<UPSTASH\_REDIS\_REST\_TOKEN>"  
  
langchain.llm\_cache = UpstashRedisCache(redis\_=Redis(url=URL, token=TOKEN))  

```

### Memory[​](#memory "Direct link to Memory")

Upstash Redis can be used to persist LLM conversations.

#### Chat Message History Memory[​](#chat-message-history-memory "Direct link to Chat Message History Memory")

An example of Upstash Redis for caching conversation message history can be seen in [this notebook](/docs/integrations/memory/upstash_redis_chat_message_history.html).

- [Installation and Setup](#installation-and-setup)

- [Integrations](#integrations)

  - [Cache](#cache)
  - [Memory](#memory)

- [Cache](#cache)

- [Memory](#memory)
