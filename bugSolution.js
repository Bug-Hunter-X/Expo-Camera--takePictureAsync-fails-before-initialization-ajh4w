import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraReady) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handleCameraReady = async () => {
    const cameraStatus = await cameraRef.current.getStatusAsync();
    setCameraReady(cameraStatus.isRecording === false && cameraStatus.isTakingPhoto === false && cameraStatus.recording === false);
  };

  const cameraRef = React.useRef();

  if (hasPermission === null) {
    return <View />; //While asking for permission
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef} onCameraReady={handleCameraReady}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default App; 