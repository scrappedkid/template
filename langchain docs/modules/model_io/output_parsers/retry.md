# Retry parser

While in some cases it is possible to fix any parsing mistakes by only looking at the output, in other cases it isn't. An example of this is when the output is not just in the incorrect format, but is partially complete. Consider the below example.

```python
from langchain.prompts import (  
 PromptTemplate,  
 ChatPromptTemplate,  
 HumanMessagePromptTemplate,  
)  
from langchain.llms import OpenAI  
from langchain.chat\_models import ChatOpenAI  
from langchain.output\_parsers import (  
 PydanticOutputParser,  
 OutputFixingParser,  
 RetryOutputParser,  
)  
from pydantic import BaseModel, Field, validator  
from typing import List  

```

```python
template = """Based on the user question, provide an Action and Action Input for what step should be taken.  
{format\_instructions}  
Question: {query}  
Response:"""  
  
  
class Action(BaseModel):  
 action: str = Field(description="action to take")  
 action\_input: str = Field(description="input to the action")  
  
  
parser = PydanticOutputParser(pydantic\_object=Action)  

```

```python
prompt = PromptTemplate(  
 template="Answer the user query.\n{format\_instructions}\n{query}\n",  
 input\_variables=["query"],  
 partial\_variables={"format\_instructions": parser.get\_format\_instructions()},  
)  

```

```python
prompt\_value = prompt.format\_prompt(query="who is leo di caprios gf?")  

```

```python
bad\_response = '{"action": "search"}'  

```

If we try to parse this response as is, we will get an error:

```python
parser.parse(bad\_response)  

```

```text
 ---------------------------------------------------------------------------  
  
 ValidationError Traceback (most recent call last)  
  
 File ~/workplace/langchain/langchain/output\_parsers/pydantic.py:24, in PydanticOutputParser.parse(self, text)  
 23 json\_object = json.loads(json\_str)  
 ---> 24 return self.pydantic\_object.parse\_obj(json\_object)  
 26 except (json.JSONDecodeError, ValidationError) as e:  
  
  
 File ~/.pyenv/versions/3.9.1/envs/langchain/lib/python3.9/site-packages/pydantic/main.py:527, in pydantic.main.BaseModel.parse\_obj()  
  
  
 File ~/.pyenv/versions/3.9.1/envs/langchain/lib/python3.9/site-packages/pydantic/main.py:342, in pydantic.main.BaseModel.\_\_init\_\_()  
  
  
 ValidationError: 1 validation error for Action  
 action\_input  
 field required (type=value\_error.missing)  
  
   
 During handling of the above exception, another exception occurred:  
  
  
 OutputParserException Traceback (most recent call last)  
  
 Cell In[6], line 1  
 ----> 1 parser.parse(bad\_response)  
  
  
 File ~/workplace/langchain/langchain/output\_parsers/pydantic.py:29, in PydanticOutputParser.parse(self, text)  
 27 name = self.pydantic\_object.\_\_name\_\_  
 28 msg = f"Failed to parse {name} from completion {text}. Got: {e}"  
 ---> 29 raise OutputParserException(msg)  
  
  
 OutputParserException: Failed to parse Action from completion {"action": "search"}. Got: 1 validation error for Action  
 action\_input  
 field required (type=value\_error.missing)  

```

If we try to use the `OutputFixingParser` to fix this error, it will be confused - namely, it doesn't know what to actually put for action input.

```python
fix\_parser = OutputFixingParser.from\_llm(parser=parser, llm=ChatOpenAI())  

```

```python
fix\_parser.parse(bad\_response)  

```

```text
 Action(action='search', action\_input='')  

```

Instead, we can use the RetryOutputParser, which passes in the prompt (as well as the original output) to try again to get a better response.

```python
from langchain.output\_parsers import RetryWithErrorOutputParser  

```

```python
retry\_parser = RetryWithErrorOutputParser.from\_llm(  
 parser=parser, llm=OpenAI(temperature=0)  
)  

```

```python
retry\_parser.parse\_with\_prompt(bad\_response, prompt\_value)  

```

```text
 Action(action='search', action\_input='who is leo di caprios gf?')  

```
