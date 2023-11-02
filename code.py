import json
import openai
import os

MAX_ATTEMPTS = int(os.environ.get('MAX_ATTEMPTS', 10)) 

openai.api_key = 

def assert_code_is_string(code): 
    '''Validates the code type.''' 
    print('Checking code type...') 
    assert isinstance(code, str), 'Code is not a string.'


def load_string_as_json(code): 
    '''Loads a string as a JSON.''' 
    print('Converting string to JSON...')
    try:
        code_dict = json.loads(code)
        print('Converted string to JSON.') 
        return code_dict 
    except json.JSONDecodeError:
        print('Failed to convert string to JSON. Input type is invalid.')
        return None


def print_code_type(code):
    '''Prints the code type.'''
    print(f'Code type: {type(code)}')


def convert_response_to_json(response):
    '''Converts a response to JSON.'''
    print('Converting response to JSON...')
    response_json = json.loads(response)
    print('Converted response to JSON.')
    return response_json


class OpenAIAdaptor:
    '''Adapts code using OpenAI.'''
    def __init__(self, model='gpt-4-0613'):
        self.model = model
        self.api_key = 

    def is_valid_json(self, json_string):
        '''Checks if a string is a valid JSON.'''
        try:
            json.loads(json_string)
            return True
        except ValueError:
            return False

    def dict_to_json(self, code_dict):
        '''Converts a dictionary to a JSON.'''
        print('Converting dictionary to JSON...')
        if isinstance(code_dict, dict):
            print('Completed dictionary to JSON conversion.')
            return code_dict
        else:
            try:
                code_dict = json.loads(code_dict)
                print('Converted dictionary to JSON.')
            except:
                pass
            return code_dict

    def format_code_and_rules(code, rules):
        '''Formats code and rules.'''
        return f'Code: {code} Rules: {rules}'

    def prepare_openai_payload(self, task_description, code, rules):
        '''Prepares the task payload for OpenAI.'''
        content = self.format_code_and_rules(code, rules)
        return [{'role': 'system', 'content': task_description}, {'role': 'user', 'content': content}]

    def adapt_code_with_openai(self, code, rules, task_description, required_change=None):
        '''Adapts the code using OpenAI.'''
        messages = self.prepare_openai_payload(task_description, code, rules)
        if required_change:
            changes_needed_msg = self.format_code_and_rules(required_change)
            messages.append({'role': 'user', 'content': changes_needed_msg})

        openai_response = openai.ChatCompletion.create(model=self.model, messages=messages)

        result = openai_response.choices[0].message.content
        print('Adapting code with OpenAI completed.')
        return self.dict_to_json(result)


class LambdaHandler:
    '''Handles AWS Lambda tasks.'''
    def __init__(self, adaptor, max_attempts):
        self.adaptor = adaptor
        self.max_attempts = max_attempts

    def extract_event_data(event):
        '''Extracts event data.'''
        try:
            event_body = event.body
            event_data = json.loads(event_body)
            print('Successfully extracted event data.')
            return event_data
        except json.JSONDecodeError as error:
            print('Failed to extract event data.')
            return None

    def rewrite_code(self, code, rules):
        '''Rewrites the code using OpenAI.'''
        for _ in range(self.max_attempts):
            try:
                validation_result = self.adaptor.adapt_code_with_openai(code, rules, 'Your task is to rewrite the provided code...')
                
                if not validation_result.get('followsAllRules'):
                    code = self.adaptor.adapt_code_with_openai(code, rules, 'Your task is to evaluate the provided code...', validation_result.get('changesRequired')).get('newCode')
                else:
                    break
            except Exception as error:
                return None
        print('Completed rewriting code.')
        return code

    def lambda_handler(self, event):
        '''Handles AWS Lambda calls.'''
        event_data = self.extract_event_data(event)
        if event_data != None:
            code = event_data.get('code')
            rules = event_data.get('rules')
            processed_code = self.rewrite_code(code, rules)
            if processed_code:
                return { 'statusCode': 200, 'body': json.dumps({ 'newCode': processed_code })}
            else:
                return { 'statusCode': 500, 'body': 'Error processing the code.'}
        else:
            return { 'statusCode': 400, 'body': 'Failed to extract event data.'}
