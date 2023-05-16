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
        todos = list(db.todos.find())
        todo_list = [{'id': str(todo['_id']), 'text': todo['text']} for todo in todos]
        return Response(todo_list, status=status.HTTP_200_OK)
        
    def post(self, request):
        new_todo = {'text': request.data['text']}
        result = db.todos.insert_one(new_todo)
        if result.inserted_id:
            return Response({'id': str(result.inserted_id), 'text': new_todo['text']}, status=status.HTTP_201_CREATED)
        return Response({'error': 'Failed to create todo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)