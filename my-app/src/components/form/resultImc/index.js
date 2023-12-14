import React from "react"
import { View, Text, TouchableOpacity, Share} from "react-native"
import { styles } from "./style"
import Icon from "react-native-vector-icons/FontAwesome";
export default function ResultImc(props) {
    const onShare = async () => {''
        const result = await Share.share({
            message: "Meu IMC hoje é: " + props.resultImc
        })
    }

    return (
        <View style={styles.resultImc}>
            <View style={styles.textContainer}>
                <Text style={styles.information}>{props.messageResultImc}</Text>
                <Text style={styles.numberImc}>{props.resultImc}</Text>
            </View>
            <View>
                {props.resultImc != '' ? (
                 <TouchableOpacity onPress={onShare} style={styles.textImage}>
                         <Icon name="share" size={30} />
                     <Text >
                         Compartilhar
                     </Text>
                </TouchableOpacity>
                ) : <View/>}
            </View>
        </View>
    )
}