# Model Builder

Model Builder is a web application for creating visual representations of neural network architectures. It provides a simple interface to design and export network diagrams for use in academic papers, presentations, or documentation.

You can access the application here: [Model Builder](https://boramerts.github.io/model-builder/)

## How to Use

The application uses a drag-and-drop interface for building neural networks. To create a diagram:

1. Click "Add Layer" to begin building your network
2. Choose a layer type and configure its parameters
3. Add more layers as needed
5. Export your diagram in SVG or PNG format

## Layer Types

The application supports four common neural network layer types:

Convolutional Neural Network (CNN) layers can be configured with width, height, number of filters, kernel size, stride, and padding type.

Dense layers allow you to set the number of units and choose activation functions (ReLU, sigmoid, or tanh).

LSTM layers include options for memory units, return sequences, and activation functions.

MaxPooling layers can be configured with stride size for downsampling.

## Visual Styles

Three visualization styles are available:

Default style shows detailed layer architecture with color-coding and parameter visualization.

Minimal style provides a simplified block representation suitable for basic architectural overviews.

Rounded style uses modern styling with rounded corners and solid colors.

## Export Features

Diagrams can be exported in two formats:

SVG format provides vector graphics ideal for publications and scaling.

PNG format creates high-resolution raster images suitable for presentations.

## Development

This project is built with:
- React
- Vite
- Tailwind CSS
- Material-UI components
- DND Kit for drag and drop functionality