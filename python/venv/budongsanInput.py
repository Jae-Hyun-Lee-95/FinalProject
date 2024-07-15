from flask import Flask, jsonify, g
import csv

app = Flask(__name__)

# CSV 파일 경로
csv_file = 'data.csv'

def get_data():
    if 'data' not in g:
        # g 객체에 데이터가 없으면 CSV 파일에서 데이터를 읽어와 저장
        with open(csv_file, mode='r', encoding='utf-8-sig') as file:
            csv_reader = csv.DictReader(file)
            g.data = list(csv_reader)
    return g.data

@app.route('/datas')
def users():
    # 데이터를 가져오기 위해 get_data 함수 호출
    data = get_data()
    
    # JSON 형식으로 변환하여 반환
    return jsonify({"datas": data})

if __name__ == "__main__":
    app.run(debug=True)
