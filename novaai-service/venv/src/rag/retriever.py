from langchain.chains import RetrievalQA
from src.config.openai_config import llm
from src.rag.vector_store import create_or_load_vectorstore

# Create retriever (loads vectorstore)
vectorstore = create_or_load_vectorstore()

# Create a RetrievalQA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
    chain_type="stuff"
)

def query_ai(question: str):
    """Query NovaAI using RAG pipeline."""
    print("[NovaAI] Query:", question)
    response = qa_chain.invoke({"query": question})
    return response["result"]
