from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/api/random-points', methods=['POST'])
def generate_random_points():
    data = request.get_json(silent=True) or {}
    n = data.get('n', 1000)

    if not isinstance(n, int) or n <= 0:
        return jsonify({'error': '"n" must be a positive integer.'}), 400

    points = np.random.rand(n, 2).tolist()

    return jsonify({
        'points': points,
        'count': n
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
