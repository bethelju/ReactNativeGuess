import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const handleLower = () => {
        if(currentGuess > 1 && currentGuess > props.userChoice){
            currentHigh.current = currentGuess - 1;
            setCurrentGuess(generateRandomBetween(currentLow.current, currentGuess, currentGuess));
            setRounds(curRounds => curRounds + 1)
        }
        else {
            Alert.alert("Hmmmm", "Are you sure you're not lying?", [
                { text: 'Sorry', style: 'cancel' }
            ]);
        }
    }

    const handleGreater = () => {
        if(currentGuess < 99 && currentGuess < props.userChoice){
            currentLow.current = currentGuess + 1;
            setCurrentGuess(generateRandomBetween(currentGuess + 1, currentHigh.current, currentGuess));
            setRounds(curRounds => curRounds + 1)
        }
        else {
            Alert.alert("Hmmmm", "Are you sure you're not lying?", [
                { text: 'Sorry', style: 'cancel' }
            ]);
        }
        return;
    }
    
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={() => {handleLower()}}/>
                <Button title="GREATER" onPress={() => {handleGreater()}}/>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20, 
        width: 300, 
        maxWidth: '80%'
    }
});

export default GameScreen;