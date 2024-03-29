# Async API

LangChain provides async support for Agents by leveraging the [asyncio](https://docs.python.org/3/library/asyncio.html) library.

Async methods are currently supported for the following `Tool`s: [`GoogleSerperAPIWrapper`](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain/utilities/google_serper.py), [`SerpAPIWrapper`](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain/utilities/serpapi.py), [`LLMMathChain`](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain/chains/llm_math/base.py) and [`Qdrant`](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain/vectorstores/qdrant.py). Async support for other agent tools are on the roadmap.

For `Tool`s that have a `coroutine` implemented (the four mentioned above), the `AgentExecutor` will `await` them directly. Otherwise, the `AgentExecutor` will call the `Tool`'s `func` via `asyncio.get_event_loop().run_in_executor` to avoid blocking the main runloop.

You can use `arun` to call an `AgentExecutor` asynchronously.

## Serial vs. concurrent execution[​](#serial-vs-concurrent-execution "Direct link to Serial vs. concurrent execution")

In this example, we kick off agents to answer some questions serially vs. concurrently. You can see that concurrent execution significantly speeds this up.

```python
import asyncio  
import time  
  
from langchain.agents import initialize\_agent, load\_tools  
from langchain.agents import AgentType  
from langchain.llms import OpenAI  
from langchain.callbacks.stdout import StdOutCallbackHandler  
from langchain.callbacks.tracers import LangChainTracer  
from aiohttp import ClientSession  
  
questions = [  
 "Who won the US Open men's final in 2019? What is his age raised to the 0.334 power?",  
 "Who is Olivia Wilde's boyfriend? What is his current age raised to the 0.23 power?",  
 "Who won the most recent formula 1 grand prix? What is their age raised to the 0.23 power?",  
 "Who won the US Open women's final in 2019? What is her age raised to the 0.34 power?",  
 "Who is Beyonce's husband? What is his age raised to the 0.19 power?",  
]  

```

```python
llm = OpenAI(temperature=0)  
tools = load\_tools(["google-serper", "llm-math"], llm=llm)  
agent = initialize\_agent(  
 tools, llm, agent=AgentType.ZERO\_SHOT\_REACT\_DESCRIPTION, verbose=True  
)  
  
s = time.perf\_counter()  
for q in questions:  
 agent.run(q)  
elapsed = time.perf\_counter() - s  
print(f"Serial executed in {elapsed:0.2f} seconds.")  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 I need to find out who won the US Open men's final in 2019 and then calculate his age raised to the 0.334 power.  
 Action: Google Serper  
 Action Input: "Who won the US Open men's final in 2019?"  
 Observation: Rafael Nadal defeated Daniil Medvedev in the final, 7–5, 6–3, 5–7, 4–6, 6–4 to win the men's singles tennis title at the 2019 US Open. It was his fourth US ... Draw: 128 (16 Q / 8 WC). Champion: Rafael Nadal. Runner-up: Daniil Medvedev. Score: 7–5, 6–3, 5–7, 4–6, 6–4. Bianca Andreescu won the women's singles title, defeating Serena Williams in straight sets in the final, becoming the first Canadian to win a Grand Slam singles ... Rafael Nadal won his 19th career Grand Slam title, and his fourth US Open crown, by surviving an all-time comback effort from Daniil ... Rafael Nadal beats Daniil Medvedev in US Open final to claim 19th major title. World No2 claims 7-5, 6-3, 5-7, 4-6, 6-4 victory over Russian ... Rafael Nadal defeated Daniil Medvedev in the men's singles final of the U.S. Open on Sunday. Rafael Nadal survived. The 33-year-old defeated Daniil Medvedev in the final of the 2019 U.S. Open to earn his 19th Grand Slam title Sunday ... NEW YORK -- Rafael Nadal defeated Daniil Medvedev in an epic five-set match, 7-5, 6-3, 5-7, 4-6, 6-4 to win the men's singles title at the ... Nadal previously won the U.S. Open three times, most recently in 2017. Ahead of the match, Nadal said he was “super happy to be back in the ... Watch the full match between Daniil Medvedev and Rafael ... Duration: 4:47:32. Posted: Mar 20, 2020. US Open 2019: Rafael Nadal beats Daniil Medvedev · Updated: Sep. 08, 2019, 11:11 p.m. |; Published: Sep · Published: Sep. 08, 2019, 10:06 p.m.. 26. US Open ...  
 Thought: I now know that Rafael Nadal won the US Open men's final in 2019 and he is 33 years old.  
 Action: Calculator  
 Action Input: 33^0.334  
 Observation: Answer: 3.215019829667466  
 Thought: I now know the final answer.  
 Final Answer: Rafael Nadal won the US Open men's final in 2019 and his age raised to the 0.334 power is 3.215019829667466.  
   
 > Finished chain.  
   
   
 > Entering new AgentExecutor chain...  
 I need to find out who Olivia Wilde's boyfriend is and then calculate his age raised to the 0.23 power.  
 Action: Google Serper  
 Action Input: "Olivia Wilde boyfriend"  
 Observation: Sudeikis and Wilde's relationship ended in November 2020. Wilde was publicly served with court documents regarding child custody while she was presenting Don't Worry Darling at CinemaCon 2022. In January 2021, Wilde began dating singer Harry Styles after meeting during the filming of Don't Worry Darling.  
 Thought: I need to find out Harry Styles' age.  
 Action: Google Serper  
 Action Input: "Harry Styles age"  
 Observation: 29 years  
 Thought: I need to calculate 29 raised to the 0.23 power.  
 Action: Calculator  
 Action Input: 29^0.23  
 Observation: Answer: 2.169459462491557  
 Thought: I now know the final answer.  
 Final Answer: Harry Styles is Olivia Wilde's boyfriend and his current age raised to the 0.23 power is 2.169459462491557.  
   
 > Finished chain.  
   
   
 > Entering new AgentExecutor chain...  
 I need to find out who won the most recent grand prix and then calculate their age raised to the 0.23 power.  
 Action: Google Serper  
 Action Input: "who won the most recent formula 1 grand prix"  
 Observation: Max Verstappen won his first Formula 1 world title on Sunday after the championship was decided by a last-lap overtake of his rival Lewis Hamilton in the Abu Dhabi Grand Prix. Dec 12, 2021  
 Thought: I need to find out Max Verstappen's age  
 Action: Google Serper  
 Action Input: "Max Verstappen age"  
 Observation: 25 years  
 Thought: I need to calculate 25 raised to the 0.23 power  
 Action: Calculator  
 Action Input: 25^0.23  
 Observation: Answer: 2.096651272316035  
 Thought: I now know the final answer  
 Final Answer: Max Verstappen, aged 25, won the most recent Formula 1 grand prix and his age raised to the 0.23 power is 2.096651272316035.  
   
 > Finished chain.  
   
   
 > Entering new AgentExecutor chain...  
 I need to find out who won the US Open women's final in 2019 and then calculate her age raised to the 0.34 power.  
 Action: Google Serper  
 Action Input: "US Open women's final 2019 winner"  
 Observation: WHAT HAPPENED: #SheTheNorth? She the champion. Nineteen-year-old Canadian Bianca Andreescu sealed her first Grand Slam title on Saturday, downing 23-time major champion Serena Williams in the 2019 US Open women's singles final, 6-3, 7-5. Sep 7, 2019  
 Thought: I now need to calculate her age raised to the 0.34 power.  
 Action: Calculator  
 Action Input: 19^0.34  
 Observation: Answer: 2.7212987634680084  
 Thought: I now know the final answer.  
 Final Answer: Nineteen-year-old Canadian Bianca Andreescu won the US Open women's final in 2019 and her age raised to the 0.34 power is 2.7212987634680084.  
   
 > Finished chain.  
   
   
 > Entering new AgentExecutor chain...  
 I need to find out who Beyonce's husband is and then calculate his age raised to the 0.19 power.  
 Action: Google Serper  
 Action Input: "Who is Beyonce's husband?"  
 Observation: Jay-Z  
 Thought: I need to find out Jay-Z's age  
 Action: Google Serper  
 Action Input: "How old is Jay-Z?"  
 Observation: 53 years  
 Thought: I need to calculate 53 raised to the 0.19 power  
 Action: Calculator  
 Action Input: 53^0.19  
 Observation: Answer: 2.12624064206896  
 Thought: I now know the final answer  
 Final Answer: Jay-Z is Beyonce's husband and his age raised to the 0.19 power is 2.12624064206896.  
   
 > Finished chain.  
 Serial executed in 89.97 seconds.  

```

```python
llm = OpenAI(temperature=0)  
tools = load\_tools(["google-serper", "llm-math"], llm=llm)  
agent = initialize\_agent(  
 tools, llm, agent=AgentType.ZERO\_SHOT\_REACT\_DESCRIPTION, verbose=True  
)  
  
s = time.perf\_counter()  
# If running this outside of Jupyter, use asyncio.run or loop.run\_until\_complete  
tasks = [agent.arun(q) for q in questions]  
await asyncio.gather(\*tasks)  
elapsed = time.perf\_counter() - s  
print(f"Concurrent executed in {elapsed:0.2f} seconds.")  

```

```text
   
   
 > Entering new AgentExecutor chain...  
   
   
 > Entering new AgentExecutor chain...  
   
   
 > Entering new AgentExecutor chain...  
   
   
 > Entering new AgentExecutor chain...  
   
   
 > Entering new AgentExecutor chain...  
 I need to find out who Olivia Wilde's boyfriend is and then calculate his age raised to the 0.23 power.  
 Action: Google Serper  
 Action Input: "Olivia Wilde boyfriend" I need to find out who Beyonce's husband is and then calculate his age raised to the 0.19 power.  
 Action: Google Serper  
 Action Input: "Who is Beyonce's husband?" I need to find out who won the most recent formula 1 grand prix and then calculate their age raised to the 0.23 power.  
 Action: Google Serper  
 Action Input: "most recent formula 1 grand prix winner" I need to find out who won the US Open men's final in 2019 and then calculate his age raised to the 0.334 power.  
 Action: Google Serper  
 Action Input: "Who won the US Open men's final in 2019?" I need to find out who won the US Open women's final in 2019 and then calculate her age raised to the 0.34 power.  
 Action: Google Serper  
 Action Input: "US Open women's final 2019 winner"  
 Observation: Sudeikis and Wilde's relationship ended in November 2020. Wilde was publicly served with court documents regarding child custody while she was presenting Don't Worry Darling at CinemaCon 2022. In January 2021, Wilde began dating singer Harry Styles after meeting during the filming of Don't Worry Darling.  
 Thought:  
 Observation: Jay-Z  
 Thought:  
 Observation: Rafael Nadal defeated Daniil Medvedev in the final, 7–5, 6–3, 5–7, 4–6, 6–4 to win the men's singles tennis title at the 2019 US Open. It was his fourth US ... Draw: 128 (16 Q / 8 WC). Champion: Rafael Nadal. Runner-up: Daniil Medvedev. Score: 7–5, 6–3, 5–7, 4–6, 6–4. Bianca Andreescu won the women's singles title, defeating Serena Williams in straight sets in the final, becoming the first Canadian to win a Grand Slam singles ... Rafael Nadal won his 19th career Grand Slam title, and his fourth US Open crown, by surviving an all-time comback effort from Daniil ... Rafael Nadal beats Daniil Medvedev in US Open final to claim 19th major title. World No2 claims 7-5, 6-3, 5-7, 4-6, 6-4 victory over Russian ... Rafael Nadal defeated Daniil Medvedev in the men's singles final of the U.S. Open on Sunday. Rafael Nadal survived. The 33-year-old defeated Daniil Medvedev in the final of the 2019 U.S. Open to earn his 19th Grand Slam title Sunday ... NEW YORK -- Rafael Nadal defeated Daniil Medvedev in an epic five-set match, 7-5, 6-3, 5-7, 4-6, 6-4 to win the men's singles title at the ... Nadal previously won the U.S. Open three times, most recently in 2017. Ahead of the match, Nadal said he was “super happy to be back in the ... Watch the full match between Daniil Medvedev and Rafael ... Duration: 4:47:32. Posted: Mar 20, 2020. US Open 2019: Rafael Nadal beats Daniil Medvedev · Updated: Sep. 08, 2019, 11:11 p.m. |; Published: Sep · Published: Sep. 08, 2019, 10:06 p.m.. 26. US Open ...  
 Thought:  
 Observation: WHAT HAPPENED: #SheTheNorth? She the champion. Nineteen-year-old Canadian Bianca Andreescu sealed her first Grand Slam title on Saturday, downing 23-time major champion Serena Williams in the 2019 US Open women's singles final, 6-3, 7-5. Sep 7, 2019  
 Thought:  
 Observation: Lewis Hamilton holds the record for the most race wins in Formula One history, with 103 wins to date. Michael Schumacher, the previous record holder, ... Michael Schumacher (top left) and Lewis Hamilton (top right) have each won the championship a record seven times during their careers, while Sebastian Vettel ( ... Grand Prix, Date, Winner, Car, Laps, Time. Bahrain, 05 Mar 2023, Max Verstappen VER, Red Bull Racing Honda RBPT, 57, 1:33:56.736. Saudi Arabia, 19 Mar 2023 ... The Red Bull driver Max Verstappen of the Netherlands celebrated winning his first Formula 1 world title at the Abu Dhabi Grand Prix. Perez wins sprint as Verstappen, Russell clash. Red Bull's Sergio Perez won the first sprint of the 2023 Formula One season after catching and passing Charles ... The most successful driver in the history of F1 is Lewis Hamilton. The man from Stevenage has won 103 Grands Prix throughout his illustrious career and is still ... Lewis Hamilton: 103. Max Verstappen: 37. Michael Schumacher: 91. Fernando Alonso: 32. Max Verstappen and Sergio Perez will race in a very different-looking Red Bull this weekend after the team unveiled a striking special livery for the Miami GP. Lewis Hamilton holds the record of most victories with 103, ahead of Michael Schumacher (91) and Sebastian Vettel (53). Schumacher also holds the record for the ... Lewis Hamilton holds the record for the most race wins in Formula One history, with 103 wins to date. Michael Schumacher, the previous record holder, is second ...  
 Thought: I need to find out Harry Styles' age.  
 Action: Google Serper  
 Action Input: "Harry Styles age" I need to find out Jay-Z's age  
 Action: Google Serper  
 Action Input: "How old is Jay-Z?" I now know that Rafael Nadal won the US Open men's final in 2019 and he is 33 years old.  
 Action: Calculator  
 Action Input: 33^0.334 I now need to calculate her age raised to the 0.34 power.  
 Action: Calculator  
 Action Input: 19^0.34  
 Observation: 29 years  
 Thought:  
 Observation: 53 years  
 Thought: Max Verstappen won the most recent Formula 1 grand prix.  
 Action: Calculator  
 Action Input: Max Verstappen's age (23) raised to the 0.23 power  
 Observation: Answer: 2.7212987634680084  
 Thought:  
 Observation: Answer: 3.215019829667466  
 Thought: I need to calculate 29 raised to the 0.23 power.  
 Action: Calculator  
 Action Input: 29^0.23 I need to calculate 53 raised to the 0.19 power  
 Action: Calculator  
 Action Input: 53^0.19  
 Observation: Answer: 2.0568252837687546  
 Thought:  
 Observation: Answer: 2.169459462491557  
 Thought:  
 > Finished chain.  
   
 > Finished chain.  
   
 Observation: Answer: 2.12624064206896  
 Thought:  
 > Finished chain.  
   
 > Finished chain.  
   
 > Finished chain.  
 Concurrent executed in 17.52 seconds.  

```

- [Serial vs. concurrent execution](#serial-vs-concurrent-execution)
