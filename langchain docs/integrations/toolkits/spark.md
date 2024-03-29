# Spark Dataframe

This notebook shows how to use agents to interact with a `Spark DataFrame` and `Spark Connect`. It is mostly optimized for question answering.

**NOTE: this agent calls the Python agent under the hood, which executes LLM generated Python code - this can be bad if the LLM generated Python code is harmful. Use cautiously.**

```python
import os  
  
os.environ["OPENAI\_API\_KEY"] = "...input your openai api key here..."  

```

## `Spark DataFrame` example[​](#spark-dataframe-example "Direct link to spark-dataframe-example")

```python
from langchain.llms import OpenAI  
from pyspark.sql import SparkSession  
from langchain.agents import create\_spark\_dataframe\_agent  
  
spark = SparkSession.builder.getOrCreate()  
csv\_file\_path = "titanic.csv"  
df = spark.read.csv(csv\_file\_path, header=True, inferSchema=True)  
df.show()  

```

```text
 23/05/15 20:33:10 WARN Utils: Your hostname, Mikes-Mac-mini.local resolves to a loopback address: 127.0.0.1; using 192.168.68.115 instead (on interface en1)  
 23/05/15 20:33:10 WARN Utils: Set SPARK\_LOCAL\_IP if you need to bind to another address  
 Setting default log level to "WARN".  
 To adjust logging level use sc.setLogLevel(newLevel). For SparkR, use setLogLevel(newLevel).  
 23/05/15 20:33:10 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable  
  
  
 +-----------+--------+------+--------------------+------+----+-----+-----+----------------+-------+-----+--------+  
 |PassengerId|Survived|Pclass| Name| Sex| Age|SibSp|Parch| Ticket| Fare|Cabin|Embarked|  
 +-----------+--------+------+--------------------+------+----+-----+-----+----------------+-------+-----+--------+  
 | 1| 0| 3|Braund, Mr. Owen ...| male|22.0| 1| 0| A/5 21171| 7.25| null| S|  
 | 2| 1| 1|Cumings, Mrs. Joh...|female|38.0| 1| 0| PC 17599|71.2833| C85| C|  
 | 3| 1| 3|Heikkinen, Miss. ...|female|26.0| 0| 0|STON/O2. 3101282| 7.925| null| S|  
 | 4| 1| 1|Futrelle, Mrs. Ja...|female|35.0| 1| 0| 113803| 53.1| C123| S|  
 | 5| 0| 3|Allen, Mr. Willia...| male|35.0| 0| 0| 373450| 8.05| null| S|  
 | 6| 0| 3| Moran, Mr. James| male|null| 0| 0| 330877| 8.4583| null| Q|  
 | 7| 0| 1|McCarthy, Mr. Tim...| male|54.0| 0| 0| 17463|51.8625| E46| S|  
 | 8| 0| 3|Palsson, Master. ...| male| 2.0| 3| 1| 349909| 21.075| null| S|  
 | 9| 1| 3|Johnson, Mrs. Osc...|female|27.0| 0| 2| 347742|11.1333| null| S|  
 | 10| 1| 2|Nasser, Mrs. Nich...|female|14.0| 1| 0| 237736|30.0708| null| C|  
 | 11| 1| 3|Sandstrom, Miss. ...|female| 4.0| 1| 1| PP 9549| 16.7| G6| S|  
 | 12| 1| 1|Bonnell, Miss. El...|female|58.0| 0| 0| 113783| 26.55| C103| S|  
 | 13| 0| 3|Saundercock, Mr. ...| male|20.0| 0| 0| A/5. 2151| 8.05| null| S|  
 | 14| 0| 3|Andersson, Mr. An...| male|39.0| 1| 5| 347082| 31.275| null| S|  
 | 15| 0| 3|Vestrom, Miss. Hu...|female|14.0| 0| 0| 350406| 7.8542| null| S|  
 | 16| 1| 2|Hewlett, Mrs. (Ma...|female|55.0| 0| 0| 248706| 16.0| null| S|  
 | 17| 0| 3|Rice, Master. Eugene| male| 2.0| 4| 1| 382652| 29.125| null| Q|  
 | 18| 1| 2|Williams, Mr. Cha...| male|null| 0| 0| 244373| 13.0| null| S|  
 | 19| 0| 3|Vander Planke, Mr...|female|31.0| 1| 0| 345763| 18.0| null| S|  
 | 20| 1| 3|Masselmani, Mrs. ...|female|null| 0| 0| 2649| 7.225| null| C|  
 +-----------+--------+------+--------------------+------+----+-----+-----+----------------+-------+-----+--------+  
 only showing top 20 rows  
   

```

