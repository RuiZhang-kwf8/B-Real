    import React, { useState, useEffect, useRef } from 'react';
    import { Button, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
    import Constants from 'expo-constants';
    import { Camera, CameraType,CameraView } from 'expo-camera';
    import * as MediaLibrary from 'expo-media-library';
    import { MaterialIcons } from '@expo/vector-icons';
    import { db } from '../firebase'; // Adjust the path if needed
import { ref, query, orderByChild, equalTo, get, update, set, arrayUnion, push} from 'firebase/database';


    const Card = ({ navigation, route}) => {
      const { userdata } = route.params;

      const [hasCameraPermission, setHasCameraPermission] = useState(null);
      const [image, setImage] = useState(null);
      const [type, setType] = useState("back");
      const [flash, setFlash] = useState("off");
      const cameraRef = useRef(null);
 
    useEffect(() => {
        (async () => {
          MediaLibrary.requestPermissionsAsync();
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          console.log(cameraStatus); 
          setHasCameraPermission(cameraStatus.status === 'granted');
        })();
      }, []);
      
    
  function toggleCameraFacing() {
    setType(current => (current === 'back' ? 'front' : 'back'));
  }

    const takePicture = async () => {
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync();
            setImage(data.uri);
            console.log(data.uri);
            const userRef = query(ref(db, 'users'), orderByChild('username'), equalTo(userdata));
          
            let snapshot = await get(userRef); 
              const userId = Object.keys(snapshot.val())[0];

              const userRef1 = ref(db, `users/${userId}/moments`);
              
            let snapshot1 = await get(userRef1); 
            console.log(snapshot1);
            let currentmoments = snapshot1.exists() ? snapshot1.val() : [];
              currentmoments.push(data.uri);
              console.log(currentmoments);
              await set(ref(db, `users/${userId}/moments`), currentmoments);

            const momentRef = push(ref(db, 'moments'));
            const refID = momentRef.key;
            const newMoment = {
                 user: userdata, 
                 likes: [],
                 comments: []
            };
        
            await set(ref(db, `moments/${refID}`), newMoment);
            
      }
    };
    
      const savePicture = async () => {
        if (image) {
          try {
            const asset = await MediaLibrary.createAssetAsync(image);
            alert('Picture saved! 🎉');
            setImage(null);        
            console.log('saved successfully');
          } catch (error) {
            console.log(error);
          }
        }
      };
    
      if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }
    
      return (
        <View style={styles.container}>
          {!image ? (
      <CameraView style={styles.camera} facing={type}
              type={type}
              ref={cameraRef}
              flashMode={flash}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 30,
                }}
              >
                
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
            
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Pic</Text>
          </TouchableOpacity>


              </View>
            </CameraView>
          ) : (
            <Image source={{ uri: image }} style={styles.camera} />
          )}
    
          <View style={styles.controls}>
            {image ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 50,
                }}
              >
                <Button
                  title="Re-take"
                  onPress={() => setImage(null)}
                  icon="retweet"
                />
                <Button title="Save" onPress={savePicture} icon="check" />
              </View>
            ) : (
              <Button title="Take a picture" onPress={takePicture} icon="camera" />
            )}
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000',
        padding: 8,
      },
      controls: {
        flex: 0.5,
      },
      button: {
        height: 40,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E9730F',
        marginLeft: 10,
      },
      camera: {
        flex: 5,
        borderRadius: 20,
      },
      topControls: {
        flex: 1,
      },
    });


export default Card;
