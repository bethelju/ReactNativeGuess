import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude=null) => {
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
    const [currentMin, setCurrentMin] = useState(1)
    const [currentMax, setCurrentMax] = useState(100)

    const handleLower = () => {
        if(currentGuess > 1){
            setCurrentMax(currentGuess - 1)
            setCurrentGuess(generateRandomBetween(currentMin, currentGuess))
        }
    }

    const handleGreater = () => {
        if(currentGuess < 99){
            setCurrentMin(currentGuess + 1)
            setCurrentGuess(generateRandomBetween(currentGuess + 1, currentMax))
        }
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