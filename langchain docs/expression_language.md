# LangChain Expression Language (LCEL)

LangChain Expression Language or LCEL is a declarative way to easily compose chains together.
There are several benefits to writing chains in this manner (as opposed to writing normal code):

**Async, Batch, and Streaming Support**
Any chain constructed this way will automatically have full sync, async, batch, and streaming support.
This makes it easy to prototype a chain in a Jupyter notebook using the sync interface, and then expose it as an async streaming interface.

**Fallbacks**
The non-determinism of LLMs makes it important to be able to handle errors gracefully.
With LCEL you can easily attach fallbacks to any chain.

**Parallelism**
Since LLM applications involve (sometimes long) API calls, it often becomes important to run things in parallel.
With LCEL syntax, any components that can be run in parallel automatically are.

**Seamless LangSmith Tracing Integration**
As your chains get more and more complex, it becomes increasingly important to understand what exactly is happening at every step.
With LCEL, **all** steps are automatically logged to [LangSmith](https://smith.langchain.com) for maximal observability and debuggability.

#### [Interface](/docs/expression_language/interface)[​](#interface "Direct link to interface")

The base interface shared by all LCEL objects

#### [How to](/docs/expression_language/how_to)[​](#how-to "Direct link to how-to")

How to use core features of LCEL

#### [Cookbook](/docs/expression_language/cookbook)[​](#cookbook "Direct link to cookbook")

Examples of common LCEL usage patterns

#### [Why use LCEL](/docs/expression_language/why)[​](#why-use-lcel "Direct link to why-use-lcel")

A deeper dive into the benefits of LCEL
