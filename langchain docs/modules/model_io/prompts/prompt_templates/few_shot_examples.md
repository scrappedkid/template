# Few-shot prompt templates

In this tutorial, we'll learn how to create a prompt template that uses few-shot examples. A few-shot prompt template can be constructed from either a set of examples, or from an Example Selector object.

### Use Case[​](#use-case "Direct link to Use Case")

In this tutorial, we'll configure few-shot examples for self-ask with search.

## Using an example set[​](#using-an-example-set "Direct link to Using an example set")

### Create the example set[​](#create-the-example-set "Direct link to Create the example set")

To get started, create a list of few-shot examples. Each example should be a dictionary with the keys being the input variables and the values being the values for those input variables.

```python
from langchain.prompts.few\_shot import FewShotPromptTemplate  
from langchain.prompts.prompt import PromptTemplate  
  
examples = [  
 {  
 "question": "Who lived longer, Muhammad Ali or Alan Turing?",  
 "answer":  
"""  
Are follow up questions needed here: Yes.  
Follow up: How old was Muhammad Ali when he died?  
Intermediate answer: Muhammad Ali was 74 years old when he died.  
Follow up: How old was Alan Turing when he died?  
Intermediate answer: Alan Turing was 41 years old when he died.  
So the final answer is: Muhammad Ali  
"""  
 },  
 {  
 "question": "When was the founder of craigslist born?",  
 "answer":  
"""  
Are follow up questions needed here: Yes.  
Follow up: Who was the founder of craigslist?  
Intermediate answer: Craigslist was founded by Craig Newmark.  
Follow up: When was Craig Newmark born?  
Intermediate answer: Craig Newmark was born on December 6, 1952.  
So the final answer is: December 6, 1952  
"""  
 },  
 {  
 "question": "Who was the maternal grandfather of George Washington?",  
 "answer":  
"""  
Are follow up questions needed here: Yes.  
Follow up: Who was the mother of George Washington?  
Intermediate answer: The mother of George Washington was Mary Ball Washington.  
Follow up: Who was the father of Mary Ball Washington?  
Intermediate answer: The father of Mary Ball Washington was Joseph Ball.  
So the final answer is: Joseph Ball  
"""  
 },  
 {  
 "question": "Are both the directors of Jaws and Casino Royale from the same country?",  
 "answer":  
"""  
Are follow up questions needed here: Yes.  
Follow up: Who is the director of Jaws?  
Intermediate Answer: The director of Jaws is Steven Spielberg.  
Follow up: Where is Steven Spielberg from?  
Intermediate Answer: The United States.  
Follow up: Who is the director of Casino Royale?  
Intermediate Answer: The director of Casino Royale is Martin Campbell.  
Follow up: Where is Martin Campbell from?  
Intermediate Answer: New Zealand.  
So the final answer is: No  
"""  
 }  
]  

```

### Create a formatter for the few-shot examples[​](#create-a-formatter-for-the-few-shot-examples "Direct link to Create a formatter for the few-shot examples")

Configure a formatter that will format the few-shot examples into a string. This formatter should be a `PromptTemplate` object.

```python
example\_prompt = PromptTemplate(input\_variables=["question", "answer"], template="Question: {question}\n{answer}")  
  
print(example\_prompt.format(\*\*examples[0]))  

```

```text
 Question: Who lived longer, Muhammad Ali or Alan Turing?  
  
 Are follow up questions needed here: Yes.  
 Follow up: How old was Muhammad Ali when he died?  
 Intermediate answer: Muhammad Ali was 74 years old when he died.  
 Follow up: How old was Alan Turing when he died?  
 Intermediate answer: Alan Turing was 41 years old when he died.  
 So the final answer is: Muhammad Ali  
  

```

### Feed examples and formatter to `FewShotPromptTemplate`[​](#feed-examples-and-formatter-to-fewshotprompttemplate "Direct link to feed-examples-and-formatter-to-fewshotprompttemplate")

Finally, create a `FewShotPromptTemplate` object. This object takes in the few-shot examples and the formatter for the few-shot examples.

```python
prompt = FewShotPromptTemplate(  
 examples=examples,  
 example\_prompt=example\_prompt,  
 suffix="Question: {input}",  
 input\_variables=["input"]  
)  
  
print(prompt.format(input="Who was the father of Mary Ball Washington?"))  

```

```text
 Question: Who lived longer, Muhammad Ali or Alan Turing?  
  
 Are follow up questions needed here: Yes.  
 Follow up: How old was Muhammad Ali when he died?  
 Intermediate answer: Muhammad Ali was 74 years old when he died.  
 Follow up: How old was Alan Turing when he died?  
 Intermediate answer: Alan Turing was 41 years old when he died.  
 So the final answer is: Muhammad Ali  
  
  
 Question: When was the founder of craigslist born?  
  
 Are follow up questions needed here: Yes.  
 Follow up: Who was the founder of craigslist?  
 Intermediate answer: Craigslist was founded by Craig Newmark.  
 Follow up: When was Craig Newmark born?  
 Intermediate answer: Craig Newmark was born on December 6, 1952.  
 So the final answer is: December 6, 1952  
  
  
 Question: Who was the maternal grandfather of George Washington?  
  
 Are follow up questions needed here: Yes.  
 Follow up: Who was the mother of George Washington?  
 Intermediate answer: The mother of George Washington was Mary Ball Washington.  
 Follow up: Who was the father of Mary Ball Washington?  
 Intermediate answer: The father of Mary Ball Washington was Joseph Ball.  
 So the final answer is: Joseph Ball  
  
  
 Question: Are both the directors of Jaws and Casino Royale from the same country?  
  
 Are follow up questions needed here: Yes.  
 Follow up: Who is the director of Jaws?  
 Intermediate Answer: The director of Jaws is Steven Spielberg.  
 Follow up: Where is Steven Spielberg from?  
 Intermediate Answer: The United States.  
 Follow up: Who is the director of Casino Royale?  
 Intermediate Answer: The director of Casino Royale is Martin Campbell.  
 Follow up: Where is Martin Campbell from?  
 Intermediate Answer: New Zealand.  
 So the final answer is: No  
  
  
 Question: Who was the father of Mary Ball Washington?  

```

