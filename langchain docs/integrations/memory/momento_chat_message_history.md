# Momento Cache

[Momento Cache](https://docs.momentohq.com/) is the world's first truly serverless caching service. It provides instant elasticity, scale-to-zero
capability, and blazing-fast performance.

This notebook goes over how to use [Momento Cache](https://www.gomomento.com/services/cache) to store chat message history using the `MomentoChatMessageHistory` class. See the Momento [docs](https://docs.momentohq.com/getting-started) for more detail on how to get set up with Momento.

Note that, by default we will create a cache if one with the given name doesn't already exist.

You'll need to get a Momento API key to use this class. This can either be passed in to a momento.CacheClient if you'd like to instantiate that directly, as a named parameter `api_key` to `MomentoChatMessageHistory.from_client_params`, or can just be set as an environment variable `MOMENTO_API_KEY`.

```python
from datetime import timedelta  
  
from langchain.memory import MomentoChatMessageHistory  
  
session\_id = "foo"  
cache\_name = "langchain"  
ttl = timedelta(days=1)  
history = MomentoChatMessageHistory.from\_client\_params(  
 session\_id,  
 cache\_name,  
 ttl,  
)  
  
history.add\_user\_message("hi!")  
  
history.add\_ai\_message("whats up?")  

```

```python
history.messages  

```

```text
 [HumanMessage(content='hi!', additional\_kwargs={}, example=False),  
 AIMessage(content='whats up?', additional\_kwargs={}, example=False)]  

```
