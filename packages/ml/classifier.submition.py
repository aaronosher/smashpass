#!/usr/bin/python3
# neural network classifier

import sys
import os.path
import math
import json
import functools
import numpy as np
import scipy.special

class NNLayer(object):
    
    def __init__(self, isize, osize):
        self.isize = isize
        self.osize = osize
        if osize == 0: self.weights = 0.5 * np.ones((osize, isize)) + 0.5 * np.random.rand(osize, isize)
        else: self.weights = np.random.rand(osize, isize)
        self.inputs = None
        self.output = None
        self.error = None
        self.delta = np.zeros((osize, isize))
    
    def run_forward(self, inputs):
        self.inputs = inputs
        sums = np.dot(self.weights, inputs)
        self.output = scipy.special.expit(sums)
        return self.output
    
    def run_backward(self, error, alpha):
        self.error = np.multiply(self.inputs, np.expand_dims(error * np.clip(self.output * (1 - self.output), 0.0001, 1), axis=1)) + 0.0001 * self.weights
        self.delta = alpha * self.error + 0.001 * self.delta
        self.weights -= self.delta
        return np.dot(np.swapaxes(self.weights, 0, 1), error * self.output * (1 - self.output))
    
    def load(self, weights):
        self.weights = np.reshape(weights, (self.osize, self.isize))
        self.error = None
        self.delta = None
    
    def serialize(self):
        return self.weights.flatten().tolist()
    
    def reg_loss(self):
        return np.sum(np.square(self.weights))
    
    def __repr__(self):
        return str(self.weights)

class NNLayers(object):
    
    def __init__(self, isize):
        self.isize = isize
        self.osize = isize
        self.layers = []
        self.probs = None
    
    def forward(self, inputs):
        for layer in self.layers:
            inputs = layer.run_forward(inputs)
        prob = np.exp(inputs)
        self.probs = np.divide(prob, np.sum(prob))
        return self.probs
    
    def backward(self, target, alpha):
        error = self.probs - target
        for layer in reversed(self.layers):
            error = layer.run_backward(error, alpha)
        return error
    
    def get_loss(self, target):
        return -np.sum(target * np.log(self.probs))
    
    def reg_loss(self):
        return sum(map(NNLayer.reg_loss, self.layers))
    
    def set_input_size(self, isize):
        self.isize = isize
        self.osize = isize
    
    def add_layer(self, osize):
        layer = NNLayer(self.osize, osize)
        self.layers.append(layer)
        self.osize = osize
        return layer
    
    def load(self, data):
        for weights, layer in zip(data, self.layers):
            layer.load(weights)
    
    def serialize(self):
        weights = []
        for layer in self.layers:
            weights.append(layer.serialize())
        return weights
    
    def get_sizes(self):
        sizes = []
        for layer in self.layers:
            sizes.append(layer.osize)
        return sizes
    
    def __repr__(self):
        return ",\n".join(map(str, self.layers))

class NeuralNetwork(object):
    
    def __init__(self, isize):
        self.layers = NNLayers(isize)
    
    def add_layer(self, osize):
        self.layers.add_layer(osize)
    
    def add_layers(self, sizes):
        for osize in sizes:
            self.layers.add_layer(osize)
    
    def load_weights(self, name):
        with open(name) as handle:
            data = json.load(handle)
            self.layers.set_input_size(data["isize"])
            self.add_layers(data["layers"])
            self.layers.load(data["weights"])
    
    def save_weights(self, name):
        with open(name, "w") as handle:
            json.dump({ "isize": self.layers.isize, "layers": self.layers.get_sizes(), "weights": self.layers.serialize() }, handle)
    
    def train_one(self, data, target, alpha):
        outp = self.layers.forward(data)
        error = self.layers.backward(target, alpha)
        hit = (np.argmax(target) == np.argmax(outp))
        return (self.layers.get_loss(target), hit)
    
    def train_multi(self, items, alpha):
        error = 0
        hits = 0
        misses = 0
        for data, target in items:
            ret = self.train_one(data, target, alpha)
            error += ret[0]
            if ret[1]: hits += 1
            else: misses += 1
        return (error, hits, misses)
    
    def check_one(self, data, target):
        outp = self.layers.forward(data)
        hit = (np.argmax(target) == np.argmax(outp))
        return (self.layers.get_loss(target), hit)
    
    def check_multi(self, items):
        error = 0
        hits = 0
        misses = 0
        for data, target in items:
            ret = self.check_one(data, target)
            error += ret[0]
            if ret[1]: hits += 1
            else: misses += 1
        return (error, hits, misses)
    
    def run_one(self, data):
        return self.layers.forward(data)
    
    def __repr__(self):
        return str(self.layers)

