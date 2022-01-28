import { Box, Image } from "@skynexui/components";
import { Button as Botao } from "@skynexui/components";
import { Text as Texto } from "@skynexui/components";
import { TextField as CampoDeTexto }  from "@skynexui/components";
import appConfig from "../config.json";
import React from "react";

export default function PaginaInicial() {
  const [username, setUsername] = React.useState("");
  const [usuarioValido, setUsuarioValido] = React.useState();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
          },
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary["900"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Image
            styleSheet={{
              borderRight: usuarioValido
                ? `solid 4px ${appConfig.theme.colors.primary["050"]}`
                : ``,
              transition: "0.2s",
            }}
            src={"../static/code-agora.png"}
          ></Image>
          {/* Photo Area */}
          <Box
            styleSheet={{
              display: usuarioValido ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "200px",
              padding: "16px",
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              active={usuarioValido}
              styleSheet={{
                borderRadius: "50%",
              }}
              onError={(event) => {
                setUsuarioValido(false);
                console.log(`Não foi encontrado nenhum usuario com o nome ${username}`);
              }}
              onLoad={() => {
                setUsuarioValido(true);
              }}
              src={usuarioValido ? `https://github.com/${username}.png` : ''}
            />
          </Box>
          {/* Photo Area */}
        </Box>

        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "column",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Texto
              fullWidth
              styleSheet={{
                color: appConfig.theme.colors.primary["050"],
                fontSize: "1.7rem",
                padding: "3px 10px",
                margin: "8px",
              }}
            >
              {usuarioValido ? `Bem vindo ${username}` : `Quem está por ai?`}
            </Texto>

            <CampoDeTexto
              hasLabel={!usuarioValido}
              label="Usuário inválido"
              styleSheet={{
                padding: "16px",
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals["200"],
                  mainColor: appConfig.theme.colors.neutrals["900"],
                  mainColorHighlight: appConfig.theme.colors.primary["500"],
                  backgroundColor: appConfig.theme.colors.neutrals["700"],
                },
              }}
              onChange={(event) => {
                event.preventDefault();

                const usernameValue = event.target.value;

                if(usernameValue.length < 2){
                    setUsuarioValido(false);
                }
                else{
                    setUsuarioValido(true);
                }
                
                setUsername(usernameValue);
              }}
              value={username}
              fullWidth
            />
            <Botao
              type="submit"
              label="Entrar"
              disabled={!usuarioValido}
              fullWidth
              styleSheet={{
                padding: "16px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary["500"],
                mainColorLight: appConfig.theme.colors.primary["400"],
                mainColorStrong: appConfig.theme.colors.primary["600"],
              }}
            />
          </Box>
          {/* Formulário */}
        </Box>
      </Box>
    </>
  );
}
