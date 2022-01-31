import {
  Box,
  Text,
  TextField as TextField,
  Image,
  Button,
} from "@skynexui/components";
import { imageConfigDefault } from "next/dist/server/image-config";
import React, { useState, useEffect, useContext } from "react";
import appConfig from "../config.json";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU5NDgzNCwiZXhwIjoxOTU5MTcwODM0fQ.TtEL2hds7NCGFsrLUOJLoM2qvQzeJlGKByrBYfN2r3Q";
const SUPABASE_URL = "https://gtiaumhmzulzevrbtqwc.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export default function Chat() {
  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);

  const roteador = useRouter();

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .then(({data}) => {
        setListaDeMensagens(...listaDeMensagens, data);
      })
  }, [])

  function enviarMensagemHandler(message) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: roteador.query.username,
      texto: message
    };

    setListaDeMensagens([mensagem, ...listaDeMensagens]);
    setMensagem("");
  }

  function deletarItem(id){
    setListaDeMensagens((lista) => lista.filter((item) => item.id != id))
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary["900"],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "20px",
          backgroundColor: appConfig.theme.colors.primary["800"],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaDeMensagens} deletarMensagem={deletarItem}/>

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              value={mensagem}
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "40px",
                padding: "16px 16px",
                backgroundColor: appConfig.theme.colors.neutrals["000"],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals["900"],
              }}
              onChange={(event) => {
                const message = event.target.value;

                setMensagem(message);
              }}
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  enviarMensagemHandler(mensagem);
                }
              }}
            />
            <Button
                iconName="arrowRight"
                styleSheet={{
                    backgroundColor: appConfig.theme.colors.primary["900"],
                    hover: {
                        backgroundColor: appConfig.theme.colors.primary["700"]
                    },
                    focus: {
                        backgroundColor: appConfig.theme.colors.primary["900"]
                    } 
                }}
                onClick={() => {
                    enviarMensagemHandler(mensagem)
                }}
            >
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="secondary"
          label="Logout"
          href="/"
          buttonColors={{}}
          styleSheet={{
            color: "white",
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => 
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Button
                onClick={() =>{props.deletarMensagem(mensagem.id)}}
              >
              </Button>
            </Box>
            {mensagem.texto}
          </Text>
      )}
    </Box>
  );
}
