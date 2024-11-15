# Importing necessary libraries
import os  # For interacting with the operating system
import numpy as np  # For numerical operations on arrays
import pandas as pd  # For data manipulation and analysis

# Visualization libraries
import seaborn as sns  # For creating attractive and informative statistical graphics
import plotly.express as px  # For interactive data visualization
import matplotlib.pyplot as plt  # For plotting graphs
# To display matplotlib plots inline in Jupyter notebooks
# %matplotlib inline

# Machine Learning libraries
from sklearn.cluster import KMeans  # For clustering the data
from sklearn.preprocessing import StandardScaler  # For standardizing features by removing the mean and scaling to unit variance
from sklearn.pipeline import Pipeline  # For simplifying the construction of complex machine learning workflows
from sklearn.manifold import TSNE  # For dimensionality reduction, useful for visualizing high-dimensional data
from sklearn.decomposition import PCA  # For Principal Component Analysis, another technique for dimensionality reduction
from sklearn.metrics import euclidean_distances  # For calculating Euclidean distances between points
from scipy.spatial.distance import cdist  # For computing distance between each pair of the two collections of inputs

# Suppressing warnings
import warnings  # For controlling the display of warning messages
warnings.filterwarnings("ignore")  # Ignore all warnings

# Loading data from a CSV files
data = pd.read_csv("data.csv")
genre_data = pd.read_csv('data_by_genres.csv')
year_data = pd.read_csv('data_by_year.csv')
# Printing concise summary of the main dataset
# print(data.info())
# Printing concise summary of the genre-specific dataset
# print(genre_data.info())
# Printing concise summary of the year-specific dataset
# print(year_data.info())
#check for nulls
data.isnull().sum()
genre_data.isnull().sum()
year_data.isnull().sum()

from sklearn.pipeline import make_pipeline  # For creating a pipeline of machine learning processes
from sklearn.cluster import KMeans  # For KMeans clustering
from sklearn.preprocessing import StandardScaler  # For standardizing the features


cluster_pipeline = make_pipeline(StandardScaler(), KMeans(n_clusters=10))


genre_data['cluster'] = cluster_pipeline.fit_predict(genre_data.select_dtypes(include=[np.number]))


from sklearn.manifold import TSNE  # For t-distributed Stochastic Neighbor Embedding (t-SNE) dimensionality reduction
from sklearn.pipeline import make_pipeline  # For creating a pipeline of machine learning processes
from sklearn.preprocessing import StandardScaler  # For standardizing the features
import pandas as pd  # For data manipulation and analysis
import plotly.express as px  # For interactive data visualization

# Create a pipeline with StandardScaler and t-SNE
tsne_pipeline = make_pipeline(StandardScaler(), TSNE(n_components=2, verbose=1, random_state=42))
# StandardScaler: Standardizes features by removing the mean and scaling to unit variance
# TSNE: Reduces the dimensionality of the data to 2 components for visualization purposes

# Fit the pipeline to the numerical columns of genre_data and transform the data
projection = pd.DataFrame(tsne_pipeline.fit_transform(genre_data.select_dtypes(include=[np.number])),
                          columns=['x', 'y'])

# Add genres and cluster information to the projection DataFrame
projection['genres'] = genre_data['genres']
projection['cluster'] = genre_data['cluster']
# This adds the 'genres' and 'cluster' columns to the projection DataFrame for better visualization

# Create an interactive scatter plot with plotly
fig = px.scatter(projection, x='x', y='y', color='cluster', hover_data=['genres'])
# Creates a scatter plot with 'x' and 'y' as the axes, and colors the points by 'cluster'
# 'hover_data' allows the genres to be displayed when hovering over the points

# Show the interactive plot
# fig.show()
# Displays the plot in an interactive window
from sklearn.pipeline import Pipeline  # For creating a pipeline of machine learning processes
from sklearn.cluster import KMeans  # For KMeans clustering
from sklearn.preprocessing import StandardScaler  # For standardizing the features
import numpy as np  # For numerical operations

