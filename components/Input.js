import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    //{...props} allows for passing all valid props to TextInput to the
    //Crated input as well
    return <TextInput {...props} style={{...styles.input, ...props.style}}/>
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;