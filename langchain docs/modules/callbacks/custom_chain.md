# Callbacks for custom chains

When you create a custom chain you can easily set it up to use the same callback system as all the built-in chains.
`_call`, `_generate`, `_run`, and equivalent async methods on Chains / LLMs / Chat Models / Agents / Tools now receive a 2nd argument called `run_manager` which is bound to that run, and contains the logging methods that can be used by that object (i.e. `on_llm_new_token`). This is useful when constructing a custom chain. See this guide for more information on how to [create custom chains and use callbacks inside them](/docs/modules/chains/how_to/custom_chain.html).
