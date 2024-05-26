import { router } from 'expo-router';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { useState, useRef } from 'react';
import { CameraView, useCameraPermissions, CameraPictureOptions } from 'expo-camera';
import { PixelRatio } from 'react-native';
import { createAccount, addPhotos } from '../utils/routes/login';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import { useSession } from '../utils/ctx';

import { getItem, setItem } from 'expo-secure-store';
import { uploadICSFile } from '@/utils/routes/uploads';

const SignUpButton = ({ userID, firstImage, secondImage, router, text = "Sign Up", username = null, password = null }) => {
    const userId = getItem('user');
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
            await addPhotos(userId, firstImage, secondImage);
            router.replace('/');
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
};


const NextButton = ({switchToImage, firstPassword, secondPassword, username, passwordMismatch}) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
            if (firstPassword === secondPassword) {
                const response = await createAccount(username, firstPassword);
                const userID = response.user_id;
                console.log(userID);
                setItem("user", userID);
                switchToImage(true);
            } else {
                passwordMismatch(true);
            }
        }}
      >
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#7A98C4",
      width: "80%",
      height: 40,
      alignItems: 'center',
      justifyContent: 'center', // This vertically centers the text
      borderRadius: 5,
      marginTop: 20,
    },
    text: {
      color: "#FFFFFF",
      textAlign: "center",
      // Adjust lineHeight if necessary; it should be close to the Button's height for vertical centering
      lineHeight: 30,
    },
    input: {
        height: 40,
        width: "80%",
        backgroundColor: "#EEEEEE",
        color: "#3C6198",
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      camera: {
        flex: 1,
      },
});

const SignUpForm = ({switchToImage}) => {
    const [passwordMismatch, setMismatch] = useState(false);
    const [username, setUsername] = useState('invalid');
    const [firstPassword, firstPasswordChange] = useState('err');
    const [secondPassword, secondPasswordChange] = useState('invalid');

    return (

        <View style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            paddingTop: 70,
        }}>
            <Image
                style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: 300,
                    maxWidth: 250,
                    marginLeft: 30,
                    marginTop: 30,
                    marginBottom: 20
                }}
                source={require('../assets/images/landing_logo.png')}
            />
                <TextInput 
                    style={styles.input}
                    placeholder="Username"
                    returnKeyType="next"
                    autoCorrect={false}
                    onChangeText={setUsername}
                    placeholderTextColor={"#7A98C4"}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#7A98C4"
                    returnKeyType='go'
                    secureTextEntry
                    onChangeText={firstPasswordChange}
                    autoCorrect={false}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#7A98C4"
                    returnKeyType='go'
                    secureTextEntry
                    onChangeText={secondPasswordChange}
                    autoCorrect={false}
                />
                {passwordMismatch && (
                    <Text>Passwords do not match</Text>
                )}
                <NextButton switchToImage={switchToImage} firstPassword={firstPassword} secondPassword={secondPassword} username={username} passwordMismatch={setMismatch} />
        </View>

    )
}

