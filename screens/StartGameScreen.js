import React, { useState } from 'react';
import { View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    //native APIs
    Keyboard,
    Alert
} from 'react-native';

import Colors from '../constants/colors'
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState();

    const numericInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', 
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        //All three state changes batched together
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber)
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.confirmGame}>
                <Text>Chosen Number:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="Start Game" />
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>The Game Screen!</Text>
                <Card style={styles.inputContainer}>
                    <View style={styles.inputContainer}>
                        <Text>Select a Number</Text>
                        <Input style={styles.input} blurOnSubmit 
                        autoCapitalize='none' maxLength={2} 
                        keyboardType="numeric" autoCorrect={false}
                        onChangeText={numericInputHandler} value={enteredValue}/>
                        <View style = {styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button title="Reset" onPress={resetInputHandler} color={Colors.secondary} />
                            </View>
                            <View color="" style={styles.button}>
                                <Button title="Confirm" 
                                onPress={confirmInputHandler} 
                                color={Colors.primary}/>
                            </View>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 80
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',

    },
    buttonContainer:{
        flexDirection: 'row',
        width: '100%',
        //Empty space placed between children
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
        width: 100,
        textAlign: 'center'
    },
    confirmGame: {
        marginTop: 10,
        //overrides default value of stretch
        alignItems: 'center'
    }
});

export default StartGameScreen;