# Cohere Reranker

[Cohere](https://cohere.ai/about) is a Canadian startup that provides natural language processing models that help companies improve human-machine interactions.

This notebook shows how to use [Cohere's rerank endpoint](https://docs.cohere.com/docs/reranking) in a retriever. This builds on top of ideas in the [ContextualCompressionRetriever](/docs/modules/data_connection/retrievers/contextual_compression/).

```python
#!pip install cohere  

```

```python
#!pip install faiss  
  
# OR (depending on Python version)  
  
#!pip install faiss-cpu  

```

```python
# get a new token: https://dashboard.cohere.ai/  
  
import os  
import getpass  
  
os.environ["COHERE\_API\_KEY"] = getpass.getpass("Cohere API Key:")  

```

```python
os.environ["OPENAI\_API\_KEY"] = getpass.getpass("OpenAI API Key:")  

```

```python
# Helper function for printing docs  
  
  
def pretty\_print\_docs(docs):  
 print(  
 f"\n{'-' \* 100}\n".join(  
 [f"Document {i+1}:\n\n" + d.page\_content for i, d in enumerate(docs)]  
 )  
 )  

```

## Set up the base vector store retriever[​](#set-up-the-base-vector-store-retriever "Direct link to Set up the base vector store retriever")

Let's start by initializing a simple vector store retriever and storing the 2023 State of the Union speech (in chunks). We can set up the retriever to retrieve a high number (20) of docs.

```python
from langchain.text\_splitter import RecursiveCharacterTextSplitter  
from langchain.embeddings import OpenAIEmbeddings  
from langchain.document\_loaders import TextLoader  
from langchain.vectorstores import FAISS  
  
documents = TextLoader("../../modules/state\_of\_the\_union.txt").load()  
text\_splitter = RecursiveCharacterTextSplitter(chunk\_size=500, chunk\_overlap=100)  
texts = text\_splitter.split\_documents(documents)  
retriever = FAISS.from\_documents(texts, OpenAIEmbeddings()).as\_retriever(  
 search\_kwargs={"k": 20}  
)  
  
query = "What did the president say about Ketanji Brown Jackson"  
docs = retriever.get\_relevant\_documents(query)  
pretty\_print\_docs(docs)  

```

```text
 Document 1:  
   
 One of the most serious constitutional responsibilities a President has is nominating someone to serve on the United States Supreme Court.   
   
 And I did that 4 days ago, when I nominated Circuit Court of Appeals Judge Ketanji Brown Jackson. One of our nation’s top legal minds, who will continue Justice Breyer’s legacy of excellence.  
 ----------------------------------------------------------------------------------------------------  
 Document 2:  
   
 As I said last year, especially to our younger transgender Americans, I will always have your back as your President, so you can be yourself and reach your God-given potential.   
   
 While it often appears that we never agree, that isn’t true. I signed 80 bipartisan bills into law last year. From preventing government shutdowns to protecting Asian-Americans from still-too-common hate crimes to reforming military justice.  
 ----------------------------------------------------------------------------------------------------  
 Document 3:  
   
 A former top litigator in private practice. A former federal public defender. And from a family of public school educators and police officers. A consensus builder. Since she’s been nominated, she’s received a broad range of support—from the Fraternal Order of Police to former judges appointed by Democrats and Republicans.   
   
 And if we are to advance liberty and justice, we need to secure the Border and fix the immigration system.  
 ----------------------------------------------------------------------------------------------------  
 Document 4:  
   
 He met the Ukrainian people.   
   
 From President Zelenskyy to every Ukrainian, their fearlessness, their courage, their determination, inspires the world.   
   
 Groups of citizens blocking tanks with their bodies. Everyone from students to retirees teachers turned soldiers defending their homeland.   
   
 In this struggle as President Zelenskyy said in his speech to the European Parliament “Light will win over darkness.” The Ukrainian Ambassador to the United States is here tonight.  
 ----------------------------------------------------------------------------------------------------  
 Document 5:  
   
 I spoke with their families and told them that we are forever in debt for their sacrifice, and we will carry on their mission to restore the trust and safety every community deserves.   
   
 I’ve worked on these issues a long time.   
   
 I know what works: Investing in crime prevention and community police officers who’ll walk the beat, who’ll know the neighborhood, and who can restore trust and safety.   
   
 So let’s not abandon our streets. Or choose between safety and equal justice.  
 ----------------------------------------------------------------------------------------------------  
 Document 6:  
   
 Vice President Harris and I ran for office with a new economic vision for America.   
   
 Invest in America. Educate Americans. Grow the workforce. Build the economy from the bottom up   
 and the middle out, not from the top down.   
   
 Because we know that when the middle class grows, the poor have a ladder up and the wealthy do very well.   
   
 America used to have the best roads, bridges, and airports on Earth.   
   
 Now our infrastructure is ranked 13th in the world.  
 ----------------------------------------------------------------------------------------------------  
 Document 7:  
   
 And tonight, I’m announcing that the Justice Department will name a chief prosecutor for pandemic fraud.   
   
 By the end of this year, the deficit will be down to less than half what it was before I took office.   
   
 The only president ever to cut the deficit by more than one trillion dollars in a single year.   
   
 Lowering your costs also means demanding more competition.   
   
 I’m a capitalist, but capitalism without competition isn’t capitalism.   
   
 It’s exploitation—and it drives up prices.  
 ----------------------------------------------------------------------------------------------------  
 Document 8:  
   
 For the past 40 years we were told that if we gave tax breaks to those at the very top, the benefits would trickle down to everyone else.   
   
 But that trickle-down theory led to weaker economic growth, lower wages, bigger deficits, and the widest gap between those at the top and everyone else in nearly a century.   
   
 Vice President Harris and I ran for office with a new economic vision for America.  
 ----------------------------------------------------------------------------------------------------  
 Document 9:  
   
 All told, we created 369,000 new manufacturing jobs in America just last year.   
   
 Powered by people I’ve met like JoJo Burgess, from generations of union steelworkers from Pittsburgh, who’s here with us tonight.   
   
 As Ohio Senator Sherrod Brown says, “It’s time to bury the label “Rust Belt.”   
   
 It’s time.   
   
 But with all the bright spots in our economy, record job growth and higher wages, too many families are struggling to keep up with the bills.  
 ----------------------------------------------------------------------------------------------------  
 Document 10:  
   
 I’m also calling on Congress: pass a law to make sure veterans devastated by toxic exposures in Iraq and Afghanistan finally get the benefits and comprehensive health care they deserve.   
   
 And fourth, let’s end cancer as we know it.   
   
 This is personal to me and Jill, to Kamala, and to so many of you.   
   
 Cancer is the #2 cause of death in America–second only to heart disease.  
 ----------------------------------------------------------------------------------------------------  
 Document 11:  
   
 He will never extinguish their love of freedom. He will never weaken the resolve of the free world.   
   
 We meet tonight in an America that has lived through two of the hardest years this nation has ever faced.   
   
 The pandemic has been punishing.   
   
 And so many families are living paycheck to paycheck, struggling to keep up with the rising cost of food, gas, housing, and so much more.   
   
 I understand.  
 ----------------------------------------------------------------------------------------------------  
 Document 12:  
   
 Madam Speaker, Madam Vice President, our First Lady and Second Gentleman. Members of Congress and the Cabinet. Justices of the Supreme Court. My fellow Americans.   
   
 Last year COVID-19 kept us apart. This year we are finally together again.   
   
 Tonight, we meet as Democrats Republicans and Independents. But most importantly as Americans.   
   
 With a duty to one another to the American people to the Constitution.   
   
 And with an unwavering resolve that freedom will always triumph over tyranny.  
 ----------------------------------------------------------------------------------------------------  
 Document 13:  
   
 I know.   
   
 One of those soldiers was my son Major Beau Biden.   
   
 We don’t know for sure if a burn pit was the cause of his brain cancer, or the diseases of so many of our troops.   
   
 But I’m committed to finding out everything we can.   
   
 Committed to military families like Danielle Robinson from Ohio.   
   
 The widow of Sergeant First Class Heath Robinson.   
   
 He was born a soldier. Army National Guard. Combat medic in Kosovo and Iraq.  
 ----------------------------------------------------------------------------------------------------  
 Document 14:  
   
 And soon, we’ll strengthen the Violence Against Women Act that I first wrote three decades ago. It is important for us to show the nation that we can come together and do big things.   
   
 So tonight I’m offering a Unity Agenda for the Nation. Four big things we can do together.   
   
 First, beat the opioid epidemic.   
   
 There is so much we can do. Increase funding for prevention, treatment, harm reduction, and recovery.  
 ----------------------------------------------------------------------------------------------------  
 Document 15:  
   
 Third, support our veterans.   
   
 Veterans are the best of us.   
   
 I’ve always believed that we have a sacred obligation to equip all those we send to war and care for them and their families when they come home.   
   
 My administration is providing assistance with job training and housing, and now helping lower-income veterans get VA care debt-free.   
   
 Our troops in Iraq and Afghanistan faced many dangers.  
 ----------------------------------------------------------------------------------------------------  
 Document 16:  
   
 When we invest in our workers, when we build the economy from the bottom up and the middle out together, we can do something we haven’t done in a long time: build a better America.   
   
 For more than two years, COVID-19 has impacted every decision in our lives and the life of the nation.   
   
 And I know you’re tired, frustrated, and exhausted.   
   
 But I also know this.  
 ----------------------------------------------------------------------------------------------------  
 Document 17:  
   
 Now is the hour.   
   
 Our moment of responsibility.   
   
 Our test of resolve and conscience, of history itself.   
   
 It is in this moment that our character is formed. Our purpose is found. Our future is forged.   
   
 Well I know this nation.   
   
 We will meet the test.   
   
 To protect freedom and liberty, to expand fairness and opportunity.   
   
 We will save democracy.   
   
 As hard as these times have been, I am more optimistic about America today than I have been my whole life.  
 ----------------------------------------------------------------------------------------------------  
 Document 18:  
   
 He didn’t know how to stop fighting, and neither did she.   
   
 Through her pain she found purpose to demand we do better.   
   
 Tonight, Danielle—we are.   
   
 The VA is pioneering new ways of linking toxic exposures to diseases, already helping more veterans get benefits.   
   
 And tonight, I’m announcing we’re expanding eligibility to veterans suffering from nine respiratory cancers.  
 ----------------------------------------------------------------------------------------------------  
 Document 19:  
   
 I understand.   
   
 I remember when my Dad had to leave our home in Scranton, Pennsylvania to find work. I grew up in a family where if the price of food went up, you felt it.   
   
 That’s why one of the first things I did as President was fight to pass the American Rescue Plan.   
   
 Because people were hurting. We needed to act, and we did.   
   
 Few pieces of legislation have done more in a critical moment in our history to lift us out of crisis.  
 ----------------------------------------------------------------------------------------------------  
 Document 20:  
   
 So let’s not abandon our streets. Or choose between safety and equal justice.   
   
 Let’s come together to protect our communities, restore trust, and hold law enforcement accountable.   
   
 That’s why the Justice Department required body cameras, banned chokeholds, and restricted no-knock warrants for its officers.  

```

## Doing reranking with CohereRerank[​](#doing-reranking-with-coherererank "Direct link to Doing reranking with CohereRerank")

Now let's wrap our base retriever with a `ContextualCompressionRetriever`. We'll add an `CohereRerank`, uses the Cohere rerank endpoint to rerank the returned results.

```python
from langchain.llms import OpenAI  
from langchain.retrievers import ContextualCompressionRetriever  
from langchain.retrievers.document\_compressors import CohereRerank  
  
llm = OpenAI(temperature=0)  
compressor = CohereRerank()  
compression\_retriever = ContextualCompressionRetriever(  
 base\_compressor=compressor, base\_retriever=retriever  
)  
  
compressed\_docs = compression\_retriever.get\_relevant\_documents(  
 "What did the president say about Ketanji Jackson Brown"  
)  
pretty\_print\_docs(compressed\_docs)  

```

```text
 Document 1:  
   
 One of the most serious constitutional responsibilities a President has is nominating someone to serve on the United States Supreme Court.   
   
 And I did that 4 days ago, when I nominated Circuit Court of Appeals Judge Ketanji Brown Jackson. One of our nation’s top legal minds, who will continue Justice Breyer’s legacy of excellence.  
 ----------------------------------------------------------------------------------------------------  
 Document 2:  
   
 I spoke with their families and told them that we are forever in debt for their sacrifice, and we will carry on their mission to restore the trust and safety every community deserves.   
   
 I’ve worked on these issues a long time.   
   
 I know what works: Investing in crime prevention and community police officers who’ll walk the beat, who’ll know the neighborhood, and who can restore trust and safety.   
   
 So let’s not abandon our streets. Or choose between safety and equal justice.  
 ----------------------------------------------------------------------------------------------------  
 Document 3:  
   
 A former top litigator in private practice. A former federal public defender. And from a family of public school educators and police officers. A consensus builder. Since she’s been nominated, she’s received a broad range of support—from the Fraternal Order of Police to former judges appointed by Democrats and Republicans.   
   
 And if we are to advance liberty and justice, we need to secure the Border and fix the immigration system.  

```

You can of course use this retriever within a QA pipeline

```python
from langchain.chains import RetrievalQA  

```

```python
chain = RetrievalQA.from\_chain\_type(  
 llm=OpenAI(temperature=0), retriever=compression\_retriever  
)  

```

```python
chain({"query": query})  

```

```text
 {'query': 'What did the president say about Ketanji Brown Jackson',  
 'result': " The president said that Ketanji Brown Jackson is one of the nation's top legal minds and that she is a consensus builder who has received a broad range of support from the Fraternal Order of Police to former judges appointed by Democrats and Republicans."}  

```

- [Set up the base vector store retriever](#set-up-the-base-vector-store-retriever)
- [Doing reranking with CohereRerank](#doing-reranking-with-coherererank)
