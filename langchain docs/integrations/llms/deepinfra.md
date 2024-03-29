# DeepInfra

[DeepInfra](https://deepinfra.com/?utm_source=langchain) is a serverless inference as a service that provides access to a [variety of LLMs](https://deepinfra.com/models?utm_source=langchain) and [embeddings models](https://deepinfra.com/models?type=embeddings&utm_source=langchain). This notebook goes over how to use LangChain with DeepInfra for language models.

## Set the Environment API Key[​](#set-the-environment-api-key "Direct link to Set the Environment API Key")

Make sure to get your API key from DeepInfra. You have to [Login](https://deepinfra.com/login?from=%2Fdash) and get a new token.

You are given a 1 hour free of serverless GPU compute to test different models. (see [here](https://github.com/deepinfra/deepctl#deepctl))
You can print your token with `deepctl auth token`

```python
# get a new token: https://deepinfra.com/login?from=%2Fdash  
  
from getpass import getpass  
  
DEEPINFRA\_API\_TOKEN = getpass()  

```

```text
 ········  

```

```python
import os  
  
os.environ["DEEPINFRA\_API\_TOKEN"] = DEEPINFRA\_API\_TOKEN  

```

## Create the DeepInfra instance[​](#create-the-deepinfra-instance "Direct link to Create the DeepInfra instance")

You can also use our open-source [deepctl tool](https://github.com/deepinfra/deepctl#deepctl) to manage your model deployments. You can view a list of available parameters [here](https://deepinfra.com/databricks/dolly-v2-12b#API).

```python
from langchain.llms import DeepInfra  
  
llm = DeepInfra(model\_id="meta-llama/Llama-2-70b-chat-hf")  
llm.model\_kwargs = {  
 "temperature": 0.7,  
 "repetition\_penalty": 1.2,  
 "max\_new\_tokens": 250,  
 "top\_p": 0.9,  
}  

```

```python
# run inferences directly via wrapper  
llm("Who let the dogs out?")  

```

```text
 'This is a question that has puzzled many people'  

```

```python
# run streaming inference  
for chunk in llm.stream("Who let the dogs out?"):  
 print(chunk)  

```

```text
 Will  
 Smith  
 .  

```

## Create a Prompt Template[​](#create-a-prompt-template "Direct link to Create a Prompt Template")

We will create a prompt template for Question and Answer.

```python
from langchain.prompts import PromptTemplate  
  
template = """Question: {question}  
  
Answer: Let's think step by step."""  
  
prompt = PromptTemplate(template=template, input\_variables=["question"])  

```

## Initiate the LLMChain[​](#initiate-the-llmchain "Direct link to Initiate the LLMChain")

```python
from langchain.chains import LLMChain  
  
llm\_chain = LLMChain(prompt=prompt, llm=llm)  

```

## Run the LLMChain[​](#run-the-llmchain "Direct link to Run the LLMChain")

Provide a question and run the LLMChain.

```python
question = "Can penguins reach the North pole?"  
  
llm\_chain.run(question)  

```

```text
 "Penguins are found in Antarctica and the surrounding islands, which are located at the southernmost tip of the planet. The North Pole is located at the northernmost tip of the planet, and it would be a long journey for penguins to get there. In fact, penguins don't have the ability to fly or migrate over such long distances. So, no, penguins cannot reach the North Pole. "  

```

- [Set the Environment API Key](#set-the-environment-api-key)
- [Create the DeepInfra instance](#create-the-deepinfra-instance)
- [Create a Prompt Template](#create-a-prompt-template)
- [Initiate the LLMChain](#initiate-the-llmchain)
- [Run the LLMChain](#run-the-llmchain)
