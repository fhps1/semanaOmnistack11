import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';


export default function Detail(){
    //----------------------------------- para imprimir dados do incidente
    const route= useRoute();
    const incident = route.params.incident;

    //----------------------------------- navegação
    const navigation = useNavigation();
    function navigateBack(){
        navigation.goBack();
    }

    const mensagem = 
    `Olá, ${incident.name}!
     Estou entrando em contato para ajudá-la no caso "${incident.title}".`
    //----------------------------------- whatsapp
    function sendWhats(){
        //Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${mensagem}`);
        //placeholder
        Linking.openURL('https://www.google.com.br')
    }
    //----------------------------------- email
    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [`${incident.email}`],
            body: mensagem,
        });
    }
    //------------------------------- HTML JSX ReactNative
    return(
        <View style={styles.container}>
            <View style = {styles.header}>
                <Image source = {logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color='#E02041' />
                </TouchableOpacity>
            </View>
            
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG: </Text>
                <Text style={styles.incidentValue}>{incident.name} </Text>

                <Text style={styles.incidentProperty}>CASO: </Text>
                <Text style={styles.incidentValue}> {incident.title} </Text>

                <Text style={styles.incidentProperty}>VALOR: </Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency', 
                        currency:'BRL'
                    }).format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato: </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhats}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}