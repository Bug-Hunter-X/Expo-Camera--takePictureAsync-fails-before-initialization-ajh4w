# Expo Camera Initialization Error

This repository demonstrates a common error encountered when using the Expo Camera API: attempting to use `takePictureAsync` before the camera has fully initialized.  The `bug.js` file shows the problematic code, while `bugSolution.js` provides a corrected version.

## Problem

Calling `takePictureAsync` too early results in errors or undefined behavior.  The solution involves ensuring the camera is ready before attempting to capture an image.

## Solution

The solution uses the `Camera.getStatusAsync` method to check the camera's status. Only when the status indicates the camera is ready is `takePictureAsync` called. This prevents errors and ensures reliable image capture.