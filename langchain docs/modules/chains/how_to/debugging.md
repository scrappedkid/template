# Debugging chains

It can be hard to debug a `Chain` object solely from its output as most `Chain` objects involve a fair amount of input prompt preprocessing and LLM output post-processing.

Setting `verbose` to `True` will print out some internal states of the `Chain` object while it is being ran.

```python
conversation = ConversationChain(  
 llm=chat,  
 memory=ConversationBufferMemory(),  
 verbose=True  
)  
conversation.run("What is ChatGPT?")  

```

```text
 > Entering new ConversationChain chain...  
 Prompt after formatting:  
 The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.  
  
 Current conversation:  
  
 Human: What is ChatGPT?  
 AI:  
  
 > Finished chain.  
  
 'ChatGPT is an AI language model developed by OpenAI. It is based on the GPT-3 architecture and is capable of generating human-like responses to text prompts. ChatGPT has been trained on a massive amount of text data and can understand and respond to a wide range of topics. It is often used for chatbots, virtual assistants, and other conversational AI applications.'  

```