const UploadImage = ({signIn, router}) => {
    const [permission, requestPermission] = useCameraPermissions();
    const camera = useRef(null);
    const [photoCount, setPhotoCount] = useState(0);
    const userID = getItem('user')

    const [firstImage, setFirst] = useState(null);
    const [secondImage, setSecond] = useState(null);

    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const handleSelectAndUploadFile = async () => {
        // Let the user pick a document
        let result = await DocumentPicker.getDocumentAsync({
          type: 'text/calendar', // MIME type for .ics files to narrow down file selection
        });
    
        // Exit if the user cancels the document picker
        if (result.canceled !== false) {
          alert('File selection was cancelled.');
          return;
        }
    
        try {
          setIsUploading(true); // Indicate the start of the upload process
    
          // Assuming your uploadFile function takes the file URI and handles the upload
        //   await uploadFile(result.uri);
        const file = result.assets[0].uri
        console.log(result);
        const content = await FileSystem.readAsStringAsync(file);
        console.log(content);
        const r = await uploadICSFile(userID, content);

    
          alert('File uploaded successfully!');
        } catch (error) {
          console.error('Upload failed:', error);
          alert('Failed to upload file.');
        } finally {
          setIsUploading(false); // Reset the upload indicator
          setIsUploaded(true);
        }
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }   
    
    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
    }

    const onPictureSaved = ({ uri, width, height, exif, base64 }) => {
        if (photoCount == 0) {
            setFirst(base64);
        } else if (photoCount == 1) {
            setSecond(base64)
        }
    }

    const pictureOptions = {
        quality: 1, // A value between 0 and 1.0, where 1.0 is the highest quality
        base64: true, // If true, includes a base64-encoded string of the picture in the response
      };

    return (
        <View style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            paddingTop: 70,
        }}>
            {(photoCount == 0) && (
                <View
                style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <Text 
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 50,
                        fontWeight: 600
                    }}
                >
                    First:
                </Text>
                <Text 
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 20,
                        paddingBottom: 20
                    }}
                >
                    Take a <Text style={{fontWeight: 600}}>HAPPY</Text> photo!
                </Text>
                <View
                style={{
                    height: 400,
                    width: "80%"
                    }}
                >
                    <CameraView style={styles.camera} facing={"front"} ref={camera} />
                </View>


                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        if (camera) {
                            await camera.current.takePictureAsync(pictureOptions).then(onPictureSaved);
                            setPhotoCount(photoCount + 1);
                        }
                    }
                    }
                >
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
                </View>
            )}

            {(photoCount == 1) && (
                <View
                style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <Text 
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 50,
                        fontWeight: 600
                    }}
                >
                    Second:
                </Text>
                <Text 
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 20,
                        paddingBottom: 20
                    }}
                >
                    Take a <Text style={{fontWeight: 600}}>SAD</Text> photo!
                </Text>
                <View
                style={{
                    height: 400,
                    width: "80%"
                    }}
                >
                    <CameraView style={styles.camera} facing={"front"} ref={camera} />
                </View>


                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        if (camera) {
                            await camera.current.takePictureAsync(pictureOptions).then(onPictureSaved);
                            setPhotoCount(photoCount + 1);
                        }
                    }
                    }
                >
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
                </View>
            )}

            {(photoCount == 2) && (
            <View style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                paddingTop: 70,
            }}>
            <Image
                style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: 300,
                    maxWidth: 250,
                    marginLeft: 30,
                    marginTop: 30,
                    marginBottom: 20
                }}
                source={require('../assets/images/landing_logo.png')}
            />
                <Text
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 20,
                    }}
                >
                    Upload Your Schedule
                </Text>

                {isUploading ? (
                    <Text>Uploading...</Text>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSelectAndUploadFile}
                    >
                        <Text style={styles.text}>Select and Upload .ics File</Text>
                    </TouchableOpacity>
                )}
                
                {isUploaded && (
                    <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        if (camera) {
                            setPhotoCount(photoCount + 1);
                        }
                    }
                    }
                    >
                        <Text style={styles.text}>Next</Text>
                    </TouchableOpacity>
                )}
                </View>
                )}

                {(photoCount == 3) && (
                <View style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    paddingTop: 70,
                }}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: 300,
                        maxWidth: 250,
                        marginLeft: 30,
                        marginTop: 30,
                        marginBottom: 20
                    }}
                    source={require('../assets/images/landing_logo.png')}
                />
                <Text
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 20,
                    }}
                >
                    All Done!
                </Text>
                <SignUpButton userID={userID} firstImage={firstImage} secondImage={secondImage} router={router} text='Jump In!'/>
            </View>
            )}
        </View>
    )
}

export default function SignIn() {  
  const [imageUpload, switchToImage] = useState(false);
  const { signIn } = useSession();

  return (
    <View style={{
        backgroundColor: "#3C6198",
        height: "100%",
        width: "100%",
    }}>
        {imageUpload ? (
            <UploadImage signIn={signIn} router={router} />
        ) : (
            <SignUpForm switchToImage={switchToImage} />
        )}
    </View>
  );
}
