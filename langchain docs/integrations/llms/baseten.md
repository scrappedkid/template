# Baseten

[Baseten](https://baseten.co) provides all the infrastructure you need to deploy and serve ML models performantly, scalably, and cost-efficiently.

This example demonstrates using Langchain with models deployed on Baseten.

# Setup

To run this notebook, you'll need a [Baseten account](https://baseten.co) and an [API key](https://docs.baseten.co/settings/api-keys).

You'll also need to install the Baseten Python package:

```bash
pip install baseten  

```

```python
import baseten  
  
baseten.login("YOUR\_API\_KEY")  

```

# Single model call

First, you'll need to deploy a model to Baseten.

You can deploy foundation models like WizardLM and Alpaca with one click from the [Baseten model library](https://app.baseten.co/explore/) or if you have your own model, [deploy it with this tutorial](https://docs.baseten.co/deploying-models/deploy).

In this example, we'll work with WizardLM. [Deploy WizardLM here](https://app.baseten.co/explore/llama) and follow along with the deployed [model's version ID](https://docs.baseten.co/managing-models/manage).

```python
from langchain.llms import Baseten  

```

```python
# Load the model  
wizardlm = Baseten(model="MODEL\_VERSION\_ID", verbose=True)  

```

```python
# Prompt the model  
  
wizardlm("What is the difference between a Wizard and a Sorcerer?")  

```

# Chained model calls

We can chain together multiple calls to one or multiple models, which is the whole point of Langchain!

This example uses WizardLM to plan a meal with an entree, three sides, and an alcoholic and non-alcoholic beverage pairing.

```python
from langchain.chains import SimpleSequentialChain  
from langchain.prompts import PromptTemplate  
from langchain.chains import LLMChain  

```

```python
# Build the first link in the chain  
  
prompt = PromptTemplate(  
 input\_variables=["cuisine"],  
 template="Name a complex entree for a {cuisine} dinner. Respond with just the name of a single dish.",  
)  
  
link\_one = LLMChain(llm=wizardlm, prompt=prompt)  

```

```python
# Build the second link in the chain  
  
prompt = PromptTemplate(  
 input\_variables=["entree"],  
 template="What are three sides that would go with {entree}. Respond with only a list of the sides.",  
)  
  
link\_two = LLMChain(llm=wizardlm, prompt=prompt)  

```

```python
# Build the third link in the chain  
  
prompt = PromptTemplate(  
 input\_variables=["sides"],  
 template="What is one alcoholic and one non-alcoholic beverage that would go well with this list of sides: {sides}. Respond with only the names of the beverages.",  
)  
  
link\_three = LLMChain(llm=wizardlm, prompt=prompt)  

```

```python
# Run the full chain!  
  
menu\_maker = SimpleSequentialChain(  
 chains=[link\_one, link\_two, link\_three], verbose=True  
)  
menu\_maker.run("South Indian")  

```
