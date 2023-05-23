# +-------------------------+-----------------------------+
# Written By   : Akpokiro Victor
# +-------------------------+-----------------------------+
# Filename     : test.py
# +-------------------------+-----------------------------+
# Description  : CNNSplice: Robust Models for Splice Site 
#					Prediction Using 
#					Deep Convolutional Neural Networks. 
#		To test CNNSplice model
# +-------------------------+-----------------------------+
# Company Name :  OluwadareLab UCCS
# +-------------------------+-----------------------------+
# This also contain piece of code from:
# Wang, R et al., (2019) SpliceFinder source code [Source code]. 
# https://github.com/deepomicslab/SpliceFinder/blob/master/SpliceFinder_sourcecode/CNN_model.py
# +-------------------------+-----------------------------+

from __future__ import print_function
import numpy as np
import time
import os
import tensorflow.keras as keras
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential, Model, load_model
from tensorflow.keras.layers import Dense, Activation, Convolution2D, MaxPooling2D, Flatten
from tensorflow.keras.layers import Dense, Dropout, Activation
from tensorflow.keras.optimizers import Adam, RMSprop
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.applications import *
from sklearn import tree, metrics
from sklearn.metrics import precision_score, recall_score, classification_report, roc_auc_score
import argparse
np.set_printoptions(suppress=True)
from fasta_one_hot_encoder import FastaOneHotEncoder
import pdb

def mkdir_p(dir):
	if not os.path.exists(dir):
		os.makedirs(dir)


def load_data(location, filename):
	
	# converting fasta to one hot using external package
	encoder = FastaOneHotEncoder(
    nucleotides = "acgt",
    lower = True,
    sparse = False,
    handle_unknown="ignore"
	)

	path = os.path.join(location, filename)
	onehot = encoder.transform_to_df(path, verbose=False)
	
	new_file = open(location + '/onehot.txt', 'a') 
	result = np.array([row for row in onehot[['a', 'c', 'g', 't']].to_numpy()])
	appendcsv = np.array([result[x:x+400].flatten() for x in range(0, len(result), 400)])
	np.savetxt(new_file, appendcsv, fmt='%d')
	x_test = appendcsv.reshape(-1,400, 4)
	
	return x_test


def testing_process(x_test, modeltype, location):
	model = load_model('./backend/models/' + modeltype)
	start_time = time.time()
	print(model.summary())
	prob = model.predict(x_test)
	

	predicted = np.argmax(prob, axis=1)
	np.savetxt(os.path.join(location, 'results.txt'), predicted, fmt='%i')


def main(modeltype, filename, location):
	
	if modeltype == "acceptor_cnnsplice_at.h5":
		x_test= load_data(location, filename)
		testing_process(x_test, modeltype, location)

	if modeltype == "acceptor_cnnsplice_c_elegans.h5":
		x_test= load_data(location, filename)
		testing_process(x_test, modeltype, location)
	
	if modeltype == "acceptor_cnnsplice_d_mel.h5":
		x_test = load_data(location, filename)
		testing_process(x_test, modeltype, location)
	
	if modeltype == "acceptor_cnnsplice_hs.h5":
		x_test = load_data(location, filename)
		testing_process(x_test, modeltype, location)

	if modeltype == "acceptor_cnnsplice_oriza.h5":
		x_test= load_data(location, filename)
		testing_process(x_test, modeltype, location)

	if modeltype == "donor_cnnsplice_at.h5":
		x_test= load_data(location, filename)
		testing_process(x_test, modeltype, location)

	if modeltype == "donor_cnnsplice_c_elegans.h5":
		x_test = load_data(location, filename)
		testing_process(x_test, modeltype, location)
	
	if modeltype == "donor_cnnsplice_d_mel.h5":
		x_test = load_data(location, filename)
		testing_process(x_test, modeltype, location)
	
	if modeltype == "donor_cnnsplice_hs.h5":
		x_test = load_data(location, filename)
		testing_process(x_test, modeltype, location)

	if modeltype == "donor_cnnsplice_oriza.h5":
		x_test = load_data(location, filename)
		testing_process(x_test, modeltype, location)
