# Argilla

![Argilla - Open-source data platform for LLMs](https://argilla.io/og.png)

![Argilla - Open-source data platform for LLMs](https://argilla.io/og.png)

[Argilla](https://argilla.io/) is an open-source data curation platform for LLMs.
Using Argilla, everyone can build robust language models through faster data curation
using both human and machine feedback. We provide support for each step in the MLOps cycle,
from data labeling to model monitoring.

![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)

In this guide we will demonstrate how to track the inputs and responses of your LLM to generate a dataset in Argilla, using the `ArgillaCallbackHandler`.

It's useful to keep track of the inputs and outputs of your LLMs to generate datasets for future fine-tuning. This is especially useful when you're using a LLM to generate data for a specific task, such as question answering, summarization, or translation.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

```bash
pip install argilla --upgrade  
pip install openai  

```

### Getting API Credentials[​](#getting-api-credentials "Direct link to Getting API Credentials")

To get the Argilla API credentials, follow the next steps:

1. Go to your Argilla UI.
1. Click on your profile picture and go to "My settings".
1. Then copy the API Key.

In Argilla the API URL will be the same as the URL of your Argilla UI.

To get the OpenAI API credentials, please visit <https://platform.openai.com/account/api-keys>

```python
import os  
  
os.environ["ARGILLA\_API\_URL"] = "..."  
os.environ["ARGILLA\_API\_KEY"] = "..."  
  
os.environ["OPENAI\_API\_KEY"] = "..."  

```

### Setup Argilla[​](#setup-argilla "Direct link to Setup Argilla")

To use the `ArgillaCallbackHandler` we will need to create a new `FeedbackDataset` in Argilla to keep track of your LLM experiments. To do so, please use the following code:

```python
import argilla as rg  

```

```python
from packaging.version import parse as parse\_version  
  
if parse\_version(rg.\_\_version\_\_) < parse\_version("1.8.0"):  
 raise RuntimeError(  
 "`FeedbackDataset` is only available in Argilla v1.8.0 or higher, please "  
 "upgrade `argilla` as `pip install argilla --upgrade`."  
 )  

```

```python
dataset = rg.FeedbackDataset(  
 fields=[  
 rg.TextField(name="prompt"),  
 rg.TextField(name="response"),  
 ],  
 questions=[  
 rg.RatingQuestion(  
 name="response-rating",  
 description="How would you rate the quality of the response?",  
 values=[1, 2, 3, 4, 5],  
 required=True,  
 ),  
 rg.TextQuestion(  
 name="response-feedback",  
 description="What feedback do you have for the response?",  
 required=False,  
 ),  
 ],  
 guidelines="You're asked to rate the quality of the response and provide feedback.",  
)  
  
rg.init(  
 api\_url=os.environ["ARGILLA\_API\_URL"],  
 api\_key=os.environ["ARGILLA\_API\_KEY"],  
)  
  
dataset.push\_to\_argilla("langchain-dataset");  

```

📌 NOTE: at the moment, just the prompt-response pairs are supported as `FeedbackDataset.fields`, so the `ArgillaCallbackHandler` will just track the prompt i.e. the LLM input, and the response i.e. the LLM output.

## Tracking[​](#tracking "Direct link to Tracking")

To use the `ArgillaCallbackHandler` you can either use the following code, or just reproduce one of the examples presented in the following sections.

```python
from langchain.callbacks import ArgillaCallbackHandler  
  
argilla\_callback = ArgillaCallbackHandler(  
 dataset\_name="langchain-dataset",  
 api\_url=os.environ["ARGILLA\_API\_URL"],  
 api\_key=os.environ["ARGILLA\_API\_KEY"],  
)  

```

### Scenario 1: Tracking an LLM[​](#scenario-1-tracking-an-llm "Direct link to Scenario 1: Tracking an LLM")

First, let's just run a single LLM a few times and capture the resulting prompt-response pairs in Argilla.

```python
from langchain.callbacks import ArgillaCallbackHandler, StdOutCallbackHandler  
from langchain.llms import OpenAI  
  
argilla\_callback = ArgillaCallbackHandler(  
 dataset\_name="langchain-dataset",  
 api\_url=os.environ["ARGILLA\_API\_URL"],  
 api\_key=os.environ["ARGILLA\_API\_KEY"],  
)  
callbacks = [StdOutCallbackHandler(), argilla\_callback]  
  
llm = OpenAI(temperature=0.9, callbacks=callbacks)  
llm.generate(["Tell me a joke", "Tell me a poem"] \* 3)  

```

```text
 LLMResult(generations=[[Generation(text='\n\nQ: What did the fish say when he hit the wall? \nA: Dam.', generation\_info={'finish\_reason': 'stop', 'logprobs': None})], [Generation(text='\n\nThe Moon \n\nThe moon is high in the midnight sky,\nSparkling like a star above.\nThe night so peaceful, so serene,\nFilling up the air with love.\n\nEver changing and renewing,\nA never-ending light of grace.\nThe moon remains a constant view,\nA reminder of life’s gentle pace.\n\nThrough time and space it guides us on,\nA never-fading beacon of hope.\nThe moon shines down on us all,\nAs it continues to rise and elope.', generation\_info={'finish\_reason': 'stop', 'logprobs': None})], [Generation(text='\n\nQ. What did one magnet say to the other magnet?\nA. "I find you very attractive!"', generation\_info={'finish\_reason': 'stop', 'logprobs': None})], [Generation(text="\n\nThe world is charged with the grandeur of God.\nIt will flame out, like shining from shook foil;\nIt gathers to a greatness, like the ooze of oil\nCrushed. Why do men then now not reck his rod?\n\nGenerations have trod, have trod, have trod;\nAnd all is seared with trade; bleared, smeared with toil;\nAnd wears man's smudge and shares man's smell: the soil\nIs bare now, nor can foot feel, being shod.\n\nAnd for all this, nature is never spent;\nThere lives the dearest freshness deep down things;\nAnd though the last lights off the black West went\nOh, morning, at the brown brink eastward, springs —\n\nBecause the Holy Ghost over the bent\nWorld broods with warm breast and with ah! bright wings.\n\n~Gerard Manley Hopkins", generation\_info={'finish\_reason': 'stop', 'logprobs': None})], [Generation(text='\n\nQ: What did one ocean say to the other ocean?\nA: Nothing, they just waved.', generation\_info={'finish\_reason': 'stop', 'logprobs': None})], [Generation(text="\n\nA poem for you\n\nOn a field of green\n\nThe sky so blue\n\nA gentle breeze, the sun above\n\nA beautiful world, for us to love\n\nLife is a journey, full of surprise\n\nFull of joy and full of surprise\n\nBe brave and take small steps\n\nThe future will be revealed with depth\n\nIn the morning, when dawn arrives\n\nA fresh start, no reason to hide\n\nSomewhere down the road, there's a heart that beats\n\nBelieve in yourself, you'll always succeed.", generation\_info={'finish\_reason': 'stop', 'logprobs': None})]], llm\_output={'token\_usage': {'completion\_tokens': 504, 'total\_tokens': 528, 'prompt\_tokens': 24}, 'model\_name': 'text-davinci-003'})  

```

![Argilla UI with LangChain LLM input-response](https://docs.argilla.io/en/latest/_images/llm.png)

![Argilla UI with LangChain LLM input-response](https://docs.argilla.io/en/latest/_images/llm.png)

### Scenario 2: Tracking an LLM in a chain[​](#scenario-2-tracking-an-llm-in-a-chain "Direct link to Scenario 2: Tracking an LLM in a chain")

Then we can create a chain using a prompt template, and then track the initial prompt and the final response in Argilla.

```python
from langchain.callbacks import ArgillaCallbackHandler, StdOutCallbackHandler  
from langchain.llms import OpenAI  
from langchain.chains import LLMChain  
from langchain.prompts import PromptTemplate  
  
argilla\_callback = ArgillaCallbackHandler(  
 dataset\_name="langchain-dataset",  
 api\_url=os.environ["ARGILLA\_API\_URL"],  
 api\_key=os.environ["ARGILLA\_API\_KEY"],  
)  
callbacks = [StdOutCallbackHandler(), argilla\_callback]  
llm = OpenAI(temperature=0.9, callbacks=callbacks)  
  
template = """You are a playwright. Given the title of play, it is your job to write a synopsis for that title.  
Title: {title}  
Playwright: This is a synopsis for the above play:"""  
prompt\_template = PromptTemplate(input\_variables=["title"], template=template)  
synopsis\_chain = LLMChain(llm=llm, prompt=prompt\_template, callbacks=callbacks)  
  
test\_prompts = [{"title": "Documentary about Bigfoot in Paris"}]  
synopsis\_chain.apply(test\_prompts)  

```

```text
   
   
 > Entering new LLMChain chain...  
 Prompt after formatting:  
 You are a playwright. Given the title of play, it is your job to write a synopsis for that title.  
 Title: Documentary about Bigfoot in Paris  
 Playwright: This is a synopsis for the above play:  
   
 > Finished chain.  
  
  
  
  
  
 [{'text': "\n\nDocumentary about Bigfoot in Paris focuses on the story of a documentary filmmaker and their search for evidence of the legendary Bigfoot creature in the city of Paris. The play follows the filmmaker as they explore the city, meeting people from all walks of life who have had encounters with the mysterious creature. Through their conversations, the filmmaker unravels the story of Bigfoot and finds out the truth about the creature's presence in Paris. As the story progresses, the filmmaker learns more and more about the mysterious creature, as well as the different perspectives of the people living in the city, and what they think of the creature. In the end, the filmmaker's findings lead them to some surprising and heartwarming conclusions about the creature's existence and the importance it holds in the lives of the people in Paris."}]  

```

![Argilla UI with LangChain Chain input-response](https://docs.argilla.io/en/latest/_images/chain.png)

![Argilla UI with LangChain Chain input-response](https://docs.argilla.io/en/latest/_images/chain.png)

### Scenario 3: Using an Agent with Tools[​](#scenario-3-using-an-agent-with-tools "Direct link to Scenario 3: Using an Agent with Tools")

Finally, as a more advanced workflow, you can create an agent that uses some tools. So that `ArgillaCallbackHandler` will keep track of the input and the output, but not about the intermediate steps/thoughts, so that given a prompt we log the original prompt and the final response to that given prompt.

Note that for this scenario we'll be using Google Search API (Serp API) so you will need to both install `google-search-results` as `pip install google-search-results`, and to set the Serp API Key as `os.environ["SERPAPI_API_KEY"] = "..."` (you can find it at <https://serpapi.com/dashboard>), otherwise the example below won't work.

```python
from langchain.agents import AgentType, initialize\_agent, load\_tools  
from langchain.callbacks import ArgillaCallbackHandler, StdOutCallbackHandler  
from langchain.llms import OpenAI  
  
argilla\_callback = ArgillaCallbackHandler(  
 dataset\_name="langchain-dataset",  
 api\_url=os.environ["ARGILLA\_API\_URL"],  
 api\_key=os.environ["ARGILLA\_API\_KEY"],  
)  
callbacks = [StdOutCallbackHandler(), argilla\_callback]  
llm = OpenAI(temperature=0.9, callbacks=callbacks)  
  
tools = load\_tools(["serpapi"], llm=llm, callbacks=callbacks)  
agent = initialize\_agent(  
 tools,  
 llm,  
 agent=AgentType.ZERO\_SHOT\_REACT\_DESCRIPTION,  
 callbacks=callbacks,  
)  
agent.run("Who was the first president of the United States of America?")  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 I need to answer a historical question  
 Action: Search  
 Action Input: "who was the first president of the United States of America"   
 Observation: George Washington  
 Thought: George Washington was the first president  
 Final Answer: George Washington was the first president of the United States of America.  
   
 > Finished chain.  
  
  
  
  
  
 'George Washington was the first president of the United States of America.'  

```

![Argilla UI with LangChain Agent input-response](https://docs.argilla.io/en/latest/_images/agent.png)

![Argilla UI with LangChain Agent input-response](https://docs.argilla.io/en/latest/_images/agent.png)

- [Installation and Setup](#installation-and-setup)

  - [Getting API Credentials](#getting-api-credentials)
  - [Setup Argilla](#setup-argilla)

- [Tracking](#tracking)

  - [Scenario 1: Tracking an LLM](#scenario-1-tracking-an-llm)
  - [Scenario 2: Tracking an LLM in a chain](#scenario-2-tracking-an-llm-in-a-chain)
  - [Scenario 3: Using an Agent with Tools](#scenario-3-using-an-agent-with-tools)

- [Getting API Credentials](#getting-api-credentials)

- [Setup Argilla](#setup-argilla)

- [Scenario 1: Tracking an LLM](#scenario-1-tracking-an-llm)

- [Scenario 2: Tracking an LLM in a chain](#scenario-2-tracking-an-llm-in-a-chain)

- [Scenario 3: Using an Agent with Tools](#scenario-3-using-an-agent-with-tools)
