# Anthropic

All functionality related to Anthropic models.

[Anthropic](https://www.anthropic.com/) is an AI safety and research company, and is the creator of Claude.
This page covers all integrations between Anthropic models and LangChain.

## Prompting Overview[​](#prompting-overview "Direct link to Prompting Overview")

Claude is chat-based model, meaning it is trained on conversation data.
However, it is a text based API, meaning it takes in single string.
It expects this string to be in a particular format.
This means that it is up the user to ensure that is the case.
LangChain provides several utilities and helper functions to make sure prompts that you write -
whether formatted as a string or as a list of messages - end up formatted correctly.

Specifically, Claude is trained to fill in text for the Assistant role as part of an ongoing dialogue
between a human user (`Human:`) and an AI assistant (`Assistant:`). Prompts sent via the API must contain
`\n\nHuman:` and `\n\nAssistant:` as the signals of who's speaking.
The final turn must always be `\n\nAssistant:` - the input string cannot have `\n\nHuman:` as the final role.

Because Claude is chat-based but accepts a string as input, it can be treated as either a LangChain `ChatModel` or `LLM`.
This means there are two wrappers in LangChain - `ChatAnthropic` and `Anthropic`.
It is generally recommended to use the `ChatAnthropic` wrapper, and format your prompts as `ChatMessage`s (we will show examples of this below).
This is because it keeps your prompt in a general format that you can easily then also use with other models (should you want to).
However, if you want more fine-grained control over the prompt, you can use the `Anthropic` wrapper - we will show and example of this as well.
The `Anthropic` wrapper however is deprecated, as all functionality can be achieved in a more generic way using `ChatAnthropic`.

## Prompting Best Practices[​](#prompting-best-practices "Direct link to Prompting Best Practices")

Anthropic models have several prompting best practices compared to OpenAI models.

**No System Messages**

Anthropic models are not trained on the concept of a "system message".
We have worked with the Anthropic team to handle them somewhat appropriately (a Human message with an `admin` tag)
but this is largely a hack and it is recommended that you do not use system messages.

**AI Messages Can Continue**

A completion from Claude is a continuation of the last text in the string which allows you further control over Claude's output.
For example, putting words in Claude's mouth in a prompt like this:

`\n\nHuman: Tell me a joke about bears\n\nAssistant: What do you call a bear with no teeth?`

This will return a completion like this `A gummy bear!` instead of a whole new assistant message with a different random bear joke.

## `ChatAnthropic`[​](#chatanthropic "Direct link to chatanthropic")

`ChatAnthropic` is a subclass of LangChain's `ChatModel`, meaning it works best with `ChatPromptTemplate`.
You can import this wrapper with the following code:

```text
from langchain.chat\_models import ChatAnthropic  
model = ChatAnthropic()  

```

When working with ChatModels, it is preferred that you design your prompts as `ChatPromptTemplate`s.
Here is an example below of doing that:

```text
from langchain.prompts import ChatPromptTemplate  
  
prompt = ChatPromptTemplate.from\_messages([  
 ("system", "You are a helpful chatbot"),  
 ("human", "Tell me a joke about {topic}"),  
])  

```

You can then use this in a chain as follows:

```text
chain = prompt | model  
chain.invoke({"topic": "bears"})  

```

How is the prompt actually being formatted under the hood? We can see that by running the following code

```text
prompt\_value = prompt.format\_prompt(topic="bears")  
model.convert\_prompt(prompt\_value)  

```

This produces the following formatted string:

```text
'\n\nHuman: <admin>You are a helpful chatbot</admin>\n\nHuman: Tell me a joke about bears\n\nAssistant:'  

```

We can see that under the hood LangChain is representing `SystemMessage`s with `Human: <admin>...</admin>`,
and is appending an assistant message to the end IF the last message is NOT already an assistant message.

If you decide instead to use a normal PromptTemplate (one that just works on a single string) let's take a look at
what happens:

```text
from langchain.prompts import PromptTemplate  
  
prompt = PromptTemplate.from\_template("Tell me a joke about {topic}")  
prompt\_value = prompt.format\_prompt(topic="bears")  
model.convert\_prompt(prompt\_value)  

```

This produces the following formatted string:

```text
'\n\nHuman: Tell me a joke about bears\n\nAssistant:'  

```

We can see that it automatically adds the Human and Assistant tags.
What is happening under the hood?
First: the string gets converted to a single human message. This happens generically (because we are using a subclass of `ChatModel`).
Then, similarly to the above example, an empty Assistant message is getting appended.
This is Anthropic specific.

## \[Deprecated\] `Anthropic`[​](#deprecated-anthropic "Direct link to deprecated-anthropic")

This `Anthropic` wrapper is subclassed from `LLM`.
We can import it with:

```text
from langchain.llms import Anthropic  
model = Anthropic()  

```

This model class is designed to work with normal PromptTemplates. An example of that is below:

```text
prompt = PromptTemplate.from\_template("Tell me a joke about {topic}")  
chain = prompt | model  
chain.invoke({"topic": "bears"})  

```

Let's see what is going on with the prompt templating under the hood!

```text
prompt\_value = prompt.format\_prompt(topic="bears")  
model.convert\_prompt(prompt\_value)  

```

This outputs the following

```text
'\n\nHuman: Tell me a joke about bears\n\nAssistant: Sure, here you go:\n'  

```

Notice that it adds the Human tag at the start of the string, and then finishes it with `\n\nAssistant: Sure, here you go:`.
The extra `Sure, here you go` was added on purpose by the Anthropic team.

What happens if we have those symbols in the prompt directly?

```text
prompt = PromptTemplate.from\_template("Human: Tell me a joke about {topic}")  
prompt\_value = prompt.format\_prompt(topic="bears")  
model.convert\_prompt(prompt\_value)  

```

This outputs:

```text
'\n\nHuman: Tell me a joke about bears'  

```

We can see that we detect that the user is trying to use the special tokens, and so we don't do any formatting.

- [Prompting Overview](#prompting-overview)
- [Prompting Best Practices](#prompting-best-practices)
- [`ChatAnthropic`](#chatanthropic)
- [Deprecated `Anthropic`](#deprecated-anthropic)
