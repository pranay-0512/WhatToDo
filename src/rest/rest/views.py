from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
# import pymongo
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        # Retrieve all todos from the 'todos' collection
        todos = list(db.todos.find())
        
        # Transform the todos into list of dictionaries
        todo_list = [{'id': str(todo['_id']), 'text': todo['text']} for todo in todos]
        
        # Return the transformed todo_list as a JSON response
        return Response(todo_list, status=status.HTTP_200_OK)
        
    def post(self, request):
        # Extract the todo text from the request data
        new_todo = {'text': request.data['text']}
        
        # Insert the new_todo document into the 'todos' collection
        result = db.todos.insert_one(new_todo)
        
        # if statement for checking if the insertion was successful
        if result.inserted_id:
            # Return the newly created todo as a JSON response
            return Response({'id': str(result.inserted_id), 'text': new_todo['text']}, status=status.HTTP_201_CREATED)
        
        # Return an error response if the insertion is failed
        return Response({'error': 'Failed to create todo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
