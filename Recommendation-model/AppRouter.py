from flask import Flask, request, jsonify
from RecommendationModel import recommend_songs
import pandas as pd  # For data manipulation and analysis

# import librosa

app = Flask(__name__)
data = pd.read_csv("data.csv")

@app.route('/recommend', methods=['POST'])
def convert_voice_to_text():
    song_list = request.json.get('songs')
    noSongs = request.json.get('numberOfSongs')

    if not song_list:
        return jsonify({"error": "Please provide a list of songs with name and year"}), 400

    recommendations = recommend_songs(song_list,data,noSongs)

    return jsonify(recommendations)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
