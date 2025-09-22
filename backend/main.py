from fastapi import FastAPI

# This line creates a FastAPI instance and stores it in a variable named 'app'
app = FastAPI()

# Then you add your routes to this app instance
@app.get("/")
def read_root():
    return {"message": "Hello World"}
