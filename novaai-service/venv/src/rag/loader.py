from langchain_community.document_loaders import DirectoryLoader, TextLoder

def load_documents(path:str):
    """Load text files from the given folder as Langchain documents"""
    loader = DirectoryLoader(path, glob="*.txt", loader_cls=TextLoder)
    return loader.load()