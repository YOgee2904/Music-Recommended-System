from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from collections import defaultdict
import pandas as pd
import joblib
import numpy as np


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.debug = True
song_cluster_pipeline = joblib.load('model.pkl')
data = joblib.load('data.pkl')


client_id = "19b9d8d53dec4faebf3972405bad7516"
client_secret = "45ca9948fbdb40af893c8ccadc8b9bc1"

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=client_id,
                                                           client_secret=client_secret))

def find_song(name, year):
    song_data = defaultdict()
    results = sp.search(q= 'track: {} year: {}'.format(name,year), limit=1)
    if results['tracks']['items'] == []:
        return None

    results = results['tracks']['items'][0]
    track_id = results['id']
    audio_features = sp.audio_features(track_id)[0]

    song_data['name'] = [name]
    song_data['year'] = [year]
    song_data['explicit'] = [int(results['explicit'])]
    song_data['duration_ms'] = [results['duration_ms']]
    song_data['popularity'] = [results['popularity']]

    for key, value in audio_features.items():
        song_data[key] = value

    return pd.DataFrame(song_data)



from collections import defaultdict
from sklearn.metrics import euclidean_distances
from scipy.spatial.distance import cdist
import difflib

number_cols = ['valence', 'year', 'acousticness', 'danceability', 'duration_ms', 'energy', 'explicit',
 'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'popularity', 'speechiness', 'tempo']


def get_song_data(song, spotify_data):
    
    try:
        song_data = spotify_data[(spotify_data['name'] == song['name']) 
                                & (spotify_data['year'] == song['year'])].iloc[0]
        return song_data
    
    except IndexError:
        return find_song(song['name'], song['year'])
        

def get_mean_vector(song_list, spotify_data):
    
    song_vectors = []
    
    for song in song_list:
        song_data = get_song_data(song, spotify_data)
        if song_data is None:
            print('Warning: {} does not exist in Spotify or in database'.format(song['name']))
            continue
        song_vector = song_data[number_cols].values
        song_vectors.append(song_vector)  
    
    if not song_vectors:
        return None
    
    song_matrix = np.array(list(song_vectors), dtype=object)
    return np.mean(song_matrix, axis=0)


def flatten_dict_list(dict_list):
    
    flattened_dict = defaultdict()
    for key in dict_list[0].keys():
        flattened_dict[key] = []
    
    for dictionary in dict_list:
        for key, value in dictionary.items():
            flattened_dict[key].append(value)
            
    return flattened_dict


def recommend_songs( song_list, spotify_data, n_songs=10):
    
    metadata_cols = ['name', 'year', 'artists']
    song_dict = flatten_dict_list(song_list)
    
    song_center = get_mean_vector(song_list, spotify_data)
    scaler = song_cluster_pipeline.steps[0][1]
    scaled_data = scaler.transform(spotify_data[number_cols])
    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    distances = cdist(scaled_song_center, scaled_data, 'cosine')
    index = list(np.argsort(distances)[:, :n_songs][0])
    
    rec_songs = spotify_data.iloc[index]
    rec_songs = rec_songs[~rec_songs['name'].isin(song_dict['name'])]
    return rec_songs[metadata_cols].to_dict(orient='records')


    

@app.route('/recommend', methods=['GET'])
def recommend():
    #get song name from request params
    song_name = request.args.get('song_name', default = '', type = str)
    #search for song in spotify
    results = sp.search(q=song_name, limit=1, type='track')
    #get song data
    song = {
        'name': results['tracks']['items'][0]['name'],
        'year': results['tracks']['items'][0]['album']['release_date'][:4]
    }
    #recommend songs
    song['year'] = int(song['year'])
    recommendation = recommend_songs([song], data)  # Use song data as input to recommend_songs
    #get song data from recommendation and search songs from spotify
    for song in recommendation:
        results = sp.search(q= 'track: {} year: {}'.format(song['name'],song['year']), limit=1)
        song['image'] = results['tracks']['items'][0]['album']['images'][0]['url'] if results['tracks']['items'][0]['album']['images'] else None
    return jsonify(recommendation)  # Return the recommendation as JSON

@app.route('/search', methods=['GET'])
def search():
    song_name = request.args.get('song_name', default = '', type = str)
    results = sp.search(q=song_name, limit=10, type='track')
    songs = [{
        'name': track['name'],
        'album': track['album']['name'],
        'artist': track['artists'][0]['name'],
        'image': track['album']['images'][0]['url'] if track['album']['images'] else None,
        'duration': track['duration_ms'],
        'year' : track['album']['release_date'][:4]
    } for track in results['tracks']['items']]    
    return jsonify({'songs': songs})