let midi = require('midi');
let easymidi = require('easymidi');


let UDPSENDIP = "192.168.73.113";
//let UDPSENDIP = "10.0.0.131";
let UDPSENDPORT = 7777;
let UDPLISTENPORT = 7005;


/// SET UP OSC SERVER - SENDS AND RECIEVES MESSAGES FROM DEVICES
var osc = require("osc");
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: UDPLISTENPORT, // this port for listening
    broadcast: true,
    metadata: true
});
udpPort.open();


let midi_keys= false;
let midi_control= false;

let midi_ins = [];

let midi_keys_portname = "APC Key 25 mk2 Keys";
let midi_control_portname = "APC Key 25 mk2 Control";

let midi_outputs = easymidi.getInputs();

let eventtypes = [
    "noteon",	
    "noteoff",
    "velocity",
    "poly aftertouch",
    "cc",
    "program",
    "channel aftertouch",
    "pitch",
    "position",
    "mtc",
    "select",
    "clock",
    "start",
    "continue",
    "stop",
    "activesense",
    "reset",
    "sysex"	
];



midi_inputs = easymidi.getInputs();
console.log(midi_inputs);
for(const portname of midi_inputs){
    let input = new easymidi.Input(portname); 
    for(const event of eventtypes){
        input.on(event, function(params){
            console.log(portname,  event, params);
            let data = {
                portname : portname,
                event : event, 
                params : params
            }
            console.log("data",data);
            let address = "/midiosc";
            let args = [{type: "s", value: JSON.stringify(data)}];
            console.log("timetag?");
            let timetag = osc.timeTag(1);
            console.log(args);
            let bundle = {
                timeTag: osc.timeTag(1),
                packets :[{
                    address: address,
                    args: args
                }]
            }
            bundle = {
                address: address,
                args: args                
            }

            console.log("sending udp message " , address, args, UDPSENDIP, UDPSENDPORT);
            // send prop to all devices, but route will only be accepted by the one with the same name 
            udpPort.send(bundle, UDPSENDIP, UDPSENDPORT);


        });    
    }    
}


/*
for(let i = 0; i < midi_outputs.length; i++){


while(!midi_control && !midi_keys){
    // if it can't find the named midi port, this part will just keep looping and hang the app
    midi_inputs = easymidi.getInputs();
    console.log(midi_inputs);
    let real_portname = false;
    for(let i = 0; i < midi_outputs.length; i++){
        if(midi_outputs[i].includes(midi_keys_portname)){
            real_keys_portname = midi_outputs[i];
        }
        if(midi_outputs[i].includes(midi_control_portname)){
            real_control_portname = midi_outputs[i];
        }
    }
    if(real_keys_portname){
        midi_keys = new easymidi.Input(real_keys_portname);   

    }
    if(real_control_portname){
        midi_control = new easymidi.Input(real_control_portname);   
    }
}

console.log("got midi ins", midi_keys, midi_control);



for(const event of eventtypes){
    midi_keys.on(event, function(params){
        console.log("keys", event, params);
    });    
    midi_control.on(event, function(params){
        console.log("control", event, params);
    });    
}
*/