import os
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from src.config.openai_config import embeddings
from src.rag.loader import load_documents

def create_or_load_vectorstore():
    """Create a FAISS vector store from docs if not already saved."""
    path = os.getenv("VECTOR_STORE_PATH", "./src/data/vectorstore/faiss_index")

    if os.path.exists(path):
        print("[NovaAI] Loading existing FAISS index...")
        return FAISS.load_local(path, embeddings, allow_dangerous_deserialization=True)

    print("[NovaAI] Creating new FAISS index...")
    docs = load_documents(os.getenv("DOCS_PATH", "./src/data/docs"))
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    split_docs = splitter.split_documents(docs)
    vectorstore = FAISS.from_documents(split_docs, embeddings)
    vectorstore.save_local(path)
    return vectorstore
