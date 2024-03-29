# PromptLayer ChatOpenAI

This example showcases how to connect to [PromptLayer](https://www.promptlayer.com) to start recording your ChatOpenAI requests.

## Install PromptLayer[​](#install-promptlayer "Direct link to Install PromptLayer")

The `promptlayer` package is required to use PromptLayer with OpenAI. Install `promptlayer` using pip.

```python
pip install promptlayer  

```

## Imports[​](#imports "Direct link to Imports")

```python
import os  
from langchain.chat\_models import PromptLayerChatOpenAI  
from langchain.schema import HumanMessage  

```

## Set the Environment API Key[​](#set-the-environment-api-key "Direct link to Set the Environment API Key")

You can create a PromptLayer API Key at [www.promptlayer.com](https://www.promptlayer.com) by clicking the settings cog in the navbar.

Set it as an environment variable called `PROMPTLAYER_API_KEY`.

```python
os.environ["PROMPTLAYER\_API\_KEY"] = "\*\*\*\*\*\*\*\*\*\*"  

```

## Use the PromptLayerOpenAI LLM like normal[​](#use-the-promptlayeropenai-llm-like-normal "Direct link to Use the PromptLayerOpenAI LLM like normal")

*You can optionally pass in `pl_tags` to track your requests with PromptLayer's tagging feature.*

```python
chat = PromptLayerChatOpenAI(pl\_tags=["langchain"])  
chat([HumanMessage(content="I am a cat and I want")])  

```

```text
 AIMessage(content='to take a nap in a cozy spot. I search around for a suitable place and finally settle on a soft cushion on the window sill. I curl up into a ball and close my eyes, relishing the warmth of the sun on my fur. As I drift off to sleep, I can hear the birds chirping outside and feel the gentle breeze blowing through the window. This is the life of a contented cat.', additional\_kwargs={})  

```

**The above request should now appear on your [PromptLayer dashboard](https://www.promptlayer.com).**

## Using PromptLayer Track[​](#using-promptlayer-track "Direct link to Using PromptLayer Track")

If you would like to use any of the [PromptLayer tracking features](https://magniv.notion.site/Track-4deee1b1f7a34c1680d085f82567dab9), you need to pass the argument `return_pl_id` when instantiating the PromptLayer LLM to get the request id.

```python
chat = PromptLayerChatOpenAI(return\_pl\_id=True)  
chat\_results = chat.generate([[HumanMessage(content="I am a cat and I want")]])  
  
for res in chat\_results.generations:  
 pl\_request\_id = res[0].generation\_info["pl\_request\_id"]  
 promptlayer.track.score(request\_id=pl\_request\_id, score=100)  

```

Using this allows you to track the performance of your model in the PromptLayer dashboard. If you are using a prompt template, you can attach a template to a request as well.
Overall, this gives you the opportunity to track the performance of different templates and models in the PromptLayer dashboard.

- [Install PromptLayer](#install-promptlayer)
- [Imports](#imports)
- [Set the Environment API Key](#set-the-environment-api-key)
- [Use the PromptLayerOpenAI LLM like normal](#use-the-promptlayeropenai-llm-like-normal)
- [Using PromptLayer Track](#using-promptlayer-track)
