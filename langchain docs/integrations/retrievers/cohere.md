# Cohere RAG retriever

This notebook covers how to get started with Cohere RAG retriever. This allows you to leverage the ability to search documents over various connectors or by supplying your own.

```python
from langchain.chat\_models import ChatCohere  
from langchain.retrievers import CohereRagRetriever  
from langchain.schema.document import Document  

```

```python
rag = CohereRagRetriever(llm=ChatCohere())  

```

```python
def \_pretty\_print(docs):  
 for doc in docs:  
 print(doc.metadata)  
 print("\n\n" + doc.page\_content)  
 print("\n\n" + "-" \* 30 + "\n\n")  

```

```python
\_pretty\_print(rag.get\_relevant\_documents("What is cohere ai?"))  

```

```text
 {'id': 'web-search\_4:0', 'snippet': 'AI startup Cohere, now valued at over $2.1B, raises $270M\n\nKyle Wiggers 4 months\n\nIn a sign that there’s plenty of cash to go around for generative AI startups, Cohere, which is developing an AI model ecosystem for the enterprise, today announced that it raised $270 million as part of its Series C round.\n\nReuters reported earlier in the year that Cohere was in talks to raise “hundreds of millions” of dollars at a valuation of upward of just over $6 billion. If there’s credence to that reporting, Cohere appears to have missed the valuation mark substantially; a source familiar with the matter tells TechCrunch that this tranche values the company at between $2.1 billion and $2.2 billion.', 'title': 'AI startup Cohere, now valued at over $2.1B, raises $270M | TechCrunch', 'url': 'https://techcrunch.com/2023/06/08/ai-startup-cohere-now-valued-at-over-2-1b-raises-270m/'}  
   
   
 AI startup Cohere, now valued at over $2.1B, raises $270M  
   
 Kyle Wiggers 4 months  
   
 In a sign that there’s plenty of cash to go around for generative AI startups, Cohere, which is developing an AI model ecosystem for the enterprise, today announced that it raised $270 million as part of its Series C round.  
   
 Reuters reported earlier in the year that Cohere was in talks to raise “hundreds of millions” of dollars at a valuation of upward of just over $6 billion. If there’s credence to that reporting, Cohere appears to have missed the valuation mark substantially; a source familiar with the matter tells TechCrunch that this tranche values the company at between $2.1 billion and $2.2 billion.  
   
   
 ------------------------------  
   
   
 {'id': 'web-search\_9:0', 'snippet': 'Cohere is a Canadian multinational technology company focused on artificial intelligence for the enterprise, specializing in large language models. Cohere was founded in 2019 by Aidan Gomez, Ivan Zhang, and Nick Frosst, and is headquartered in Toronto and San Francisco, with offices in Palo Alto and London.\n\nIn 2017, a team of researchers at Google Brain, which included Aidan Gomez, published a paper called "Attention is All You Need," which introduced the transformer machine learning architecture, setting state-of-the-art performance on a variety of natural language processing tasks. In 2019, Gomez and Nick Frosst, another researcher at Google Brain, founded Cohere along with Ivan Zhang, with whom Gomez had done research at FOR.ai. All of the co-founders attended University of Toronto.', 'title': 'Cohere - Wikipedia', 'url': 'https://en.wikipedia.org/wiki/Cohere'}  
   
   
 Cohere is a Canadian multinational technology company focused on artificial intelligence for the enterprise, specializing in large language models. Cohere was founded in 2019 by Aidan Gomez, Ivan Zhang, and Nick Frosst, and is headquartered in Toronto and San Francisco, with offices in Palo Alto and London.  
   
 In 2017, a team of researchers at Google Brain, which included Aidan Gomez, published a paper called "Attention is All You Need," which introduced the transformer machine learning architecture, setting state-of-the-art performance on a variety of natural language processing tasks. In 2019, Gomez and Nick Frosst, another researcher at Google Brain, founded Cohere along with Ivan Zhang, with whom Gomez had done research at FOR.ai. All of the co-founders attended University of Toronto.  
   
   
 ------------------------------  
   
   
 {'id': 'web-search\_8:2', 'snippet': ' Cofounded by Aidan Gomez, a Google Brain alum and coauthor of the seminal transformer research paper, Cohere describes itself as being “on a mission to transform enterprises and their products with AI to unlock a more intuitive way to generate, search, and summarize information than ever before.” One key element of Cohere’s approach is its focus on data protection, deploying its models inside enterprises’ secure data environment.\n\n“We are both independent and cloud-agnostic, meaning we are not beholden to any one tech company and empower enterprises to implement customized AI solutions on the cloud of their choosing, or even on-premises,” says Martin Kon, COO and president of Cohere.', 'title': 'McKinsey and Cohere collaborate to transform clients with enterprise generative AI', 'url': 'https://www.mckinsey.com/about-us/new-at-mckinsey-blog/mckinsey-and-cohere-collaborate-to-transform-clients-with-enterprise-generative-ai'}  
   
   
 Cofounded by Aidan Gomez, a Google Brain alum and coauthor of the seminal transformer research paper, Cohere describes itself as being “on a mission to transform enterprises and their products with AI to unlock a more intuitive way to generate, search, and summarize information than ever before.” One key element of Cohere’s approach is its focus on data protection, deploying its models inside enterprises’ secure data environment.  
   
 “We are both independent and cloud-agnostic, meaning we are not beholden to any one tech company and empower enterprises to implement customized AI solutions on the cloud of their choosing, or even on-premises,” says Martin Kon, COO and president of Cohere.  
   
   
 ------------------------------  
   
   

```

