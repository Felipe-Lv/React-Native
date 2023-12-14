import {React, useState} from "react"
import { View, Text, Vibration ,TextInput, TouchableOpacity, Pressable, Keyboard} from "react-native"
import ResultImc from "./resultImc"
import { styles } from "./style"

export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [imc, setImc] = useState('')
    const [messageImc, setMessageImc] = useState('')
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)
    
    function imcCalculator() {
        let heightFormat = height.replace(",", ".")
        return setImc((weight/((heightFormat*heightFormat))).toFixed(2))
    }

    function verificationImc() {
        if (imc == '') {
            Vibration.vibrate()
            setErrorMessage("Campo obrigatório*")
            return
        }
    }

    function validationImc() {
        if(weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual:")
            setTextButton("Calcular novamente")
            setErrorMessage('')
            return
        }
        verificationImc()
        setImc('')
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.formInput} placeholder="Ex. 1.71" keyboardType="numeric" onChangeText={setHeight} value={height}/>
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.formInput} placeholder="Ex. 95.6" keyboardType="numeric" onChangeText={setWeight} value={weight}/>
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </Pressable>
    )
}