import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings, ChatOpenAI



load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)


llm = ChatOpenAI(model="gpt-4o-mini", tempreature=0.3, api_key=OPENAI_API_KEY)