# Annoy

[Annoy](https://github.com/spotify/annoy) (`Approximate Nearest Neighbors Oh Yeah`) is a C++ library with Python bindings to search for points in space that are close to a given query point. It also creates large read-only file-based data structures that are mmapped into memory so that many processes may share the same data.

This notebook shows how to use functionality related to the `Annoy` vector database.

```
NOTE: Annoy is read-only - once the index is built you cannot add any more embeddings!  
If you want to progressively add new entries to your VectorStore then better choose an alternative!  

```

```python
#!pip install annoy  

```

## Create VectorStore from texts[​](#create-vectorstore-from-texts "Direct link to Create VectorStore from texts")

```python
from langchain.embeddings import HuggingFaceEmbeddings  
from langchain.vectorstores import Annoy  
  
embeddings\_func = HuggingFaceEmbeddings()  

```

```python
texts = ["pizza is great", "I love salad", "my car", "a dog"]  
  
# default metric is angular  
vector\_store = Annoy.from\_texts(texts, embeddings\_func)  

```

```python
# allows for custom annoy parameters, defaults are n\_trees=100, n\_jobs=-1, metric="angular"  
vector\_store\_v2 = Annoy.from\_texts(  
 texts, embeddings\_func, metric="dot", n\_trees=100, n\_jobs=1  
)  

```

```python
vector\_store.similarity\_search("food", k=3)  

```

```text
 [Document(page\_content='pizza is great', metadata={}),  
 Document(page\_content='I love salad', metadata={}),  
 Document(page\_content='my car', metadata={})]  

```

```python
# the score is a distance metric, so lower is better  
vector\_store.similarity\_search\_with\_score("food", k=3)  

```

```text
 [(Document(page\_content='pizza is great', metadata={}), 1.0944390296936035),  
 (Document(page\_content='I love salad', metadata={}), 1.1273186206817627),  
 (Document(page\_content='my car', metadata={}), 1.1580758094787598)]  

```

## Create VectorStore from docs[​](#create-vectorstore-from-docs "Direct link to Create VectorStore from docs")

```python
from langchain.document\_loaders import TextLoader  
from langchain.text\_splitter import CharacterTextSplitter  
  
loader = TextLoader("../../modules/state\_of\_the\_union.txtn.txtn.txt")  
documents = loader.load()  
text\_splitter = CharacterTextSplitter(chunk\_size=1000, chunk\_overlap=0)  
docs = text\_splitter.split\_documents(documents)  

```

```python
docs[:5]  

```

```text
 [Document(page\_content='Madam Speaker, Madam Vice President, our First Lady and Second Gentleman. Members of Congress and the Cabinet. Justices of the Supreme Court. My fellow Americans. \n\nLast year COVID-19 kept us apart. This year we are finally together again. \n\nTonight, we meet as Democrats Republicans and Independents. But most importantly as Americans. \n\nWith a duty to one another to the American people to the Constitution. \n\nAnd with an unwavering resolve that freedom will always triumph over tyranny. \n\nSix days ago, Russia’s Vladimir Putin sought to shake the foundations of the free world thinking he could make it bend to his menacing ways. But he badly miscalculated. \n\nHe thought he could roll into Ukraine and the world would roll over. Instead he met a wall of strength he never imagined. \n\nHe met the Ukrainian people. \n\nFrom President Zelenskyy to every Ukrainian, their fearlessness, their courage, their determination, inspires the world.', metadata={'source': '../../../state\_of\_the\_union.txt'}),  
 Document(page\_content='Groups of citizens blocking tanks with their bodies. Everyone from students to retirees teachers turned soldiers defending their homeland. \n\nIn this struggle as President Zelenskyy said in his speech to the European Parliament “Light will win over darkness.” The Ukrainian Ambassador to the United States is here tonight. \n\nLet each of us here tonight in this Chamber send an unmistakable signal to Ukraine and to the world. \n\nPlease rise if you are able and show that, Yes, we the United States of America stand with the Ukrainian people. \n\nThroughout our history we’ve learned this lesson when dictators do not pay a price for their aggression they cause more chaos. \n\nThey keep moving. \n\nAnd the costs and the threats to America and the world keep rising. \n\nThat’s why the NATO Alliance was created to secure peace and stability in Europe after World War 2. \n\nThe United States is a member along with 29 other nations. \n\nIt matters. American diplomacy matters. American resolve matters.', metadata={'source': '../../../state\_of\_the\_union.txt'}),  
 Document(page\_content='Putin’s latest attack on Ukraine was premeditated and unprovoked. \n\nHe rejected repeated efforts at diplomacy. \n\nHe thought the West and NATO wouldn’t respond. And he thought he could divide us at home. Putin was wrong. We were ready. Here is what we did. \n\nWe prepared extensively and carefully. \n\nWe spent months building a coalition of other freedom-loving nations from Europe and the Americas to Asia and Africa to confront Putin. \n\nI spent countless hours unifying our European allies. We shared with the world in advance what we knew Putin was planning and precisely how he would try to falsely justify his aggression. \n\nWe countered Russia’s lies with truth. \n\nAnd now that he has acted the free world is holding him accountable. \n\nAlong with twenty-seven members of the European Union including France, Germany, Italy, as well as countries like the United Kingdom, Canada, Japan, Korea, Australia, New Zealand, and many others, even Switzerland.', metadata={'source': '../../../state\_of\_the\_union.txt'}),  
 Document(page\_content='We are inflicting pain on Russia and supporting the people of Ukraine. Putin is now isolated from the world more than ever. \n\nTogether with our allies –we are right now enforcing powerful economic sanctions. \n\nWe are cutting off Russia’s largest banks from the international financial system. \n\nPreventing Russia’s central bank from defending the Russian Ruble making Putin’s $630 Billion “war fund” worthless. \n\nWe are choking off Russia’s access to technology that will sap its economic strength and weaken its military for years to come. \n\nTonight I say to the Russian oligarchs and corrupt leaders who have bilked billions of dollars off this violent regime no more. \n\nThe U.S. Department of Justice is assembling a dedicated task force to go after the crimes of Russian oligarchs. \n\nWe are joining with our European allies to find and seize your yachts your luxury apartments your private jets. We are coming for your ill-begotten gains.', metadata={'source': '../../../state\_of\_the\_union.txt'}),  
 Document(page\_content='And tonight I am announcing that we will join our allies in closing off American air space to all Russian flights – further isolating Russia – and adding an additional squeeze –on their economy. The Ruble has lost 30% of its value. \n\nThe Russian stock market has lost 40% of its value and trading remains suspended. Russia’s economy is reeling and Putin alone is to blame. \n\nTogether with our allies we are providing support to the Ukrainians in their fight for freedom. Military assistance. Economic assistance. Humanitarian assistance. \n\nWe are giving more than $1 Billion in direct assistance to Ukraine. \n\nAnd we will continue to aid the Ukrainian people as they defend their country and to help ease their suffering. \n\nLet me be clear, our forces are not engaged and will not engage in conflict with Russian forces in Ukraine. \n\nOur forces are not going to Europe to fight in Ukraine, but to defend our NATO Allies – in the event that Putin decides to keep moving west.', metadata={'source': '../../../state\_of\_the\_union.txt'})]  

```

```python
vector\_store\_from\_docs = Annoy.from\_documents(docs, embeddings\_func)  

```

```python
query = "What did the president say about Ketanji Brown Jackson"  
docs = vector\_store\_from\_docs.similarity\_search(query)  

```

```python
print(docs[0].page\_content[:100])  

```

```text
 Tonight. I call on the Senate to: Pass the Freedom to Vote Act. Pass the John Lewis Voting Rights Ac  

```

## Create VectorStore via existing embeddings[​](#create-vectorstore-via-existing-embeddings "Direct link to Create VectorStore via existing embeddings")

```python
embs = embeddings\_func.embed\_documents(texts)  

```

```python
data = list(zip(texts, embs))  
  
vector\_store\_from\_embeddings = Annoy.from\_embeddings(data, embeddings\_func)  

```

```python
vector\_store\_from\_embeddings.similarity\_search\_with\_score("food", k=3)  

```

```text
 [(Document(page\_content='pizza is great', metadata={}), 1.0944390296936035),  
 (Document(page\_content='I love salad', metadata={}), 1.1273186206817627),  
 (Document(page\_content='my car', metadata={}), 1.1580758094787598)]  

```

## Search via embeddings[​](#search-via-embeddings "Direct link to Search via embeddings")

```python
motorbike\_emb = embeddings\_func.embed\_query("motorbike")  

```

```python
vector\_store.similarity\_search\_by\_vector(motorbike\_emb, k=3)  

```

```text
 [Document(page\_content='my car', metadata={}),  
 Document(page\_content='a dog', metadata={}),  
 Document(page\_content='pizza is great', metadata={})]  

```

```python
vector\_store.similarity\_search\_with\_score\_by\_vector(motorbike\_emb, k=3)  

```

```text
 [(Document(page\_content='my car', metadata={}), 1.0870471000671387),  
 (Document(page\_content='a dog', metadata={}), 1.2095637321472168),  
 (Document(page\_content='pizza is great', metadata={}), 1.3254905939102173)]  

```

## Search via docstore id[​](#search-via-docstore-id "Direct link to Search via docstore id")

```python
vector\_store.index\_to\_docstore\_id  

```

```text
 {0: '2d1498a8-a37c-4798-acb9-0016504ed798',  
 1: '2d30aecc-88e0-4469-9d51-0ef7e9858e6d',  
 2: '927f1120-985b-4691-b577-ad5cb42e011c',  
 3: '3056ddcf-a62f-48c8-bd98-b9e57a3dfcae'}  

```

```python
some\_docstore\_id = 0 # texts[0]  
  
vector\_store.docstore.\_dict[vector\_store.index\_to\_docstore\_id[some\_docstore\_id]]  

```

```text
 Document(page\_content='pizza is great', metadata={})  

```

```python
# same document has distance 0  
vector\_store.similarity\_search\_with\_score\_by\_index(some\_docstore\_id, k=3)  

```

```text
 [(Document(page\_content='pizza is great', metadata={}), 0.0),  
 (Document(page\_content='I love salad', metadata={}), 1.0734446048736572),  
 (Document(page\_content='my car', metadata={}), 1.2895267009735107)]  

```

## Save and load[​](#save-and-load "Direct link to Save and load")

```python
vector\_store.save\_local("my\_annoy\_index\_and\_docstore")  

```

```text
 saving config  

```

```python
loaded\_vector\_store = Annoy.load\_local(  
 "my\_annoy\_index\_and\_docstore", embeddings=embeddings\_func  
)  

```

```python
# same document has distance 0  
loaded\_vector\_store.similarity\_search\_with\_score\_by\_index(some\_docstore\_id, k=3)  

```

```text
 [(Document(page\_content='pizza is great', metadata={}), 0.0),  
 (Document(page\_content='I love salad', metadata={}), 1.0734446048736572),  
 (Document(page\_content='my car', metadata={}), 1.2895267009735107)]  

```

## Construct from scratch[​](#construct-from-scratch "Direct link to Construct from scratch")

```python
import uuid  
from annoy import AnnoyIndex  
from langchain.docstore.document import Document  
from langchain.docstore.in\_memory import InMemoryDocstore  
  
metadatas = [{"x": "food"}, {"x": "food"}, {"x": "stuff"}, {"x": "animal"}]  
  
# embeddings  
embeddings = embeddings\_func.embed\_documents(texts)  
  
# embedding dim  
f = len(embeddings[0])  
  
# index  
metric = "angular"  
index = AnnoyIndex(f, metric=metric)  
for i, emb in enumerate(embeddings):  
 index.add\_item(i, emb)  
index.build(10)  
  
# docstore  
documents = []  
for i, text in enumerate(texts):  
 metadata = metadatas[i] if metadatas else {}  
 documents.append(Document(page\_content=text, metadata=metadata))  
index\_to\_docstore\_id = {i: str(uuid.uuid4()) for i in range(len(documents))}  
docstore = InMemoryDocstore(  
 {index\_to\_docstore\_id[i]: doc for i, doc in enumerate(documents)}  
)  
  
db\_manually = Annoy(  
 embeddings\_func.embed\_query, index, metric, docstore, index\_to\_docstore\_id  
)  

```

```python
db\_manually.similarity\_search\_with\_score("eating!", k=3)  

```

```text
 [(Document(page\_content='pizza is great', metadata={'x': 'food'}),  
 1.1314140558242798),  
 (Document(page\_content='I love salad', metadata={'x': 'food'}),  
 1.1668788194656372),  
 (Document(page\_content='my car', metadata={'x': 'stuff'}), 1.226445198059082)]  

```

- [Create VectorStore from texts](#create-vectorstore-from-texts)
- [Create VectorStore from docs](#create-vectorstore-from-docs)
- [Create VectorStore via existing embeddings](#create-vectorstore-via-existing-embeddings)
- [Search via embeddings](#search-via-embeddings)
- [Search via docstore id](#search-via-docstore-id)
- [Save and load](#save-and-load)
- [Construct from scratch](#construct-from-scratch)