def word_to_onehot(s):
    letters = {
        "a": 0, "b": 1, "c": 2, "č": 3, "d": 4,
        "e": 5, "f": 6, "g": 7, "h": 8, "i": 9,
        "j": 10, "k": 11, "l": 12, "m": 13, "n": 14,
        "o": 15, "p": 16, "r": 17, "s": 18, "š": 19,
        "t": 20, "u": 21, "v": 22, "z": 23, "ž": 24
    }
    ret = np.zeros(25*len(s))
    i = 0
    for c in s:
        if c in letters: ret[i+letters[c]] = 1
        i += 25
    return ret

def gender_to_onehot(s):
    ret = np.zeros(3)
    if s == "m": ret[0] = 1
    if s == "z": ret[1] = 1
    if s == "s": ret[2] = 1
    return ret

def prob_to_gender(a):
    idx = np.argmax(a)
    if idx == 0: return "m"
    if idx == 1: return "z"
    if idx == 2: return "s"

def do_main_test(wname, iname):
    net = NeuralNetwork(isize=150)
    net.load_weights(wname)
    with open(iname) as handle:
        for line in handle:
            value = line.strip()
            data = word_to_onehot(value)
            prob = net.run_one(data)
            print("\"" + value + "\":", prob_to_gender(prob), prob)
    return

def do_main_validate(wname, iname):
    net = NeuralNetwork(isize=150)
    net.load_weights(wname)
    with open(iname) as handle:
        for line in handle:
            (word, gender) = line.strip().split(",")
            data = word_to_onehot(word)
            prob = net.run_one(data)
            pgender = prob_to_gender(prob)
            if gender != pgender: print("\"" + word + "," + gender + "\":", pgender, prob)
    return

def do_main_stat(wname, iname):
    net = NeuralNetwork(isize=150)
    net.load_weights(wname)
    items = []
    with open(iname) as handle:
        for line in handle:
            (word, gender) = line.strip().split(",")
            items.append((word_to_onehot(word), gender_to_onehot(gender)))
    loss = net.train_multi(items)
    print(wname + ": loss=" + str(loss), "reg_loss=" + str(net.layers.reg_loss()))
    return

def do_main_train(wname, iname, dosave, doload):
    net = NeuralNetwork(isize=150)
    if doload and os.path.isfile(wname):
        net.load_weights(wname)
    else:
        if len(sys.argv) > 6:
            net.add_layers(map(int, sys.argv[6].split(",")))
        net.add_layer(3)
    items = []
    alpha = float(sys.argv[4])
    iters = int(sys.argv[5])
    skip = int(iters/10)
    if skip > 25: skip = 25
    elif skip < 1: skip = 1
    with open(iname) as handle:
        for line in handle:
            (word, gender) = line.strip().split(",")
            items.append((word_to_onehot(word), gender_to_onehot(gender)))
    print("train (alpha=" + str(alpha) + ", iterations=" + str(iters) + "):")
    for i in range(iters):
        loss = net.train_multi(items, alpha=alpha)
        if (i == 0) or (i % skip == (skip - 1)):
            print("#" + str(i+1) + ":", "loss=" + str(loss), "reg_loss=" + str(net.layers.reg_loss()))
    if dosave: net.save_weights(wname)

def __main__():
    if len(sys.argv) < 4:
        print("Usage: classifier.py [command]")
        print("                     train|train-dry|train-fresh [weights] [inputs] [alpha] [count] [layers]")
        print("                     test [weights] [inputs]")
        print("                     stat [weights] [inputs]")
        print("                     validate [weights] [inputs]")
        return
    
    if sys.argv[1] == "test": return do_main_test(sys.argv[2], sys.argv[3])
    if sys.argv[1] == "stat": return do_main_stat(sys.argv[2], sys.argv[3])
    if sys.argv[1] == "validate": return do_main_validate(sys.argv[2], sys.argv[3])
    if sys.argv[1] == "train": return do_main_train(sys.argv[2], sys.argv[3], True, True)
    if sys.argv[1] == "train-fresh": return do_main_train(sys.argv[2], sys.argv[3], True, False)
    if sys.argv[1] == "train-dry": return do_main_train(sys.argv[2], sys.argv[3], False, True)

try:
    __main__()
except KeyboardInterrupt:
    pass
