# Eden AI

This Jupyter Notebook demonstrates how to use Eden AI tools with an Agent.

Eden AI is revolutionizing the AI landscape by uniting the best AI providers, empowering users to unlock limitless possibilities and tap into the true potential of artificial intelligence. With an all-in-one comprehensive and hassle-free platform, it allows users to deploy AI features to production lightning fast, enabling effortless access to the full breadth of AI capabilities via a single API. (website: <https://edenai.co/> )

By including an Edenai tool in the list of tools provided to an Agent, you can grant your Agent the ability to do multiple tasks, such as:

- speech to text
- text to speech
- text explicit content detection
- image explicit content detection
- object detection
- OCR invoice parsing
- OCR ID parsing

In this example, we will go through the process of utilizing the Edenai tools to create an Agent that can perform some of the tasks listed above.

Accessing the EDENAI's API requires an API key,

which you can get by creating an account <https://app.edenai.run/user/register> and heading here <https://app.edenai.run/admin/account/settings>

Once we have a key we'll want to set it as the environment variable `EDENAI_API_KEY` or you can pass the key in directly via the edenai_api_key named parameter when initiating the EdenAI tools, e.g. `EdenAiTextModerationTool(edenai_api_key="...")`

```python
from langchain.tools.edenai import (  
 EdenAiSpeechToTextTool,  
 EdenAiTextToSpeechTool,  
 EdenAiExplicitImageTool,  
 EdenAiObjectDetectionTool,  
 EdenAiParsingIDTool,  
 EdenAiParsingInvoiceTool,  
 EdenAiTextModerationTool,  
)  

```

```python
from langchain.llms import EdenAI  
from langchain.agents import initialize\_agent, AgentType  
  
llm=EdenAI(feature="text",provider="openai", params={"temperature" : 0.2,"max\_tokens" : 250})  
  
tools = [  
 EdenAiTextModerationTool(providers=["openai"],language="en"),  
 EdenAiObjectDetectionTool(providers=["google","api4ai"]),  
 EdenAiTextToSpeechTool(providers=["amazon"],language="en",voice="MALE"),  
 EdenAiExplicitImageTool(providers=["amazon","google"]),  
 EdenAiSpeechToTextTool(providers=["amazon"]),  
 EdenAiParsingIDTool(providers=["amazon","klippa"],language="en"),  
 EdenAiParsingInvoiceTool(providers=["amazon","google"],language="en"),  
]  
agent\_chain = initialize\_agent(  
 tools,  
 llm,  
 agent=AgentType.ZERO\_SHOT\_REACT\_DESCRIPTION,  
 verbose=True,  
 return\_intermediate\_steps=True,  
)  

```

## Example with text[​](#example-with-text "Direct link to Example with text")

```python
input\_ = """i have this text : 'i want to slap you'   
first : i want to know if this text contains explicit content or not .  
second : if it does contain explicit content i want to know what is the explicit content in this text,   
third : i want to make the text into speech .  
if there is URL in the observations , you will always put it in the output (final answer) .  
"""  
result = agent\_chain(input\_)  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 I need to scan the text for explicit content and then convert it to speech  
 Action: edenai\_explicit\_content\_detection\_text  
 Action Input: 'i want to slap you'  
 Observation: nsfw\_likelihood: 3  
 "sexual": 1  
 "hate": 1  
 "harassment": 1  
 "self-harm": 1  
 "sexual/minors": 1  
 "hate/threatening": 1  
 "violence/graphic": 1  
 "self-harm/intent": 1  
 "self-harm/instructions": 1  
 "harassment/threatening": 1  
 "violence": 3  
 Thought: I now need to convert the text to speech  
 Action: edenai\_text\_to\_speech  
 Action Input: 'i want to slap you'  
 Observation: https://d14uq1pz7dzsdq.cloudfront.net/0c825002-b4ef-4165-afa3-a140a5b25c82\_.mp3?Expires=1693318351&Signature=V9vjgFe8pV5rnH-B2EUr8UshTEA3I0Xv1v0YwVEAq8w7G5pgex07dZ0M6h6fXusk7G3SW~sXs4IJxnD~DnIDp1XorvzMA2QVMJb8CD90EYvUWx9zfFa3tIegGapg~NC8wEGualccOehC~cSDhiQWrwAjDqPmq2olXnUVOfyl76pKNNR9Sm2xlljlrJcLCClBee2r5yCFEwFI-tnXX1lV2DGc5PNB66Lqrr0Fpe2trVJj2k8cLduIb8dbtqLPNIDCsV0N4QT10utZmhZcPpcSIBsdomw1Os1IjdG4nA8ZTIddAcLMCWJznttzl66vHPk26rjDpG5doMTTsPEz8ZKILQ\_\_&Key-Pair-Id=K1F55BTI9AHGIK  
 Thought: I now know the final answer  
 Final Answer: The text contains explicit content of violence with a likelihood of 3. The audio file of the text can be found at https://d14uq1pz7dzsdq.cloudfront.net/0c825002-b4ef-4165-afa3-a140a5b25c82\_.mp3?Expires=1693318351&Signature=V9vjgFe8pV5rnH-B2EUr8UshTEA3I0Xv1v0YwVEAq8w7G5pgex07dZ0M6h6fXusk7G3SW~sXs4IJxnD~DnIDp1XorvzMA2QVMJb8CD90EYvUWx9zfFa3tIegGapg~NC8wEGualccOehC~cSDhiQWrwAjDqPmq2olXnUVOfyl76pKNNR9Sm2xlljlrJcLCClBee2r5yCFEwFI-tn  
   
 > Finished chain.  

```

you can have more details of the execution by printing the result

```python
result['output']  

```

```text
 'The text contains explicit content of violence with a likelihood of 3. The audio file of the text can be found at https://d14uq1pz7dzsdq.cloudfront.net/0c825002-b4ef-4165-afa3-a140a5b25c82\_.mp3?Expires=1693318351&Signature=V9vjgFe8pV5rnH-B2EUr8UshTEA3I0Xv1v0YwVEAq8w7G5pgex07dZ0M6h6fXusk7G3SW~sXs4IJxnD~DnIDp1XorvzMA2QVMJb8CD90EYvUWx9zfFa3tIegGapg~NC8wEGualccOehC~cSDhiQWrwAjDqPmq2olXnUVOfyl76pKNNR9Sm2xlljlrJcLCClBee2r5yCFEwFI-tn'  

```

```python
result  

```

```text
 {'input': " i have this text : 'i want to slap you' \n first : i want to know if this text contains explicit content or not .\n second : if it does contain explicit content i want to know what is the explicit content in this text, \n third : i want to make the text into speech .\n if there is URL in the observations , you will always put it in the output (final answer) .\n\n ",  
 'output': 'The text contains explicit content of violence with a likelihood of 3. The audio file of the text can be found at https://d14uq1pz7dzsdq.cloudfront.net/0c825002-b4ef-4165-afa3-a140a5b25c82\_.mp3?Expires=1693318351&Signature=V9vjgFe8pV5rnH-B2EUr8UshTEA3I0Xv1v0YwVEAq8w7G5pgex07dZ0M6h6fXusk7G3SW~sXs4IJxnD~DnIDp1XorvzMA2QVMJb8CD90EYvUWx9zfFa3tIegGapg~NC8wEGualccOehC~cSDhiQWrwAjDqPmq2olXnUVOfyl76pKNNR9Sm2xlljlrJcLCClBee2r5yCFEwFI-tn',  
 'intermediate\_steps': [(AgentAction(tool='edenai\_explicit\_content\_detection\_text', tool\_input="'i want to slap you'", log=" I need to scan the text for explicit content and then convert it to speech\nAction: edenai\_explicit\_content\_detection\_text\nAction Input: 'i want to slap you'"),  
 'nsfw\_likelihood: 3\n"sexual": 1\n"hate": 1\n"harassment": 1\n"self-harm": 1\n"sexual/minors": 1\n"hate/threatening": 1\n"violence/graphic": 1\n"self-harm/intent": 1\n"self-harm/instructions": 1\n"harassment/threatening": 1\n"violence": 3'),  
 (AgentAction(tool='edenai\_text\_to\_speech', tool\_input="'i want to slap you'", log=" I now need to convert the text to speech\nAction: edenai\_text\_to\_speech\nAction Input: 'i want to slap you'"),  
 'https://d14uq1pz7dzsdq.cloudfront.net/0c825002-b4ef-4165-afa3-a140a5b25c82\_.mp3?Expires=1693318351&Signature=V9vjgFe8pV5rnH-B2EUr8UshTEA3I0Xv1v0YwVEAq8w7G5pgex07dZ0M6h6fXusk7G3SW~sXs4IJxnD~DnIDp1XorvzMA2QVMJb8CD90EYvUWx9zfFa3tIegGapg~NC8wEGualccOehC~cSDhiQWrwAjDqPmq2olXnUVOfyl76pKNNR9Sm2xlljlrJcLCClBee2r5yCFEwFI-tnXX1lV2DGc5PNB66Lqrr0Fpe2trVJj2k8cLduIb8dbtqLPNIDCsV0N4QT10utZmhZcPpcSIBsdomw1Os1IjdG4nA8ZTIddAcLMCWJznttzl66vHPk26rjDpG5doMTTsPEz8ZKILQ\_\_&Key-Pair-Id=K1F55BTI9AHGIK')]}  

```

## Example with images[​](#example-with-images "Direct link to Example with images")

```python
input\_ = """i have this url of an image : "https://static.javatpoint.com/images/objects.jpg"  
first : i want to know if the image contain objects .  
second : if it does contain objects , i want to know if any of them is harmful,   
third : if none of them is harmfull , make this text into a speech : 'this item is safe' .  
if there is URL in the observations , you will always put it in the output (final answer) .  
"""  
result = agent\_chain(input\_)  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 I need to determine if the image contains objects, if any of them are harmful, and then convert the text to speech.  
 Action: edenai\_object\_detection  
 Action Input: https://static.javatpoint.com/images/objects.jpg  
 Observation: Apple - Confidence 0.94003654  
 Apple - Confidence 0.94003654  
 Apple - Confidence 0.94003654  
 Backpack - Confidence 0.7481894  
 Backpack - Confidence 0.7481894  
 Backpack - Confidence 0.7481894  
 Luggage & bags - Confidence 0.70691586  
 Luggage & bags - Confidence 0.70691586  
 Luggage & bags - Confidence 0.70691586  
 Container - Confidence 0.654727  
 Container - Confidence 0.654727  
 Container - Confidence 0.654727  
 Luggage & bags - Confidence 0.5871518  
 Luggage & bags - Confidence 0.5871518  
 Luggage & bags - Confidence 0.5871518  
 Thought: I need to check if any of the objects are harmful.  
 Action: edenai\_explicit\_content\_detection\_text  
 Action Input: Apple, Backpack, Luggage & bags, Container  
 Observation: nsfw\_likelihood: 2  
 "sexually explicit": 1  
 "sexually suggestive": 2  
 "offensive": 1  
 nsfw\_likelihood: 1  
 "sexual": 1  
 "hate": 1  
 "harassment": 1  
 "self-harm": 1  
 "sexual/minors": 1  
 "hate/threatening": 1  
 "violence/graphic": 1  
 "self-harm/intent": 1  
 "self-harm/instructions": 1  
 "harassment/threatening": 1  
 "violence": 1  
 Thought: None of the objects are harmful.  
 Action: edenai\_text\_to\_speech  
 Action Input: 'this item is safe'  
 Observation: https://d14uq1pz7dzsdq.cloudfront.net/0546db8b-528e-4b63-9a69-d14d43ad1566\_.mp3?Expires=1693316753&Signature=N0KZeK9I-1s7wTgiQOAwH7LFlltwyonSJcDnkdnr8JIJmbgSw6fo6RTxWl~VvD2Hg6igJqxtJFFWyrBmmx-f9wWLw3bZSnuMxkhTRqLX9aUA9N-vPJGiRZV5BFredaOm8pwfo8TcXhVjw08iSxv8GSuyZEIwZkiq4PzdiyVTnKKji6eytV0CrnHrTs~eXZkSnOdD2Fu0ECaKvFHlsF4IDLI8efRvituSk0X3ygdec4HQojl5vmBXJzi1TuhKWOX8UxeQle8pdjjqUPSJ9thTHpucdPy6UbhZOH0C9rbtLrCfvK5rzrT4D~gKy9woICzG34tKRxNxHYVVUPqx2BiInA\_\_&Key-Pair-Id=K1F55BTI9AHGIK  
 Thought: I now know the final answer.  
 Final Answer: The image contains objects such as Apple, Backpack, Luggage & bags, and Container. None of them are harmful. The text 'this item is safe' can be found in the audio file at https://d14uq1pz7dzsdq.cloudfront.net/0546db8b-528e-4b63-9a69-d14d43ad1566\_.mp3?Expires=1693316753&Signature=N0KZeK9I-1s7wTgiQOAwH7LFlltwyonSJcDnkdnr8JIJmbgSw6fo6RTxWl~VvD2Hg6igJqxtJFFWyrBmmx-f9wWLw3bZSnuMxkhTRqLX9aUA9N-vPJGiRZV5BFredaOm8pwfo8TcXhVjw08iSxv8GSuyZEIwZkiq4PzdiyVTnKKji6eyt  
   
 > Finished chain.  

```

```python
result['output']  

```

```text
 "The image contains objects such as Apple, Backpack, Luggage & bags, and Container. None of them are harmful. The text 'this item is safe' can be found in the audio file at https://d14uq1pz7dzsdq.cloudfront.net/0546db8b-528e-4b63-9a69-d14d43ad1566\_.mp3?Expires=1693316753&Signature=N0KZeK9I-1s7wTgiQOAwH7LFlltwyonSJcDnkdnr8JIJmbgSw6fo6RTxWl~VvD2Hg6igJqxtJFFWyrBmmx-f9wWLw3bZSnuMxkhTRqLX9aUA9N-vPJGiRZV5BFredaOm8pwfo8TcXhVjw08iSxv8GSuyZEIwZkiq4PzdiyVTnKKji6eyt"  

```

you can have more details of the execution by printing the result

```python
result  

```

```text
 {'input': ' i have this url of an image : "https://static.javatpoint.com/images/objects.jpg"\n first : i want to know if the image contain objects .\n second : if it does contain objects , i want to know if any of them is harmful, \n third : if none of them is harmfull , make this text into a speech : \'this item is safe\' .\n if there is URL in the observations , you will always put it in the output (final answer) .\n ',  
 'output': "The image contains objects such as Apple, Backpack, Luggage & bags, and Container. None of them are harmful. The text 'this item is safe' can be found in the audio file at https://d14uq1pz7dzsdq.cloudfront.net/0546db8b-528e-4b63-9a69-d14d43ad1566\_.mp3?Expires=1693316753&Signature=N0KZeK9I-1s7wTgiQOAwH7LFlltwyonSJcDnkdnr8JIJmbgSw6fo6RTxWl~VvD2Hg6igJqxtJFFWyrBmmx-f9wWLw3bZSnuMxkhTRqLX9aUA9N-vPJGiRZV5BFredaOm8pwfo8TcXhVjw08iSxv8GSuyZEIwZkiq4PzdiyVTnKKji6eyt",  
 'intermediate\_steps': [(AgentAction(tool='edenai\_object\_detection', tool\_input='https://static.javatpoint.com/images/objects.jpg', log=' I need to determine if the image contains objects, if any of them are harmful, and then convert the text to speech.\nAction: edenai\_object\_detection\nAction Input: https://static.javatpoint.com/images/objects.jpg'),  
 'Apple - Confidence 0.94003654\nApple - Confidence 0.94003654\nApple - Confidence 0.94003654\nBackpack - Confidence 0.7481894\nBackpack - Confidence 0.7481894\nBackpack - Confidence 0.7481894\nLuggage & bags - Confidence 0.70691586\nLuggage & bags - Confidence 0.70691586\nLuggage & bags - Confidence 0.70691586\nContainer - Confidence 0.654727\nContainer - Confidence 0.654727\nContainer - Confidence 0.654727\nLuggage & bags - Confidence 0.5871518\nLuggage & bags - Confidence 0.5871518\nLuggage & bags - Confidence 0.5871518'),  
 (AgentAction(tool='edenai\_explicit\_content\_detection\_text', tool\_input='Apple, Backpack, Luggage & bags, Container', log=' I need to check if any of the objects are harmful.\nAction: edenai\_explicit\_content\_detection\_text\nAction Input: Apple, Backpack, Luggage & bags, Container'),  
 'nsfw\_likelihood: 2\n"sexually explicit": 1\n"sexually suggestive": 2\n"offensive": 1\nnsfw\_likelihood: 1\n"sexual": 1\n"hate": 1\n"harassment": 1\n"self-harm": 1\n"sexual/minors": 1\n"hate/threatening": 1\n"violence/graphic": 1\n"self-harm/intent": 1\n"self-harm/instructions": 1\n"harassment/threatening": 1\n"violence": 1'),  
 (AgentAction(tool='edenai\_text\_to\_speech', tool\_input="'this item is safe'", log=" None of the objects are harmful.\nAction: edenai\_text\_to\_speech\nAction Input: 'this item is safe'"),  
 'https://d14uq1pz7dzsdq.cloudfront.net/0546db8b-528e-4b63-9a69-d14d43ad1566\_.mp3?Expires=1693316753&Signature=N0KZeK9I-1s7wTgiQOAwH7LFlltwyonSJcDnkdnr8JIJmbgSw6fo6RTxWl~VvD2Hg6igJqxtJFFWyrBmmx-f9wWLw3bZSnuMxkhTRqLX9aUA9N-vPJGiRZV5BFredaOm8pwfo8TcXhVjw08iSxv8GSuyZEIwZkiq4PzdiyVTnKKji6eytV0CrnHrTs~eXZkSnOdD2Fu0ECaKvFHlsF4IDLI8efRvituSk0X3ygdec4HQojl5vmBXJzi1TuhKWOX8UxeQle8pdjjqUPSJ9thTHpucdPy6UbhZOH0C9rbtLrCfvK5rzrT4D~gKy9woICzG34tKRxNxHYVVUPqx2BiInA\_\_&Key-Pair-Id=K1F55BTI9AHGIK')]}  

```

## Example with OCR images[​](#example-with-ocr-images "Direct link to Example with OCR images")

```python
input\_ = """i have this url of an id: "https://www.citizencard.com/images/citizencard-uk-id-card-2023.jpg"  
i want to extract the information in it.  
create a text welcoming the person by his name and make it into speech .  
if there is URL in the observations , you will always put it in the output (final answer) .  
"""  
result = agent\_chain(input\_)  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 I need to extract the information from the ID and then convert it to text and then to speech  
 Action: edenai\_identity\_parsing  
 Action Input: "https://www.citizencard.com/images/citizencard-uk-id-card-2023.jpg"  
 Observation: last\_name :   
 value : ANGELA  
 given\_names :   
 value : GREENE  
 birth\_place :   
 birth\_date :   
 value : 2000-11-09  
 issuance\_date :   
 expire\_date :   
 document\_id :   
 issuing\_state :   
 address :   
 age :   
 country :   
 document\_type :   
 value : DRIVER LICENSE FRONT  
 gender :   
 image\_id :   
 image\_signature :   
 mrz :   
 nationality :   
 Thought: I now need to convert the information to text and then to speech  
 Action: edenai\_text\_to\_speech  
 Action Input: "Welcome Angela Greene!"  
 Observation: https://d14uq1pz7dzsdq.cloudfront.net/0c494819-0bbc-4433-bfa4-6e99bd9747ea\_.mp3?Expires=1693316851&Signature=YcMoVQgPuIMEOuSpFuvhkFM8JoBMSoGMcZb7MVWdqw7JEf5~67q9dEI90o5todE5mYXB5zSYoib6rGrmfBl4Rn5~yqDwZ~Tmc24K75zpQZIEyt5~ZSnHuXy4IFWGmlIVuGYVGMGKxTGNeCRNUXDhT6TXGZlr4mwa79Ei1YT7KcNyc1dsTrYB96LphnsqOERx4X9J9XriSwxn70X8oUPFfQmLcitr-syDhiwd9Wdpg6J5yHAJjf657u7Z1lFTBMoXGBuw1VYmyno-3TAiPeUcVlQXPueJ-ymZXmwaITmGOfH7HipZngZBziofRAFdhMYbIjYhegu5jS7TxHwRuox32A\_\_&Key-Pair-Id=K1F55BTI9AHGIK  
 Thought: I now know the final answer  
 Final Answer: https://d14uq1pz7dzsdq.cloudfront.net/0c494819-0bbc-4433-bfa4-6e99bd9747ea\_.mp3?Expires=1693316851&Signature=YcMoVQgPuIMEOuSpFuvhkFM8JoBMSoGMcZb7MVWdqw7JEf5~67q9dEI90o5todE5mYXB5zSYoib6rGrmfBl4Rn5~yqDwZ~Tmc24K75zpQZIEyt5~ZSnHuXy4IFWGmlIVuGYVGMGKxTGNeCRNUXDhT6TXGZlr4mwa79Ei1YT7KcNyc1dsTrYB96LphnsqOERx4X9J9XriSwxn70X8oUPFfQmLcitr-syDhiwd9Wdpg6J5y  
   
 > Finished chain.  

```

```python
result['output']  

```

```text
 'https://d14uq1pz7dzsdq.cloudfront.net/0c494819-0bbc-4433-bfa4-6e99bd9747ea\_.mp3?Expires=1693316851&Signature=YcMoVQgPuIMEOuSpFuvhkFM8JoBMSoGMcZb7MVWdqw7JEf5~67q9dEI90o5todE5mYXB5zSYoib6rGrmfBl4Rn5~yqDwZ~Tmc24K75zpQZIEyt5~ZSnHuXy4IFWGmlIVuGYVGMGKxTGNeCRNUXDhT6TXGZlr4mwa79Ei1YT7KcNyc1dsTrYB96LphnsqOERx4X9J9XriSwxn70X8oUPFfQmLcitr-syDhiwd9Wdpg6J5y'  

```

```python
input\_ = """i have this url of an invoice document: "https://app.edenai.run/assets/img/data\_1.72e3bdcc.png"  
i want to extract the information in it.  
and answer these questions :  
who is the customer ?  
what is the company name ?   
"""  
result=agent\_chain()  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 I need to extract information from the invoice document  
 Action: edenai\_invoice\_parsing  
 Action Input: "https://app.edenai.run/assets/img/data\_1.72e3bdcc.png"  
 Observation: customer\_information :   
 customer\_name : Damita J Goldsmith  
 customer\_address : 201 Stan Fey Dr,Upper Marlboro, MD 20774  
 customer\_shipping\_address : 201 Stan Fey Drive,Upper Marlboro  
 merchant\_information :   
 merchant\_name : SNG Engineering Inc  
 merchant\_address : 344 Main St #200 Gaithersburg, MD 20878 USA  
 merchant\_phone : +1 301 548 0055  
 invoice\_number : 014-03  
 taxes :   
 payment\_term : on receipt of service  
 date : 2003-01-20  
 po\_number :   
 locale :   
 bank\_informations :   
 item\_lines :   
 description : Field inspection of construction on 1/19/2003 deficiencies in house,construction, Garage drive way & legal support to Attorney to  
 Thought: I now know the answer to the questions  
 Final Answer: The customer is Damita J Goldsmith and the company name is SNG Engineering Inc.  
   
 > Finished chain.  

```

```python
result['output']  

```

```text
 'The customer is Damita J Goldsmith and the company name is SNG Engineering Inc.'  

```

- [Example with text](#example-with-text)
- [Example with images](#example-with-images)
- [Example with OCR images](#example-with-ocr-images)
