/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import PhiModule from './src/NativePhiModule';


function App(): React.JSX.Element {
  const [chatHistory, setChatHistory] = React.useState([{prompt: 'Welcome to the RN Phi Silica Sample. Please enter a prompt.', type: 'Response', key: 'tester'}]);
  const [submittedPrompt, setSubmittedPrompt] = React.useState("");

  type ChatEntryProps = {
    prompt: string,
    type: 'Prompt' | 'Response'
  }
  const ChatEntry = (props: ChatEntryProps) => {
    return (
      <View style={styles.chatEntry} key={props.prompt}>
        <Text style={[styles.text, {fontWeight: 500, color: props.type == 'Prompt'? '#DDA0DD' : '#87CEEB', marginRight: 5}]}>{props.type}:</Text>
        <Text style={styles.text}>{props.prompt}</Text>
      </View>
    );
  }

  const Chat = () => {
    return (
        chatHistory.map(chatEntry => (<ChatEntry prompt={chatEntry.prompt} type={chatEntry.type}/>))
    );
  }

  return (
    <SafeAreaView style={styles.window}>
      <ScrollView style={styles.chat}>
        <Chat/>
      </ScrollView>
      <View  style={styles.promptBar}>
        <TextInput style={styles.typePrompt} placeholder='Type your prompt here' value={submittedPrompt} onChangeText={(text)=>{setSubmittedPrompt(text)}}/>
        <TouchableHighlight style={styles.submitPrompt} onPress={()=>{
          setChatHistory([...chatHistory, {prompt: submittedPrompt, type: 'Prompt', key: submittedPrompt}]);
          if (PhiModule){
            console.log("Running AI");
            PhiModule.getPhiResponse(submittedPrompt).then(result => setChatHistory([...chatHistory,{prompt: submittedPrompt, type: 'Prompt', key: submittedPrompt}, {prompt: result, type: 'Response', key: result}]));
          }else{
            console.log("Module is Null");
          }
        }} underlayColor={'#E8E8E8'}>
          <Text style={{fontSize: 18}}>Prompt</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  typePrompt: {
    borderRadius: 5,
    backgroundColor: '#E8E8E8',
    padding: 10,
    flexGrow: 1,
    marginRight: 10,
    fontSize: 18
  },
  submitPrompt: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#E8E8E8',
    borderWidth: 2,
    borderBottomWidth: 3
  },
  window: {
    height: '100%',
    width: '100%',
  },
  chat: {
    flexGrow: 1,
    margin: 10,
  },
  promptBar: {
    margin: 10,
    flexDirection: 'row'
  },
  text: {
    fontSize: 18
  },
  chatEntry: {
    flexDirection: 'row'
  }
});

export default App;
