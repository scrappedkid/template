# Tools

Head to [Integrations](/docs/integrations/tools/) for documentation on built-in tool integrations.

Tools are interfaces that an agent can use to interact with the world.

## Get started[​](#get-started "Direct link to Get started")

Tools are functions that agents can use to interact with the world.
These tools can be generic utilities (e.g. search), other chains, or even other agents.

Currently, tools can be loaded with the following snippet:

```python
from langchain.agents import load\_tools  
tool\_names = [...]  
tools = load\_tools(tool\_names)  

```

Some tools (e.g. chains, agents) may require a base LLM to use to initialize them.
In that case, you can pass in an LLM as well:

```python
from langchain.agents import load\_tools  
tool\_names = [...]  
llm = ...  
tools = load\_tools(tool\_names, llm=llm)  

```

- [Get started](#get-started)
