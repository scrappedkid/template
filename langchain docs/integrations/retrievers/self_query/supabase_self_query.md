# Supabase

[Supabase](https://supabase.com/docs) is an open-source `Firebase` alternative.
`Supabase` is built on top of `PostgreSQL`, which offers strong `SQL`
querying capabilities and enables a simple interface with already-existing tools and frameworks.

[PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) also known as `Postgres`,
is a free and open-source relational database management system (RDBMS)
emphasizing extensibility and `SQL` compliance.

[Supabase](https://supabase.com/docs/guides/ai) provides an open-source toolkit for developing AI applications
using Postgres and pgvector. Use the Supabase client libraries to store, index, and query your vector embeddings at scale.

In the notebook, we'll demo the `SelfQueryRetriever` wrapped around a `Supabase` vector store.

Specifically, we will:

1. Create a Supabase database
1. Enable the `pgvector` extension
1. Create a `documents` table and `match_documents` function that will be used by `SupabaseVectorStore`
1. Load sample documents into the vector store (database table)
1. Build and test a self-querying retriever

## Setup Supabase Database[​](#setup-supabase-database "Direct link to Setup Supabase Database")

1. Head over to <https://database.new> to provision your Supabase database.
1. In the studio, jump to the [SQL editor](https://supabase.com/dashboard/project/_/sql/new) and run the following script to enable `pgvector` and setup your database as a vector store:

```sql
-- Enable the pgvector extension to work with embedding vectors  
create extension if not exists vector;  
  
-- Create a table to store your documents  
create table  
 documents (  
 id uuid primary key,  
 content text, -- corresponds to Document.pageContent  
 metadata jsonb, -- corresponds to Document.metadata  
 embedding vector (1536) -- 1536 works for OpenAI embeddings, change if needed  
 );  
  
-- Create a function to search for documents  
create function match\_documents (  
 query\_embedding vector (1536),  
 filter jsonb default '{}'  
) returns table (  
 id uuid,  
 content text,  
 metadata jsonb,  
 similarity float  
) language plpgsql as $$  
#variable\_conflict use\_column  
begin  
 return query  
 select  
 id,  
 content,  
 metadata,  
 1 - (documents.embedding <=> query\_embedding) as similarity  
 from documents  
 where metadata @> filter  
 order by documents.embedding <=> query\_embedding;  
end;  
$$;  

```

Head over to <https://database.new> to provision your Supabase database.

In the studio, jump to the [SQL editor](https://supabase.com/dashboard/project/_/sql/new) and run the following script to enable `pgvector` and setup your database as a vector store:

```sql
-- Enable the pgvector extension to work with embedding vectors  
create extension if not exists vector;  
  
-- Create a table to store your documents  
create table  
 documents (  
 id uuid primary key,  
 content text, -- corresponds to Document.pageContent  
 metadata jsonb, -- corresponds to Document.metadata  
 embedding vector (1536) -- 1536 works for OpenAI embeddings, change if needed  
 );  
  
-- Create a function to search for documents  
create function match\_documents (  
 query\_embedding vector (1536),  
 filter jsonb default '{}'  
) returns table (  
 id uuid,  
 content text,  
 metadata jsonb,  
 similarity float  
) language plpgsql as $$  
#variable\_conflict use\_column  
begin  
 return query  
 select  
 id,  
 content,  
 metadata,  
 1 - (documents.embedding <=> query\_embedding) as similarity  
 from documents  
 where metadata @> filter  
 order by documents.embedding <=> query\_embedding;  
end;  
$$;  

```

## Creating a Supabase vector store[​](#creating-a-supabase-vector-store "Direct link to Creating a Supabase vector store")

Next we'll want to create a Supabase vector store and seed it with some data. We've created a small demo set of documents that contain summaries of movies.

Be sure to install the latest version of `langchain` with `openai` support:

```python
%pip install langchain openai tiktoken  

```

The self-query retriever requires you to have `lark` installed:

```python
%pip install lark  

```

We also need the `supabase` package:

```python
%pip install supabase  

```

Since we are using `SupabaseVectorStore` and `OpenAIEmbeddings`, we have to load their API keys.

- To find your `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`, head to your Supabase project's [API settings](https://supabase.com/dashboard/project/_/settings/api).

  - `SUPABASE_URL` corresponds to the Project URL
  - `SUPABASE_SERVICE_KEY` corresponds to the `service_role` API key

- To get your `OPENAI_API_KEY`, navigate to [API keys](https://platform.openai.com/account/api-keys) on your OpenAI account and create a new secret key.

To find your `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`, head to your Supabase project's [API settings](https://supabase.com/dashboard/project/_/settings/api).

- `SUPABASE_URL` corresponds to the Project URL
- `SUPABASE_SERVICE_KEY` corresponds to the `service_role` API key

To get your `OPENAI_API_KEY`, navigate to [API keys](https://platform.openai.com/account/api-keys) on your OpenAI account and create a new secret key.

```python
import os  
import getpass  
  
os.environ["SUPABASE\_URL"] = getpass.getpass("Supabase URL:")  
os.environ["SUPABASE\_SERVICE\_KEY"] = getpass.getpass("Supabase Service Key:")  
os.environ["OPENAI\_API\_KEY"] = getpass.getpass("OpenAI API Key:")  

```

*Optional:* If you're storing your Supabase and OpenAI API keys in a `.env` file, you can load them with [`dotenv`](https://github.com/theskumar/python-dotenv).

```python
%pip install python-dotenv  

```

```python
from dotenv import load\_dotenv  
  
load\_dotenv()  

```

First we'll create a Supabase client and instantiate a OpenAI embeddings class.

```python
import os  
from supabase.client import Client, create\_client  
from langchain.schema import Document  
from langchain.embeddings.openai import OpenAIEmbeddings  
from langchain.vectorstores import SupabaseVectorStore  
  
supabase\_url = os.environ.get("SUPABASE\_URL")  
supabase\_key = os.environ.get("SUPABASE\_SERVICE\_KEY")  
supabase: Client = create\_client(supabase\_url, supabase\_key)  
  
embeddings = OpenAIEmbeddings()  

```

Next let's create our documents.

```python
docs = [  
 Document(  
 page\_content="A bunch of scientists bring back dinosaurs and mayhem breaks loose",  
 metadata={"year": 1993, "rating": 7.7, "genre": "science fiction"},  
 ),  
 Document(  
 page\_content="Leo DiCaprio gets lost in a dream within a dream within a dream within a ...",  
 metadata={"year": 2010, "director": "Christopher Nolan", "rating": 8.2},  
 ),  
 Document(  
 page\_content="A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea",  
 metadata={"year": 2006, "director": "Satoshi Kon", "rating": 8.6},  
 ),  
 Document(  
 page\_content="A bunch of normal-sized women are supremely wholesome and some men pine after them",  
 metadata={"year": 2019, "director": "Greta Gerwig", "rating": 8.3},  
 ),  
 Document(  
 page\_content="Toys come alive and have a blast doing so",  
 metadata={"year": 1995, "genre": "animated"},  
 ),  
 Document(  
 page\_content="Three men walk into the Zone, three men walk out of the Zone",  
 metadata={  
 "year": 1979,  
 "rating": 9.9,  
 "director": "Andrei Tarkovsky",  
 "genre": "science fiction",  
 "rating": 9.9,  
 },  
 ),  
]  
  
vectorstore = SupabaseVectorStore.from\_documents(docs, embeddings, client=supabase, table\_name="documents", query\_name="match\_documents")  

```

## Creating our self-querying retriever[​](#creating-our-self-querying-retriever "Direct link to Creating our self-querying retriever")

Now we can instantiate our retriever. To do this we'll need to provide some information upfront about the metadata fields that our documents support and a short description of the document contents.

```python
from langchain.llms import OpenAI  
from langchain.retrievers.self\_query.base import SelfQueryRetriever  
from langchain.chains.query\_constructor.base import AttributeInfo  
  
metadata\_field\_info = [  
 AttributeInfo(  
 name="genre",  
 description="The genre of the movie",  
 type="string or list[string]",  
 ),  
 AttributeInfo(  
 name="year",  
 description="The year the movie was released",  
 type="integer",  
 ),  
 AttributeInfo(  
 name="director",  
 description="The name of the movie director",  
 type="string",  
 ),  
 AttributeInfo(  
 name="rating", description="A 1-10 rating for the movie", type="float"  
 ),  
]  
document\_content\_description = "Brief summary of a movie"  
llm = OpenAI(temperature=0)  
retriever = SelfQueryRetriever.from\_llm(  
 llm, vectorstore, document\_content\_description, metadata\_field\_info, verbose=True  
)  

```

## Testing it out[​](#testing-it-out "Direct link to Testing it out")

And now we can try actually using our retriever!

```python
# This example only specifies a relevant query  
retriever.get\_relevant\_documents("What are some movies about dinosaurs")  

```

```text
 query='dinosaur' filter=None limit=None  
  
  
  
  
  
 [Document(page\_content='A bunch of scientists bring back dinosaurs and mayhem breaks loose', metadata={'year': 1993, 'genre': 'science fiction', 'rating': 7.7}),  
 Document(page\_content='Toys come alive and have a blast doing so', metadata={'year': 1995, 'genre': 'animated'}),  
 Document(page\_content='Three men walk into the Zone, three men walk out of the Zone', metadata={'year': 1979, 'genre': 'science fiction', 'rating': 9.9, 'director': 'Andrei Tarkovsky'}),  
 Document(page\_content='A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea', metadata={'year': 2006, 'rating': 8.6, 'director': 'Satoshi Kon'})]  

```

```python
# This example only specifies a filter  
retriever.get\_relevant\_documents("I want to watch a movie rated higher than 8.5")  

```

```text
 query=' ' filter=Comparison(comparator=<Comparator.GT: 'gt'>, attribute='rating', value=8.5) limit=None  
  
  
  
  
  
 [Document(page\_content='Three men walk into the Zone, three men walk out of the Zone', metadata={'year': 1979, 'genre': 'science fiction', 'rating': 9.9, 'director': 'Andrei Tarkovsky'}),  
 Document(page\_content='A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea', metadata={'year': 2006, 'rating': 8.6, 'director': 'Satoshi Kon'})]  

```

```python
# This example specifies a query and a filter  
retriever.get\_relevant\_documents("Has Greta Gerwig directed any movies about women?")  

```

```text
 query='women' filter=Comparison(comparator=<Comparator.EQ: 'eq'>, attribute='director', value='Greta Gerwig') limit=None  
  
  
  
  
  
 [Document(page\_content='A bunch of normal-sized women are supremely wholesome and some men pine after them', metadata={'year': 2019, 'rating': 8.3, 'director': 'Greta Gerwig'})]  

```

```python
# This example specifies a composite filter  
retriever.get\_relevant\_documents(  
 "What's a highly rated (above 8.5) science fiction film?"  
)  

```

```text
 query=' ' filter=Operation(operator=<Operator.AND: 'and'>, arguments=[Comparison(comparator=<Comparator.GTE: 'gte'>, attribute='rating', value=8.5), Comparison(comparator=<Comparator.EQ: 'eq'>, attribute='genre', value='science fiction')]) limit=None  
  
  
  
  
  
 [Document(page\_content='Three men walk into the Zone, three men walk out of the Zone', metadata={'year': 1979, 'genre': 'science fiction', 'rating': 9.9, 'director': 'Andrei Tarkovsky'})]  

```

```python
# This example specifies a query and composite filter  
retriever.get\_relevant\_documents(  
 "What's a movie after 1990 but before (or on) 2005 that's all about toys, and preferably is animated"  
)  

```

```text
 query='toys' filter=Operation(operator=<Operator.AND: 'and'>, arguments=[Comparison(comparator=<Comparator.GT: 'gt'>, attribute='year', value=1990), Comparison(comparator=<Comparator.LTE: 'lte'>, attribute='year', value=2005), Comparison(comparator=<Comparator.LIKE: 'like'>, attribute='genre', value='animated')]) limit=None  
  
  
  
  
  
 [Document(page\_content='Toys come alive and have a blast doing so', metadata={'year': 1995, 'genre': 'animated'})]  

```

## Filter k[​](#filter-k "Direct link to Filter k")

We can also use the self query retriever to specify `k`: the number of documents to fetch.

We can do this by passing `enable_limit=True` to the constructor.

```python
retriever = SelfQueryRetriever.from\_llm(  
 llm,  
 vectorstore,  
 document\_content\_description,  
 metadata\_field\_info,  
 enable\_limit=True,  
 verbose=True,  
)  

```

```python
# This example only specifies a relevant query  
retriever.get\_relevant\_documents("what are two movies about dinosaurs")  

```

```text
 query='dinosaur' filter=None limit=2  
  
  
  
  
  
 [Document(page\_content='A bunch of scientists bring back dinosaurs and mayhem breaks loose', metadata={'year': 1993, 'genre': 'science fiction', 'rating': 7.7}),  
 Document(page\_content='Toys come alive and have a blast doing so', metadata={'year': 1995, 'genre': 'animated'})]  

```

- [Setup Supabase Database](#setup-supabase-database)
- [Creating a Supabase vector store](#creating-a-supabase-vector-store)
- [Creating our self-querying retriever](#creating-our-self-querying-retriever)
- [Testing it out](#testing-it-out)
- [Filter k](#filter-k)
