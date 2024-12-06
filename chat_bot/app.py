import os

from flask import Flask, jsonify, request
import google.generativeai as genai

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
app = Flask(__name__)


@app.route('/health')
def home():
    return "Up and running"


@app.route('/prompt/<int:item_id>', methods=['GET'])
def get_item(item_id):
    print(item_id)
    item = {"Name": "Hardik"}
    if item:
        return jsonify(item)
    else:
        return jsonify({"error": "Item not found"}), 404


@app.route('/prompt', methods=['POST'])
def add_item():
    req_body = request.json
    # print(new_item["prompt"])
    resp = get_gemini_response(req_body["prompt"])
    output = {
        "Gemini" : resp
    }
    # new_item['id'] = len(data) + 1
    # data.append(new_item)
    return jsonify(output)


def get_gemini_response(prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([prompt])
    return response.text


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8502)