```python
agent = create\_spark\_dataframe\_agent(llm=OpenAI(temperature=0), df=df, verbose=True)  

```

```python
agent.run("how many rows are there?")  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 Thought: I need to find out how many rows are in the dataframe  
 Action: python\_repl\_ast  
 Action Input: df.count()  
 Observation: 891  
 Thought: I now know the final answer  
 Final Answer: There are 891 rows in the dataframe.  
   
 > Finished chain.  
  
  
  
  
  
 'There are 891 rows in the dataframe.'  

```

```python
agent.run("how many people have more than 3 siblings")  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 Thought: I need to find out how many people have more than 3 siblings  
 Action: python\_repl\_ast  
 Action Input: df.filter(df.SibSp > 3).count()  
 Observation: 30  
 Thought: I now know the final answer  
 Final Answer: 30 people have more than 3 siblings.  
   
 > Finished chain.  
  
  
  
  
  
 '30 people have more than 3 siblings.'  

```

```python
agent.run("whats the square root of the average age?")  

```

```text
   
   
 > Entering new AgentExecutor chain...  
 Thought: I need to get the average age first  
 Action: python\_repl\_ast  
 Action Input: df.agg({"Age": "mean"}).collect()[0][0]  
 Observation: 29.69911764705882  
 Thought: I now have the average age, I need to get the square root  
 Action: python\_repl\_ast  
 Action Input: math.sqrt(29.69911764705882)  
 Observation: name 'math' is not defined  
 Thought: I need to import math first  
 Action: python\_repl\_ast  
 Action Input: import math  
 Observation:   
 Thought: I now have the math library imported, I can get the square root  
 Action: python\_repl\_ast  
 Action Input: math.sqrt(29.69911764705882)  
 Observation: 5.449689683556195  
 Thought: I now know the final answer  
 Final Answer: 5.449689683556195  
   
 > Finished chain.  
  
  
  
  
  
 '5.449689683556195'  

```

```python
spark.stop()  

```

## `Spark Connect` example[​](#spark-connect-example "Direct link to spark-connect-example")

```bash
# in apache-spark root directory. (tested here with "spark-3.4.0-bin-hadoop3 and later")  
# To launch Spark with support for Spark Connect sessions, run the start-connect-server.sh script.  
./sbin/start-connect-server.sh --packages org.apache.spark:spark-connect\_2.12:3.4.0  

```

```python
from pyspark.sql import SparkSession  
  
# Now that the Spark server is running, we can connect to it remotely using Spark Connect. We do this by  
# creating a remote Spark session on the client where our application runs. Before we can do that, we need  
# to make sure to stop the existing regular Spark session because it cannot coexist with the remote  
# Spark Connect session we are about to create.  
SparkSession.builder.master("local[\*]").getOrCreate().stop()  

```

```text
 23/05/08 10:06:09 WARN Utils: Service 'SparkUI' could not bind on port 4040. Attempting port 4041.  

```

```python
# The command we used above to launch the server configured Spark to run as localhost:15002.  
# So now we can create a remote Spark session on the client using the following command.  
spark = SparkSession.builder.remote("sc://localhost:15002").getOrCreate()  

```

```python
csv\_file\_path = "titanic.csv"  
df = spark.read.csv(csv\_file\_path, header=True, inferSchema=True)  
df.show()  

```