## Using an example selector[​](#using-an-example-selector "Direct link to Using an example selector")

### Feed examples into `ExampleSelector`[​](#feed-examples-into-exampleselector "Direct link to feed-examples-into-exampleselector")

We will reuse the example set and the formatter from the previous section. However, instead of feeding the examples directly into the `FewShotPromptTemplate` object, we will feed them into an `ExampleSelector` object.

In this tutorial, we will use the `SemanticSimilarityExampleSelector` class. This class selects few-shot examples based on their similarity to the input. It uses an embedding model to compute the similarity between the input and the few-shot examples, as well as a vector store to perform the nearest neighbor search.

```python
from langchain.prompts.example\_selector import SemanticSimilarityExampleSelector  
from langchain.vectorstores import Chroma  
from langchain.embeddings import OpenAIEmbeddings  
  
  
example\_selector = SemanticSimilarityExampleSelector.from\_examples(  
 # This is the list of examples available to select from.  
 examples,  
 # This is the embedding class used to produce embeddings which are used to measure semantic similarity.  
 OpenAIEmbeddings(),  
 # This is the VectorStore class that is used to store the embeddings and do a similarity search over.  
 Chroma,  
 # This is the number of examples to produce.  
 k=1  
)  
  
# Select the most similar example to the input.  
question = "Who was the father of Mary Ball Washington?"  
selected\_examples = example\_selector.select\_examples({"question": question})  
print(f"Examples most similar to the input: {question}")  
for example in selected\_examples:  
 print("\n")  
 for k, v in example.items():  
 print(f"{k}: {v}")  

```

```text
 Running Chroma using direct local API.  
 Using DuckDB in-memory for database. Data will be transient.  
 Examples most similar to the input: Who was the father of Mary Ball Washington?  
  
  
 question: Who was the maternal grandfather of George Washington?  
 answer:  
 Are follow up questions needed here: Yes.  
 Follow up: Who was the mother of George Washington?  
 Intermediate answer: The mother of George Washington was Mary Ball Washington.  
 Follow up: Who was the father of Mary Ball Washington?  
 Intermediate answer: The father of Mary Ball Washington was Joseph Ball.  
 So the final answer is: Joseph Ball  
  

```

### Feed example selector into `FewShotPromptTemplate`[​](#feed-example-selector-into-fewshotprompttemplate "Direct link to feed-example-selector-into-fewshotprompttemplate")

Finally, create a `FewShotPromptTemplate` object. This object takes in the example selector and the formatter for the few-shot examples.

```python
prompt = FewShotPromptTemplate(  
 example\_selector=example\_selector,  
 example\_prompt=example\_prompt,  
 suffix="Question: {input}",  
 input\_variables=["input"]  
)  
  
print(prompt.format(input="Who was the father of Mary Ball Washington?"))  

```

```text
 Question: Who was the maternal grandfather of George Washington?  
  
 Are follow up questions needed here: Yes.  
 Follow up: Who was the mother of George Washington?  
 Intermediate answer: The mother of George Washington was Mary Ball Washington.  
 Follow up: Who was the father of Mary Ball Washington?  
 Intermediate answer: The father of Mary Ball Washington was Joseph Ball.  
 So the final answer is: Joseph Ball  
  
  
 Question: Who was the father of Mary Ball Washington?  

```

- [Use Case](#use-case)

- [Using an example set](#using-an-example-set)

  - [Create the example set](#create-the-example-set)
  - [Create a formatter for the few-shot examples](#create-a-formatter-for-the-few-shot-examples)
  - [Feed examples and formatter to `FewShotPromptTemplate`](#feed-examples-and-formatter-to-fewshotprompttemplate)

- [Using an example selector](#using-an-example-selector)

  - [Feed examples into `ExampleSelector`](#feed-examples-into-exampleselector)
  - [Feed example selector into `FewShotPromptTemplate`](#feed-example-selector-into-fewshotprompttemplate)

- [Create the example set](#create-the-example-set)

- [Create a formatter for the few-shot examples](#create-a-formatter-for-the-few-shot-examples)

- [Feed examples and formatter to `FewShotPromptTemplate`](#feed-examples-and-formatter-to-fewshotprompttemplate)

- [Feed examples into `ExampleSelector`](#feed-examples-into-exampleselector)

- [Feed example selector into `FewShotPromptTemplate`](#feed-example-selector-into-fewshotprompttemplate)
