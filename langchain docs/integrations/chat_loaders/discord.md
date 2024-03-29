# Discord

This notebook shows how to create your own chat loader that works on copy-pasted messages (from dms) to a list of LangChain messages.

The process has four steps:

1. Create the chat .txt file by copying chats from the Discord app and pasting them in a file on your local computer

1. Copy the chat loader definition from below to a local file.

1. Initialize the `DiscordChatLoader` with the file path pointed to the text file.

1. Call `loader.load()` (or `loader.lazy_load()`) to perform the conversion.

1. Create message dump[​](#1-create-message-dump "Direct link to 1. Create message dump")

______________________________________________________________________

Currently (2023/08/23) this loader only supports .txt files in the format generated by copying messages in the app to your clipboard and pasting in a file. Below is an example.

```txt
talkingtower — 08/15/2023 11:10 AM  
Love music! Do you like jazz?  
reporterbob — 08/15/2023 9:27 PM  
Yes! Jazz is fantastic. Ever heard this one?  
Website  
Listen to classic jazz track...  
  
talkingtower — Yesterday at 5:03 AM  
Indeed! Great choice. 🎷  
reporterbob — Yesterday at 5:23 AM  
Thanks! How about some virtual sightseeing?  
Website  
Virtual tour of famous landmarks...  
  
talkingtower — Today at 2:38 PM  
Sounds fun! Let's explore.  
reporterbob — Today at 2:56 PM  
Enjoy the tour! See you around.  
talkingtower — Today at 3:00 PM  
Thank you! Goodbye! 👋  
reporterbob — Today at 3:02 PM  
Farewell! Happy exploring.  

```

2. Define chat loader[​](#2-define-chat-loader "Direct link to 2. Define chat loader")

______________________________________________________________________

LangChain currently does not support

```python
import logging  
import re  
from typing import Iterator, List  
  
from langchain.schema import BaseMessage, HumanMessage  
from langchain.chat\_loaders import base as chat\_loaders  
  
logger = logging.getLogger()  
  
  
class DiscordChatLoader(chat\_loaders.BaseChatLoader):  
   
 def \_\_init\_\_(self, path: str):  
 """  
 Initialize the Discord chat loader.  
  
 Args:  
 path: Path to the exported Discord chat text file.  
 """  
 self.path = path  
 self.\_message\_line\_regex = re.compile(  
 r"(.+?) — (\w{3,9} \d{1,2}(?:st|nd|rd|th)?(?:, \d{4})? \d{1,2}:\d{2} (?:AM|PM)|Today at \d{1,2}:\d{2} (?:AM|PM)|Yesterday at \d{1,2}:\d{2} (?:AM|PM))", # noqa  
 flags=re.DOTALL,  
 )  
  
 def \_load\_single\_chat\_session\_from\_txt(  
 self, file\_path: str  
 ) -> chat\_loaders.ChatSession:  
 """  
 Load a single chat session from a text file.  
  
 Args:  
 file\_path: Path to the text file containing the chat messages.  
  
 Returns:  
 A `ChatSession` object containing the loaded chat messages.  
 """  
 with open(file\_path, "r", encoding="utf-8") as file:  
 lines = file.readlines()  
  
 results: List[BaseMessage] = []  
 current\_sender = None  
 current\_timestamp = None  
 current\_content = []  
 for line in lines:  
 if re.match(  
 r".+? — (\d{2}/\d{2}/\d{4} \d{1,2}:\d{2} (?:AM|PM)|Today at \d{1,2}:\d{2} (?:AM|PM)|Yesterday at \d{1,2}:\d{2} (?:AM|PM))", # noqa  
 line,  
 ):  
 if current\_sender and current\_content:  
 results.append(  
 HumanMessage(  
 content="".join(current\_content).strip(),  
 additional\_kwargs={  
 "sender": current\_sender,  
 "events": [{"message\_time": current\_timestamp}],  
 },  
 )  
 )  
 current\_sender, current\_timestamp = line.split(" — ")[:2]  
 current\_content = [  
 line[len(current\_sender) + len(current\_timestamp) + 4 :].strip()  
 ]  
 elif re.match(r"\[\d{1,2}:\d{2} (?:AM|PM)\]", line.strip()):  
 results.append(  
 HumanMessage(  
 content="".join(current\_content).strip(),  
 additional\_kwargs={  
 "sender": current\_sender,  
 "events": [{"message\_time": current\_timestamp}],  
 },  
 )  
 )  
 current\_timestamp = line.strip()[1:-1]  
 current\_content = []  
 else:  
 current\_content.append("\n" + line.strip())  
  
 if current\_sender and current\_content:  
 results.append(  
 HumanMessage(  
 content="".join(current\_content).strip(),  
 additional\_kwargs={  
 "sender": current\_sender,  
 "events": [{"message\_time": current\_timestamp}],  
 },  
 )  
 )  
  
 return chat\_loaders.ChatSession(messages=results)  
  
 def lazy\_load(self) -> Iterator[chat\_loaders.ChatSession]:  
 """  
 Lazy load the messages from the chat file and yield them in the required format.  
  
 Yields:  
 A `ChatSession` object containing the loaded chat messages.  
 """  
 yield self.\_load\_single\_chat\_session\_from\_txt(self.path)  

```

2. Create loader[​](#2-create-loader "Direct link to 2. Create loader")

______________________________________________________________________

We will point to the file we just wrote to disk.

```python
loader = DiscordChatLoader(  
 path="./discord\_chats.txt",  
)  

```

3. Load Messages[​](#3-load-messages "Direct link to 3. Load Messages")

______________________________________________________________________

Assuming the format is correct, the loader will convert the chats to langchain messages.

```python
from typing import List  
from langchain.chat\_loaders.base import ChatSession  
from langchain.chat\_loaders.utils import (  
 map\_ai\_messages,  
 merge\_chat\_runs,  
)  
  
raw\_messages = loader.lazy\_load()  
# Merge consecutive messages from the same sender into a single message  
merged\_messages = merge\_chat\_runs(raw\_messages)  
# Convert messages from "talkingtower" to AI messages  
messages: List[ChatSession] = list(map\_ai\_messages(merged\_messages, sender="talkingtower"))  

```

```python
messages  

```

```text
 [{'messages': [AIMessage(content='Love music! Do you like jazz?', additional\_kwargs={'sender': 'talkingtower', 'events': [{'message\_time': '08/15/2023 11:10 AM\n'}]}, example=False),  
 HumanMessage(content='Yes! Jazz is fantastic. Ever heard this one?\nWebsite\nListen to classic jazz track...', additional\_kwargs={'sender': 'reporterbob', 'events': [{'message\_time': '08/15/2023 9:27 PM\n'}]}, example=False),  
 AIMessage(content='Indeed! Great choice. 🎷', additional\_kwargs={'sender': 'talkingtower', 'events': [{'message\_time': 'Yesterday at 5:03 AM\n'}]}, example=False),  
 HumanMessage(content='Thanks! How about some virtual sightseeing?\nWebsite\nVirtual tour of famous landmarks...', additional\_kwargs={'sender': 'reporterbob', 'events': [{'message\_time': 'Yesterday at 5:23 AM\n'}]}, example=False),  
 AIMessage(content="Sounds fun! Let's explore.", additional\_kwargs={'sender': 'talkingtower', 'events': [{'message\_time': 'Today at 2:38 PM\n'}]}, example=False),  
 HumanMessage(content='Enjoy the tour! See you around.', additional\_kwargs={'sender': 'reporterbob', 'events': [{'message\_time': 'Today at 2:56 PM\n'}]}, example=False),  
 AIMessage(content='Thank you! Goodbye! 👋', additional\_kwargs={'sender': 'talkingtower', 'events': [{'message\_time': 'Today at 3:00 PM\n'}]}, example=False),  
 HumanMessage(content='Farewell! Happy exploring.', additional\_kwargs={'sender': 'reporterbob', 'events': [{'message\_time': 'Today at 3:02 PM\n'}]}, example=False)]}]  

```

### Next Steps[​](#next-steps "Direct link to Next Steps")

You can then use these messages how you see fit, such as fine-tuning a model, few-shot example selection, or directly make predictions for the next message

```python
from langchain.chat\_models import ChatOpenAI  
  
llm = ChatOpenAI()  
  
for chunk in llm.stream(messages[0]['messages']):  
 print(chunk.content, end="", flush=True)  

```

```text
 Thank you! Have a wonderful day! 🌟  

```

- [1. Create message dump](#1-create-message-dump)

- [2. Define chat loader](#2-define-chat-loader)

- [2. Create loader](#2-create-loader)

- [3. Load Messages](#3-load-messages)

  - [Next Steps](#next-steps)

- [Next Steps](#next-steps)
