from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Esto permite que React se conecte

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend funcionando!'})

@app.route('/generate-points', methods=['POST'])
def generate_points():
    try:
        # Obtener datos del frontend
        data = request.get_json()
        n = data.get('n', 1000)
        
        # Validar
        if not isinstance(n, int) or n <= 0:
            return jsonify({'error': 'Número inválido'}), 400
        
        # Generar puntos aleatorios
        points = []
        for _ in range(n):
            x = random.uniform(0, 1)  # Número entre 0 y 1
            y = random.uniform(0, 1)
            points.append([x, y])
        
        return jsonify({
            'points': points,
            'count': len(points)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)