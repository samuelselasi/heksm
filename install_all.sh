#!/bin/bash

echo "Installing Python requirements..."
pip install -r requirements.txt

echo "Installing C++ build tools..."
sudo apt update && sudo apt install build-essential cmake g++ -y

echo "Cloning and building Microsoft SEAL..."
git clone https://github.com/microsoft/SEAL.git
cd SEAL && cmake -S . -B build && cmake --build build && sudo cmake --install build
cd ..

echo "All dependencies installed."