```python
\_pretty\_print(await rag.aget\_relevant\_documents("What is cohere ai?")) # async version  

```

```text
 {'id': 'web-search\_9:0', 'snippet': 'Cohere is a Canadian multinational technology company focused on artificial intelligence for the enterprise, specializing in large language models. Cohere was founded in 2019 by Aidan Gomez, Ivan Zhang, and Nick Frosst, and is headquartered in Toronto and San Francisco, with offices in Palo Alto and London.\n\nIn 2017, a team of researchers at Google Brain, which included Aidan Gomez, published a paper called "Attention is All You Need," which introduced the transformer machine learning architecture, setting state-of-the-art performance on a variety of natural language processing tasks. In 2019, Gomez and Nick Frosst, another researcher at Google Brain, founded Cohere along with Ivan Zhang, with whom Gomez had done research at FOR.ai. All of the co-founders attended University of Toronto.', 'title': 'Cohere - Wikipedia', 'url': 'https://en.wikipedia.org/wiki/Cohere'}  
   
   
 Cohere is a Canadian multinational technology company focused on artificial intelligence for the enterprise, specializing in large language models. Cohere was founded in 2019 by Aidan Gomez, Ivan Zhang, and Nick Frosst, and is headquartered in Toronto and San Francisco, with offices in Palo Alto and London.  
   
 In 2017, a team of researchers at Google Brain, which included Aidan Gomez, published a paper called "Attention is All You Need," which introduced the transformer machine learning architecture, setting state-of-the-art performance on a variety of natural language processing tasks. In 2019, Gomez and Nick Frosst, another researcher at Google Brain, founded Cohere along with Ivan Zhang, with whom Gomez had done research at FOR.ai. All of the co-founders attended University of Toronto.  
   
   
 ------------------------------  
   
   
 {'id': 'web-search\_8:2', 'snippet': ' Cofounded by Aidan Gomez, a Google Brain alum and coauthor of the seminal transformer research paper, Cohere describes itself as being “on a mission to transform enterprises and their products with AI to unlock a more intuitive way to generate, search, and summarize information than ever before.” One key element of Cohere’s approach is its focus on data protection, deploying its models inside enterprises’ secure data environment.\n\n“We are both independent and cloud-agnostic, meaning we are not beholden to any one tech company and empower enterprises to implement customized AI solutions on the cloud of their choosing, or even on-premises,” says Martin Kon, COO and president of Cohere.', 'title': 'McKinsey and Cohere collaborate to transform clients with enterprise generative AI', 'url': 'https://www.mckinsey.com/about-us/new-at-mckinsey-blog/mckinsey-and-cohere-collaborate-to-transform-clients-with-enterprise-generative-ai'}  
   
   
 Cofounded by Aidan Gomez, a Google Brain alum and coauthor of the seminal transformer research paper, Cohere describes itself as being “on a mission to transform enterprises and their products with AI to unlock a more intuitive way to generate, search, and summarize information than ever before.” One key element of Cohere’s approach is its focus on data protection, deploying its models inside enterprises’ secure data environment.  
   
 “We are both independent and cloud-agnostic, meaning we are not beholden to any one tech company and empower enterprises to implement customized AI solutions on the cloud of their choosing, or even on-premises,” says Martin Kon, COO and president of Cohere.  
   
   
 ------------------------------  
   
   
 {'id': 'web-search\_4:0', 'snippet': 'AI startup Cohere, now valued at over $2.1B, raises $270M\n\nKyle Wiggers 4 months\n\nIn a sign that there’s plenty of cash to go around for generative AI startups, Cohere, which is developing an AI model ecosystem for the enterprise, today announced that it raised $270 million as part of its Series C round.\n\nReuters reported earlier in the year that Cohere was in talks to raise “hundreds of millions” of dollars at a valuation of upward of just over $6 billion. If there’s credence to that reporting, Cohere appears to have missed the valuation mark substantially; a source familiar with the matter tells TechCrunch that this tranche values the company at between $2.1 billion and $2.2 billion.', 'title': 'AI startup Cohere, now valued at over $2.1B, raises $270M | TechCrunch', 'url': 'https://techcrunch.com/2023/06/08/ai-startup-cohere-now-valued-at-over-2-1b-raises-270m/'}  
   
   
 AI startup Cohere, now valued at over $2.1B, raises $270M  
   
 Kyle Wiggers 4 months  
   
 In a sign that there’s plenty of cash to go around for generative AI startups, Cohere, which is developing an AI model ecosystem for the enterprise, today announced that it raised $270 million as part of its Series C round.  
   
 Reuters reported earlier in the year that Cohere was in talks to raise “hundreds of millions” of dollars at a valuation of upward of just over $6 billion. If there’s credence to that reporting, Cohere appears to have missed the valuation mark substantially; a source familiar with the matter tells TechCrunch that this tranche values the company at between $2.1 billion and $2.2 billion.  
   
   
 ------------------------------  
   
   

```

```python
docs = rag.get\_relevant\_documents(  
 "Does langchain support cohere RAG?",  
 source\_documents=[Document(page\_content="Langchain supports cohere RAG!"), Document(page\_content="The sky is blue!")]  
 )  
\_pretty\_print(docs)  

```

```text
 {'id': 'doc-0', 'snippet': 'Langchain supports cohere RAG!'}  
   
   
 Langchain supports cohere RAG!  
   
   
 ------------------------------  
   
   

```