```text
 +-----------+--------+------+--------------------+------+----+-----+-----+----------------+-------+-----+--------+  
 |PassengerId|Survived|Pclass| Name| Sex| Age|SibSp|Parch| Ticket| Fare|Cabin|Embarked|  
 +-----------+--------+------+--------------------+------+----+-----+-----+----------------+-------+-----+--------+  
 | 1| 0| 3|Braund, Mr. Owen ...| male|22.0| 1| 0| A/5 21171| 7.25| null| S|  
 | 2| 1| 1|Cumings, Mrs. Joh...|female|38.0| 1| 0| PC 17599|71.2833| C85| C|  
 | 3| 1| 3|Heikkinen, Miss. ...|female|26.0| 0| 0|STON/O2. 3101282| 7.925| null| S|  
 | 4| 1| 1|Futrelle, Mrs. Ja...|female|35.0| 1| 0| 113803| 53.1| C123| S|  
 | 5| 0| 3|Allen, Mr. Willia...| male|35.0| 0| 0| 373450| 8.05| null| S|  
 | 6| 0| 3| Moran, Mr. James| male|null| 0| 0| 330877| 8.4583| null| Q|  
 | 7| 0| 1|McCarthy, Mr. Tim...| male|54.0| 0| 0| 17463|51.8625| E46| S|  
 | 8| 0| 3|Palsson, Master. ...| male| 2.0| 3| 1| 349909| 21.075| null| S|  
 | 9| 1| 3|Johnson, Mrs. Osc...|female|27.0| 0| 2| 347742|11.1333| null| S|  
 | 10| 1| 2|Nasser, Mrs. Nich...|female|14.0| 1| 0| 237736|30.0708| null| C|  
 | 11| 1| 3|Sandstrom, Miss. ...|female| 4.0| 1| 1| PP 9549| 16.7| G6| S|  
 | 12| 1| 1|Bonnell, Miss. El...|female|58.0| 0| 0| 113783| 26.55| C103| S|  
 | 13| 0| 3|Saundercock, Mr. ...| male|20.0| 0| 0| A/5. 2151| 8.05| null| S|  
 | 14| 0| 3|Andersson, Mr. An...| male|39.0| 1| 5| 347082| 31.275| null| S|  
 | 15| 0| 3|Vestrom, Miss. Hu...|female|14.0| 0| 0| 350406| 7.8542| null| S|  
 | 16| 1| 2|Hewlett, Mrs. (Ma...|female|55.0| 0| 0| 248706| 16.0| null| S|  
 | 17| 0| 3|Rice, Master. Eugene| male| 2.0| 4| 1| 382652| 29.125| null| Q|  
 | 18| 1| 2|Williams, Mr. Cha...| male|null| 0| 0| 244373| 13.0| null| S|  
 | 19| 0| 3|Vander Planke, Mr...|female|31.0| 1| 0| 345763| 18.0| null| S|  
 | 20| 1| 3|Masselmani, Mrs. ...|female|null| 0| 0| 2649| 7.225| null| C|  
 +-----------+--------+------+--------------------+------+----+-----+-----+----------------+-------+-----+--------+  
 only showing top 20 rows  
   

```

```python
from langchain.agents import create\_spark\_dataframe\_agent  
from langchain.llms import OpenAI  
import os  
  
os.environ["OPENAI\_API\_KEY"] = "...input your openai api key here..."  
  
agent = create\_spark\_dataframe\_agent(llm=OpenAI(temperature=0), df=df, verbose=True)  

```

```python
agent.run(  
 """  
who bought the most expensive ticket?  
You can find all supported function types in https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html  
"""  
)  

```

```text
   
   
 > Entering new AgentExecutor chain...  
   
 Thought: I need to find the row with the highest fare  
 Action: python\_repl\_ast  
 Action Input: df.sort(df.Fare.desc()).first()  
 Observation: Row(PassengerId=259, Survived=1, Pclass=1, Name='Ward, Miss. Anna', Sex='female', Age=35.0, SibSp=0, Parch=0, Ticket='PC 17755', Fare=512.3292, Cabin=None, Embarked='C')  
 Thought: I now know the name of the person who bought the most expensive ticket  
 Final Answer: Miss. Anna Ward  
   
 > Finished chain.  
  
  
  
  
  
 'Miss. Anna Ward'  

```

```python
spark.stop()  

```

- [`Spark DataFrame` example](#spark-dataframe-example)
- [`Spark Connect` example](#spark-connect-example)