# Create a pipeline with StandardScaler and KMeans clustering
song_cluster_pipeline = Pipeline([('scaler', StandardScaler()),
                                  ('kmeans', KMeans(n_clusters=20, verbose=False))
                                  ], verbose=False)
# StandardScaler: Standardizes features by removing the mean and scaling to unit variance
# KMeans: Clusters the data into 20 clusters
# The 'verbose=False' argument suppresses output during fitting

# Select only the numerical columns from the main dataset
X = data.select_dtypes(np.number)
number_cols = list(X.columns)
# X: DataFrame containing only numerical columns from 'data'
# number_cols: List of column names of the numerical columns

# Fit the pipeline to the numerical data
song_cluster_pipeline.fit(X)
# Fits the pipeline (StandardScaler + KMeans) to the numerical columns in 'X'

# Predict the cluster labels for the data
song_cluster_labels = song_cluster_pipeline.predict(X)
# Generates cluster labels for each row in 'X' using the fitted KMeans model

# Add the cluster labels to the main dataset
data['cluster_label'] = song_cluster_labels
# Adds a new column 'cluster_label' to the 'data' DataFrame containing the cluster labels

from sklearn.decomposition import PCA  # For Principal Component Analysis (PCA) dimensionality reduction

# Create a pipeline with StandardScaler and PCA
pca_pipeline = Pipeline([('scaler', StandardScaler()), ('PCA', PCA(n_components=2))])
# StandardScaler: Standardizes features by removing the mean and scaling to unit variance
# PCA: Reduces the dimensionality of the data to 2 components for visualization purposes

# Fit the pipeline to the numerical data and transform the data
song_embedding = pca_pipeline.fit_transform(X)
# Fits the pipeline (StandardScaler + PCA) to the numerical columns in 'X' and transforms the data
# The transformed data is stored in 'song_embedding', which has 2 dimensions

# Create a DataFrame for the 2D projection
projection = pd.DataFrame(columns=['x', 'y'], data=song_embedding)
# Creates a DataFrame with columns 'x' and 'y' from the transformed data 'song_embedding'

# Add song titles and cluster labels to the projection DataFrame
projection['title'] = data['name']
projection['cluster'] = data['cluster_label']
# Adds the 'title' column to the projection DataFrame from the 'name' column in the main dataset
# Adds the 'cluster' column to the projection DataFrame from the 'cluster_label' column in the main dataset

# Create an interactive scatter plot with plotly
fig = px.scatter(projection, x='x', y='y', color='cluster', hover_data=['x', 'y', 'title'])
# Creates a scatter plot with 'x' and 'y' as the axes, and colors the points by 'cluster'
# 'hover_data' allows the x, y coordinates, and song titles to be displayed when hovering over the points

# Show the interactive plot
# fig.show()
# Displays the plot in an interactive window
# Install the spotipy library for interacting with the Spotify Web API
# !pip install spotipy
import spotipy  # For accessing the Spotify Web API
from spotipy.oauth2 import SpotifyClientCredentials  # For managing Spotify credentials
from collections import defaultdict  # For creating a dictionary with default values

# Initialize the Spotify client with client credentials
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='086ce9273ec149168816ac82214269e1', client_secret='6ffa5cc37b944f63a28b820b5f7044ef'))
# SpotifyClientCredentials: Manages authentication using client_id and client_secret
# Replace 'client_id' and 'client_secret' with your actual Spotify API credentials



def find_song(name, year):
    # Function to find a song by name and year and return its data as a DataFrame
    song_data = defaultdict()  # Creates a defaultdict to store song data
    results = sp.search(q='track: {} year: {}'.format(name, year), limit=1)
    # Searches for a track on Spotify with the specified name and year, limiting results to 1
    if results['tracks']['items'] == []:
        return None  # Returns None if no results are found

    results = results['tracks']['items'][0]
    # Extracts the first item from the search results
    track_id = results['id']  # Gets the track ID
    audio_features = sp.audio_features(track_id)[0]
    # Retrieves audio features for the track using its ID

    # Store relevant track information in the song_data dictionary
    song_data['name'] = [name]
    song_data['year'] = [year]
    song_data['explicit'] = [int(results['explicit'])]
    song_data['duration_ms'] = [results['duration_ms']]
    song_data['popularity'] = [results['popularity']]
    song_data['url'] = [results['preview_url']]

    # Store audio features in the song_data dictionary
    for key, value in audio_features.items():
        song_data[key] = value

    return pd.DataFrame(song_data) , song_data
    # Returns the song data as a DataFrame
