import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import Card from '../components/Card'

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>The Game Screen!</Text>
            <Card style={styles.inputContainer}>
                <View style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <TextInput />
                    <View style = {styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={() => {}} /></View>
                        <View style={styles.button}><Button title="Confirm"/></View>
                    </View>
                </View>
            </Card>
        </View>
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
    }
});

export default StartGameScreen;