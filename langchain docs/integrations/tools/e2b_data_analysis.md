# E2B Data Analysis

[E2B's cloud environments](https://e2b.dev) are great runtime sandboxes for LLMs.

E2B's Data Analysis sandbox allows for safe code execution in a sandboxed environment. This is ideal for building tools such as code interpreters, or Advanced Data Analysis like in ChatGPT.

E2B Data Analysis sandbox allows you to:

- Run Python code
- Generate charts via matplotlib
- Install Python packages dynamically durint runtime
- Install system packages dynamically during runtime
- Run shell commands
- Upload and download files

We'll create a simple OpenAI agent that will use E2B's Data Analysis sandbox to perform analysis on a uploaded files using Python.

Get your OpenAI API key and [E2B API key here](https://e2b.dev/docs/getting-started/api-key) and set them as environment variables.

You can find the full API documentation [here](https://e2b.dev/docs).

You'll need to install `e2b` to get started:

```bash
pip install langchain e2b  

```

```python
import os  
from langchain.chat\_models import ChatOpenAI  
from langchain.tools import E2BDataAnalysisTool  
from langchain.agents import initialize\_agent, AgentType  
  
os.environ["E2B\_API\_KEY"] = "<E2B\_API\_KEY>"  
os.environ["OPENAI\_API\_KEY"] = "<OPENAI\_API\_KEY>"  

```

When creating an instance of the `E2BDataAnalysisTool`, you can pass callbacks to listen to the output of the sandbox. This is useful, for example, when creating more responsive UI. Especially with the combination of streaming output from LLMs.

```python
# Artifacts are charts created by matplotlib when `plt.show()` is called  
def save\_artifact(artifact):  
 print("New matplotlib chart generated:", artifact.name)  
 # Download the artifact as `bytes` and leave it up to the user to display them (on frontend, for example)  
 file = artifact.download()  
 basename = os.path.basename(artifact.name)  
  
 # Save the chart to the `charts` directory  
 with open(f"./charts/{basename}", "wb") as f:  
 f.write(file)  
  
e2b\_data\_analysis\_tool = E2BDataAnalysisTool(  
 # Pass environment variables to the sandbox  
 env\_vars={"MY\_SECRET": "secret\_value"},  
 on\_stdout=lambda stdout: print("stdout:", stdout),  
 on\_stderr=lambda stderr: print("stderr:", stderr),  
 on\_artifact=save\_artifact,  
)  

```

Upload an example CSV data file to the sandbox so we can analyze it with our agent. You can use for example [this file](https://storage.googleapis.com/e2b-examples/netflix.csv) about Netflix tv shows.

```python
with open("./netflix.csv") as f:  
 remote\_path = e2b\_data\_analysis\_tool.upload\_file(  
 file=f,  
 description="Data about Netflix tv shows including their title, category, director, release date, casting, age rating, etc.",  
 )  
 print(remote\_path)  

```

```text
 name='netflix.csv' remote\_path='/home/user/netflix.csv' description='Data about Netflix tv shows including their title, category, director, release date, casting, age rating, etc.'  

```

Create a `Tool` object and initialize the Langchain agent.

```python
tools = [e2b\_data\_analysis\_tool.as\_tool()]  
  
llm = ChatOpenAI(model="gpt-4", temperature=0)  
agent = initialize\_agent(  
 tools, llm, agent=AgentType.OPENAI\_FUNCTIONS, verbose=True, handle\_parsing\_errors=True  
)  

```

Now we can ask the agent questions about the CSV file we uploaded earlier.

```python
agent.run("What are the 5 longest movies on netflix released between 2000 and 2010? Create a chart with their lengths.")  

```

```text
   
   
 > Entering new AgentExecutor chain...  
   
 Invoking: `e2b\_data\_analysis` with `{'python\_code': "import pandas as pd\n\n# Load the data\nnetflix\_data = pd.read\_csv('/home/user/netflix.csv')\n\n# Convert the 'release\_year' column to integer\nnetflix\_data['release\_year'] = netflix\_data['release\_year'].astype(int)\n\n# Filter the data for movies released between 2000 and 2010\nfiltered\_data = netflix\_data[(netflix\_data['release\_year'] >= 2000) & (netflix\_data['release\_year'] <= 2010) & (netflix\_data['type'] == 'Movie')]\n\n# Remove rows where 'duration' is not available\nfiltered\_data = filtered\_data[filtered\_data['duration'].notna()]\n\n# Convert the 'duration' column to integer\nfiltered\_data['duration'] = filtered\_data['duration'].str.replace(' min','').astype(int)\n\n# Get the top 5 longest movies\nlongest\_movies = filtered\_data.nlargest(5, 'duration')\n\n# Create a bar chart\nimport matplotlib.pyplot as plt\n\nplt.figure(figsize=(10,5))\nplt.barh(longest\_movies['title'], longest\_movies['duration'], color='skyblue')\nplt.xlabel('Duration (minutes)')\nplt.title('Top 5 Longest Movies on Netflix (2000-2010)')\nplt.gca().invert\_yaxis()\nplt.savefig('/home/user/longest\_movies.png')\n\nlongest\_movies[['title', 'duration']]"}`  
   
   
 stdout: title duration  
 stdout: 1019 Lagaan 224  
 stdout: 4573 Jodhaa Akbar 214  
 stdout: 2731 Kabhi Khushi Kabhie Gham 209  
 stdout: 2632 No Direction Home: Bob Dylan 208  
 stdout: 2126 What's Your Raashee? 203  
 {'stdout': " title duration\n1019 Lagaan 224\n4573 Jodhaa Akbar 214\n2731 Kabhi Khushi Kabhie Gham 209\n2632 No Direction Home: Bob Dylan 208\n2126 What's Your Raashee? 203", 'stderr': ''}The 5 longest movies on Netflix released between 2000 and 2010 are:  
   
 1. Lagaan - 224 minutes  
 2. Jodhaa Akbar - 214 minutes  
 3. Kabhi Khushi Kabhie Gham - 209 minutes  
 4. No Direction Home: Bob Dylan - 208 minutes  
 5. What's Your Raashee? - 203 minutes  
   
 Here is the chart showing their lengths:  
   
 ![Longest Movies](sandbox:/home/user/longest\_movies.png)  
   
 > Finished chain.  
  
  
  
  
  
 "The 5 longest movies on Netflix released between 2000 and 2010 are:\n\n1. Lagaan - 224 minutes\n2. Jodhaa Akbar - 214 minutes\n3. Kabhi Khushi Kabhie Gham - 209 minutes\n4. No Direction Home: Bob Dylan - 208 minutes\n5. What's Your Raashee? - 203 minutes\n\nHere is the chart showing their lengths:\n\n![Longest Movies](sandbox:/home/user/longest\_movies.png)"  

```

E2B also allows you to install both Python and system (via `apt`) packages dynamically during runtime like this:

```python
# Install Python package  
e2b\_data\_analysis\_tool.install\_python\_packages('pandas')  

```

```text
 stdout: Requirement already satisfied: pandas in /usr/local/lib/python3.10/dist-packages (2.1.1)  
 stdout: Requirement already satisfied: python-dateutil>=2.8.2 in /usr/local/lib/python3.10/dist-packages (from pandas) (2.8.2)  
 stdout: Requirement already satisfied: pytz>=2020.1 in /usr/local/lib/python3.10/dist-packages (from pandas) (2023.3.post1)  
 stdout: Requirement already satisfied: numpy>=1.22.4 in /usr/local/lib/python3.10/dist-packages (from pandas) (1.26.1)  
 stdout: Requirement already satisfied: tzdata>=2022.1 in /usr/local/lib/python3.10/dist-packages (from pandas) (2023.3)  
 stdout: Requirement already satisfied: six>=1.5 in /usr/local/lib/python3.10/dist-packages (from python-dateutil>=2.8.2->pandas) (1.16.0)  

```

Additionally, you can download any file from the sandbox like this:

```python
# The path is a remote path in the sandbox  
files\_in\_bytes = e2b\_data\_analysis\_tool.download\_file('/home/user/netflix.csv')  

```

Lastly, you can run any shell command inside the sandbox via `run_command`.

```python
# Install SQLite  
e2b\_data\_analysis\_tool.run\_command("sudo apt update")  
e2b\_data\_analysis\_tool.install\_system\_packages("sqlite3")  
  
# Check the SQLite version  
output = e2b\_data\_analysis\_tool.run\_command("sqlite3 --version")  
print("version: ", output["stdout"])  
print("error: ", output["stderr"])  
print("exit code: ", output["exit\_code"])  

```

```text
 stderr:   
 stderr: WARNING: apt does not have a stable CLI interface. Use with caution in scripts.  
 stderr:   
 stdout: Hit:1 http://security.ubuntu.com/ubuntu jammy-security InRelease  
 stdout: Hit:2 http://archive.ubuntu.com/ubuntu jammy InRelease  
 stdout: Hit:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease  
 stdout: Hit:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease  
 stdout: Reading package lists...  
 stdout: Building dependency tree...  
 stdout: Reading state information...  
 stdout: All packages are up to date.  
 stdout: Reading package lists...  
 stdout: Building dependency tree...  
 stdout: Reading state information...  
 stdout: Suggested packages:  
 stdout: sqlite3-doc  
 stdout: The following NEW packages will be installed:  
 stdout: sqlite3  
 stdout: 0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.  
 stdout: Need to get 768 kB of archives.  
 stdout: After this operation, 1873 kB of additional disk space will be used.  
 stdout: Get:1 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 sqlite3 amd64 3.37.2-2ubuntu0.1 [768 kB]  
 stderr: debconf: delaying package configuration, since apt-utils is not installed  
 stdout: Fetched 768 kB in 0s (2258 kB/s)  
 stdout: Selecting previously unselected package sqlite3.  
 (Reading database ... 23999 files and directories currently installed.)  
 stdout: Preparing to unpack .../sqlite3\_3.37.2-2ubuntu0.1\_amd64.deb ...  
 stdout: Unpacking sqlite3 (3.37.2-2ubuntu0.1) ...  
 stdout: Setting up sqlite3 (3.37.2-2ubuntu0.1) ...  
 stdout: 3.37.2 2022-01-06 13:25:41 872ba256cbf61d9290b571c0e6d82a20c224ca3ad82971edc46b29818d5dalt1  
 version: 3.37.2 2022-01-06 13:25:41 872ba256cbf61d9290b571c0e6d82a20c224ca3ad82971edc46b29818d5dalt1  
 error:   
 exit code: 0  

```

When your agent is finished, don't forget to close the sandbox

```python
e2b\_data\_analysis\_tool.close()  

```
