import {React, useState} from "react"
import { View, Text, Vibration ,TextInput, TouchableOpacity, Pressable, Keyboard, FlatList} from "react-native"
import ResultImc from "./resultImc"
import { styles } from "./style"

export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [imc, setImc] = useState('')
    const [messageImc, setMessageImc] = useState('')
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])
    
    function imcCalculator() {
        let heightFormat = height.replace(",", ".")
        let totalImc = (weight/(heightFormat*heightFormat)).toFixed(2)
        setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    function verificationImc() {
        if (imc == '') {
            Vibration.vibrate()
            setErrorMessage("Campo obrigatório*")
            return
        }
    }

    function validationImc() {
        console.log(imcList)
        if(weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual:")
            setTextButton("Calcular novamente")
            setErrorMessage('')
        } else {
            verificationImc()
            setImc('')
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e altura")
        }
    }

    return (
        <View style={styles.formContext}>
            {imc == '' ? (
             <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput style={styles.formInput} placeholder="Ex. 1.71" keyboardType="numeric" onChangeText={setHeight} value={height}/>
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput style={styles.formInput} placeholder="Ex. 95.6" keyboardType="numeric" onChangeText={setWeight} value={weight}/>
                    <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
              </Pressable>
            ): (
                <View style={styles.exhibitionResultImc}> 
                        <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                    <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList style={styles.listImcs} data={imcList.reverse()} keyExtractor={item => item.id} renderItem={({item}, key) =>{ 
                return (
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResultItemList} key={key}>Resultado IMC = {item.imc}</Text>
                    </Text>
                    )
                }
                } />
        </View>
    )
}