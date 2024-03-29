# Vectara

[Vectara](https://docs.vectara.com/docs/) is a GenAI platform for developers. It provides a simple API to build Grounded Generation
(aka Retrieval-augmented-generation or RAG) applications.

**Vectara Overview:**

- `Vectara` is developer-first API platform for building GenAI applications
- To use Vectara - first [sign up](https://vectara.com/integrations/langchain) and create an account. Then create a corpus and an API key for indexing and searching.
- You can use Vectara's [indexing API](https://docs.vectara.com/docs/indexing-apis/indexing) to add documents into Vectara's index
- You can use Vectara's [Search API](https://docs.vectara.com/docs/search-apis/search) to query Vectara's index (which also supports Hybrid search implicitly).
- You can use Vectara's integration with LangChain as a Vector store or using the Retriever abstraction.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

To use `Vectara` with LangChain no special installation steps are required.
To get started, [sign up](https://vectara.com/integrations/langchain) and follow our [quickstart](https://docs.vectara.com/docs/quickstart) guide to create a corpus and an API key.
Once you have these, you can provide them as arguments to the Vectara vectorstore, or you can set them as environment variables.

- export `VECTARA_CUSTOMER_ID`="your_customer_id"
- export `VECTARA_CORPUS_ID`="your_corpus_id"
- export `VECTARA_API_KEY`="your-vectara-api-key"

## Vector Store[​](#vector-store "Direct link to Vector Store")

There exists a wrapper around the Vectara platform, allowing you to use it as a vectorstore, whether for semantic search or example selection.

To import this vectorstore:

```python
from langchain.vectorstores import Vectara  

```

To create an instance of the Vectara vectorstore:

```python
vectara = Vectara(  
 vectara\_customer\_id=customer\_id,   
 vectara\_corpus\_id=corpus\_id,   
 vectara\_api\_key=api\_key  
)  

```

The customer_id, corpus_id and api_key are optional, and if they are not supplied will be read from the environment variables `VECTARA_CUSTOMER_ID`, `VECTARA_CORPUS_ID` and `VECTARA_API_KEY`, respectively.

After you have the vectorstore, you can `add_texts` or `add_documents` as per the standard `VectorStore` interface, for example:

```python
vectara.add\_texts(["to be or not to be", "that is the question"])  

```

Since Vectara supports file-upload, we also added the ability to upload files (PDF, TXT, HTML, PPT, DOC, etc) directly as file. When using this method, the file is uploaded directly to the Vectara backend, processed and chunked optimally there, so you don't have to use the LangChain document loader or chunking mechanism.

As an example:

```python
vectara.add\_files(["path/to/file1.pdf", "path/to/file2.pdf",...])  

```

To query the vectorstore, you can use the `similarity_search` method (or `similarity_search_with_score`), which takes a query string and returns a list of results:

```python
results = vectara.similarity\_score("what is LangChain?")  

```

`similarity_search_with_score` also supports the following additional arguments:

- `k`: number of results to return (defaults to 5)
- `lambda_val`: the [lexical matching](https://docs.vectara.com/docs/api-reference/search-apis/lexical-matching) factor for hybrid search (defaults to 0.025)
- `filter`: a [filter](https://docs.vectara.com/docs/common-use-cases/filtering-by-metadata/filter-overview) to apply to the results (default None)
- `n_sentence_context`: number of sentences to include before/after the actual matching segment when returning results. This defaults to 2.

The results are returned as a list of relevant documents, and a relevance score of each document.

For a more detailed examples of using the Vectara wrapper, see one of these two sample notebooks:

- [Chat Over Documents with Vectara](/docs/integrations/providers/vectara/vectara_chat.html)

- [Vectara Text Generation](/docs/integrations/providers/vectara/vectara_text_generation.html)

- [Installation and Setup](#installation-and-setup)

- [Vector Store](#vector-store)