from collections import defaultdict  # For creating a dictionary with default values
from sklearn.metrics import euclidean_distances  # For calculating Euclidean distances
from scipy.spatial.distance import cdist  # For computing distances between points
import difflib  # For comparing sequences
import numpy as np  # For numerical operations

# List of columns with numerical data to be used for analysis
number_cols = ['valence', 'year', 'acousticness', 'danceability', 'duration_ms', 'energy', 'explicit',
               'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'popularity', 'speechiness', 'tempo']

def get_song_data(song, spotify_data):
    # Function to retrieve song data from the Spotify dataset or fetch it using the Spotify API if not found
    try:
        song_data = spotify_data[(spotify_data['name'] == song['name']) & (spotify_data['year'] == song['year'])].iloc[0]
        # Attempts to find the song in the provided spotify_data DataFrame
        return song_data
    except IndexError:
        return find_song(song['name'], song['year'])
        # If song is not found, attempts to fetch the song data using the Spotify API

def get_mean_vector(song_list, spotify_data):
    # Function to compute the mean vector for a list of songs
    song_vectors = []

    
    songList = []
    for song in song_list:
        song_data_frame ,song_data = get_song_data(song, spotify_data)
        songList.append(song_data)
        if song_data_frame is None:
            print('Warning: {} does not exist in Spotify or in database'.format(song['name']))
            continue
        song_vector = song_data_frame[number_cols].values
        # print(song_vector)
        # Appends the song's numerical data to the song_vectors list
        song_vectors.append(song_vector)

    song_matrix = np.array(list(song_vectors))
    # print(songList)
    return np.mean(song_matrix, axis=0) , songList
    # Converts the list of song vectors to a matrix and returns the mean vector

def flatten_dict_list(dict_list):
    # Function to flatten a list of dictionaries into a single dictionary
    flattened_dict = defaultdict()
    for key in dict_list[0].keys():
        flattened_dict[key] = []

    for dictionary in dict_list:
        for key, value in dictionary.items():
            flattened_dict[key].append(value)

    return flattened_dict

def recommend_songs(song_list, spotify_data, n_songs=10):
    # Function to recommend songs based on a list of input songs
    metadata_cols = ['name', 'year', 'artists']
    song_dict = flatten_dict_list(song_list)

    song_center , songs = get_mean_vector(song_list, spotify_data)
    # Computes the mean vector for the input list of songs

    scaler = song_cluster_pipeline.steps[0][1]
    # Retrieves the scaler from the song cluster pipeline
    scaled_data = scaler.transform(spotify_data[number_cols])
    # Scales the numerical data in the spotify_data DataFrame
    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    # Scales the mean vector of the input songs

    distances = cdist(scaled_song_center, scaled_data, 'cosine')
    # Computes cosine distances between the scaled mean vector and the scaled data
    index = list(np.argsort(distances)[:, :n_songs][0])
    # Sorts the distances and gets the indices of the closest n_songs

    rec_songs = spotify_data.iloc[index]
    # Retrieves the recommended songs from the spotify_data DataFrame
    rec_songs = rec_songs[~rec_songs['name'].isin(song_dict['name'])]
    # Removes songs that are already in the input song list
    returnSongs = rec_songs[metadata_cols].to_dict(orient='records')
    
    # print(returnSongs)
    actualSongs = []
    for song in returnSongs:
        # print
        _,getSong = find_song(song['name'],song['year'])
        if getSong is None:
            continue
        actualSongs.append(getSong)
    
    # print(actualSongs)
    return actualSongs
    # Returns the recommended songs as a list of dictionaries with metadata columns
recommend_songs([{'name': 'Shut Up And Drive', 'year':2003},{'name':'Kings & Queens','year':2000}],  data,10)