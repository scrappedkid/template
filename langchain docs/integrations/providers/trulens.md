# TruLens

This page covers how to use [TruLens](https://trulens.org) to evaluate and track LLM apps built on langchain.

## What is TruLens?[​](#what-is-trulens "Direct link to What is TruLens?")

TruLens is an [open-source](https://github.com/truera/trulens) package that provides instrumentation and evaluation tools for large language model (LLM) based applications.

## Quick start[​](#quick-start "Direct link to Quick start")

Once you've created your LLM chain, you can use TruLens for evaluation and tracking. TruLens has a number of [out-of-the-box Feedback Functions](https://www.trulens.org/trulens_eval/feedback_functions/), and is also an extensible framework for LLM evaluation.

```python
# create a feedback function  
  
from trulens\_eval.feedback import Feedback, Huggingface, OpenAI  
# Initialize HuggingFace-based feedback function collection class:  
hugs = Huggingface()  
openai = OpenAI()  
  
# Define a language match feedback function using HuggingFace.  
lang\_match = Feedback(hugs.language\_match).on\_input\_output()  
# By default this will check language match on the main app input and main app  
# output.  
  
# Question/answer relevance between overall question and answer.  
qa\_relevance = Feedback(openai.relevance).on\_input\_output()  
# By default this will evaluate feedback on main app input and main app output.  
  
# Toxicity of input  
toxicity = Feedback(openai.toxicity).on\_input()  
  

```

After you've set up Feedback Function(s) for evaluating your LLM, you can wrap your application with TruChain to get detailed tracing, logging and evaluation of your LLM app.

```python
# wrap your chain with TruChain  
truchain = TruChain(  
 chain,  
 app\_id='Chain1\_ChatApplication',  
 feedbacks=[lang\_match, qa\_relevance, toxicity]  
)  
# Note: any `feedbacks` specified here will be evaluated and logged whenever the chain is used.  
truchain("que hora es?")  

```

Now you can explore your LLM-based application!

Doing so will help you understand how your LLM application is performing at a glance. As you iterate new versions of your LLM application, you can compare their performance across all of the different quality metrics you've set up. You'll also be able to view evaluations at a record level, and explore the chain metadata for each record.

```python
tru.run\_dashboard() # open a Streamlit app to explore  

```

For more information on TruLens, visit [trulens.org](https://www.trulens.org/)

- [What is TruLens?](#what-is-trulens)
- [Quick start](#quick-start)
