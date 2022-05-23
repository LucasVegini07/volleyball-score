import React, { useState, useEffect } from "react";

export default function App() {
  const [pontosEquipeA, setPontosEquipeA] = useState(0);
  const [pontosEquipeB, setPontosEquipeB] = useState(0);
  const [setsEquipeA, setSetsEquipeA] = useState(0);
  const [setsEquipeB, setSetsEquipeB] = useState(0);
  const [placares, setPlacares] = useState([]);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  useEffect(() => {
    verificaPlacar();
  }, [pontosEquipeA, pontosEquipeB, verificaPlacar]);

  function verificaPlacar() {
    const pontuacaoMax = setsEquipeA === 2 && setsEquipeB === 2 ? 14 : 24;

    if (pontosEquipeA >= pontuacaoMax && pontosEquipeB >= pontuacaoMax) {
      if (pontosEquipeA - pontosEquipeB === 2) {
        return setFimDeJogo(true);
      }

      if (pontosEquipeB - pontosEquipeA === 2) {
        return setFimDeJogo(true);
      }

      setFimDeJogo(false);
      return;
    }

    if (pontosEquipeA > pontuacaoMax) {
      return setFimDeJogo(true);
    }

    if (pontosEquipeB > pontuacaoMax) {
      return setFimDeJogo(true);
    }

    setFimDeJogo(false);
  }

  function confirmarVitoria() {
    const novoPlacar = `${
      setsEquipeA + setsEquipeB + 1
    }° set: Equipe A: ${pontosEquipeA} x Equipe B: ${pontosEquipeB}`;

    const novosPlacares = placares;

    novosPlacares.push(novoPlacar);

    setPlacares(novosPlacares);

    if (pontosEquipeA > pontosEquipeB) {
      setSetsEquipeA(setsEquipeA + 1);
    } else {
      setSetsEquipeB(setsEquipeB + 1);
    }

    setPontosEquipeA(0);
    setPontosEquipeB(0);
  }

  function novoJogo() {
    setPontosEquipeA(0);
    setPontosEquipeB(0);
    setSetsEquipeA(0);
    setSetsEquipeB(0);
    setPlacares([]);
    setFimDeJogo(false);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {setsEquipeA !== 3 && setsEquipeB !== 3 ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <button
                onClick={() => {
                  setPontosEquipeA(pontosEquipeA - 1);
                }}
                disabled={pontosEquipeA === 0}
                style={{ height: "8vh", marginRight: "8px" }}
              >
                -
              </button>
              <button
                onClick={() => {
                  setPontosEquipeA(pontosEquipeA + 1);
                }}
                disabled={fimDeJogo}
                style={{ height: "8vh", marginRight: "8px" }}
              >
                +
              </button>
            </div>
            <div
              style={{
                border: "2px solid black",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "16px", padding: "0px 8px" }}>
                Equipe A
              </div>
              <div style={{ fontSize: "32px" }}>{pontosEquipeA}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "start",
                border: "2px solid black",
                marginLeft: "8px",
                marginRight: "8px",
                borderRadius: "8px",
                padding: "4px",
              }}
            >
              <div style={{ marginRight: "8px", fontSize: "16px" }}>
                {setsEquipeA}
              </div>
              <div style={{ marginLeft: "8px", fontSize: "16px" }}>
                {setsEquipeB}
              </div>
            </div>
            <div
              style={{
                border: "2px solid black",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                padding: "0px 8px",
              }}
            >
              <div style={{ fontSize: "16px" }}>Equipe B</div>
              <div data-testid="countvalue" style={{ fontSize: "32px" }}>
                {pontosEquipeB}
              </div>
            </div>
            <button
              onClick={() => {
                setPontosEquipeB(pontosEquipeB + 1);
              }}
              disabled={fimDeJogo}
              style={{ marginLeft: "8px" }}
              data-testid="increment"
            >
              +
            </button>
            <button
              onClick={() => {
                setPontosEquipeB(pontosEquipeB - 1);
              }}
              disabled={pontosEquipeB === 0}
              style={{ height: "8vh", marginLeft: "8px" }}
              data-testid="decrementButton"
            >
              -
            </button>
          </div>
          {fimDeJogo && (
            <>
              <div style={{ marginTop: "8px", fontSize: "12px" }}>
                Equipa {pontosEquipeA > pontosEquipeB ? "A" : "B"} vencedora
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "8px",
                }}
              >
                <button
                  style={{ fontSize: "12px" }}
                  onClick={() => confirmarVitoria()}
                >
                  Confirmar
                </button>
              </div>
            </>
          )}

          {placares.length > 0 && (
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              {placares.map((placar) => (
                <div style={{ fontSize: "8px" }}>{placar}</div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ marginBottom: "8px" }}> Fim de jogo </div>
          <div style={{ marginBottom: "8px" }}>
            Equipe {setSetsEquipeA > setSetsEquipeB ? "A" : "B"} vencedora
          </div>
          <button onClick={() => novoJogo()}>Novo jogo</button>
        </>
      )}
    </div>
  );
}
