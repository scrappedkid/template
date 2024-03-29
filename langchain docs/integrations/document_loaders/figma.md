# Figma

[Figma](https://www.figma.com/) is a collaborative web application for interface design.

This notebook covers how to load data from the `Figma` REST API into a format that can be ingested into LangChain, along with example usage for code generation.

```python
import os  
  
  
from langchain.document\_loaders.figma import FigmaFileLoader  
  
from langchain.text\_splitter import CharacterTextSplitter  
from langchain.chat\_models import ChatOpenAI  
from langchain.indexes import VectorstoreIndexCreator  
from langchain.chains import ConversationChain, LLMChain  
from langchain.memory import ConversationBufferWindowMemory  
from langchain.prompts.chat import (  
 ChatPromptTemplate,  
 SystemMessagePromptTemplate,  
 AIMessagePromptTemplate,  
 HumanMessagePromptTemplate,  
)  

```

The Figma API Requires an access token, node_ids, and a file key.

The file key can be pulled from the URL. [https://www.figma.com/file/{filekey}/sampleFilename](https://www.figma.com/file/%7Bfilekey%7D/sampleFilename)

Node IDs are also available in the URL. Click on anything and look for the '?node-id={node_id}' param.

Access token instructions are in the Figma help center article: <https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens>

```python
figma\_loader = FigmaFileLoader(  
 os.environ.get("ACCESS\_TOKEN"),  
 os.environ.get("NODE\_IDS"),  
 os.environ.get("FILE\_KEY"),  
)  

```

```python
# see https://python.langchain.com/en/latest/modules/data\_connection/getting\_started.html for more details  
index = VectorstoreIndexCreator().from\_loaders([figma\_loader])  
figma\_doc\_retriever = index.vectorstore.as\_retriever()  

```

```python
def generate\_code(human\_input):  
 # I have no idea if the Jon Carmack thing makes for better code. YMMV.  
 # See https://python.langchain.com/en/latest/modules/models/chat/getting\_started.html for chat info  
 system\_prompt\_template = """You are expert coder Jon Carmack. Use the provided design context to create idiomatic HTML/CSS code as possible based on the user request.  
 Everything must be inline in one file and your response must be directly renderable by the browser.  
 Figma file nodes and metadata: {context}"""  
  
 human\_prompt\_template = "Code the {text}. Ensure it's mobile responsive"  
 system\_message\_prompt = SystemMessagePromptTemplate.from\_template(  
 system\_prompt\_template  
 )  
 human\_message\_prompt = HumanMessagePromptTemplate.from\_template(  
 human\_prompt\_template  
 )  
 # delete the gpt-4 model\_name to use the default gpt-3.5 turbo for faster results  
 gpt\_4 = ChatOpenAI(temperature=0.02, model\_name="gpt-4")  
 # Use the retriever's 'get\_relevant\_documents' method if needed to filter down longer docs  
 relevant\_nodes = figma\_doc\_retriever.get\_relevant\_documents(human\_input)  
 conversation = [system\_message\_prompt, human\_message\_prompt]  
 chat\_prompt = ChatPromptTemplate.from\_messages(conversation)  
 response = gpt\_4(  
 chat\_prompt.format\_prompt(  
 context=relevant\_nodes, text=human\_input  
 ).to\_messages()  
 )  
 return response  

```

```python
response = generate\_code("page top header")  

```

Returns the following in `response.content`:

```text
<!DOCTYPE html>\n<html lang="en">\n<head>\n <meta charset="UTF-8">\n <meta name="viewport" content="width=device-width, initial-scale=1.0">\n <style>\n @import url(\'https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&family=Inter:wght@600&display=swap\');\n\n body {\n margin: 0;\n font-family: \'DM Sans\', sans-serif;\n }\n\n .header {\n display: flex;\n justify-content: space-between;\n align-items: center;\n padding: 20px;\n background-color: #fff;\n box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n }\n\n .header h1 {\n font-size: 16px;\n font-weight: 700;\n margin: 0;\n }\n\n .header nav {\n display: flex;\n align-items: center;\n }\n\n .header nav a {\n font-size: 14px;\n font-weight: 500;\n text-decoration: none;\n color: #000;\n margin-left: 20px;\n }\n\n @media (max-width: 768px) {\n .header nav {\n display: none;\n }\n }\n </style>\n</head>\n<body>\n <header class="header">\n <h1>Company Contact</h1>\n <nav>\n <a href="#">Lorem Ipsum</a>\n <a href="#">Lorem Ipsum</a>\n <a href="#">Lorem Ipsum</a>\n </nav>\n </header>\n</body>\n</html>  

```
