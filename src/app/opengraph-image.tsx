import { ImageResponse } from "next/og";
import { EMPRESA } from "@/config/data";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = `${EMPRESA.nombre} - Alquiler para eventos en Zona Norte`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #10111b 0%, #171827 45%, #2e2a1c 100%)",
          color: "#fffdfa",
          fontFamily: "sans-serif",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 36,
            padding: "42px 46px",
            background:
              "radial-gradient(circle at top right, rgba(201,168,76,0.28), transparent 28%), rgba(255,255,255,0.03)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 18,
                    background: "rgba(201,168,76,0.12)",
                    fontSize: 34,
                  }}
                >
                  🍽️
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: "#c9a84c",
                    }}
                  >
                    Alquiler para eventos
                  </div>
                  <div
                    style={{
                      fontSize: 44,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {EMPRESA.nombre}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "flex-end",
                fontSize: 20,
                color: "#d7d3cb",
              }}
            >
              <div>Zona Norte</div>
              <div>WhatsApp directo</div>
              <div>Atencion 24 horas</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 820,
            }}
          >
            <div
              style={{
                fontSize: 72,
                lineHeight: 1.02,
                fontWeight: 700,
              }}
            >
              Vajilla, barra, mozos, manteleria, cascada de chocolate y robot LED.
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: "#dad6cf",
              }}
            >
              Catalogo real, consulta clara y cierre rapido por WhatsApp.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            {[
              "Vajilla y Cristaleria",
              "Barra y Bebidas",
              "Manteleria",
              "Cascada de Chocolate",
              "Robot LED / Personaje Animado",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 999,
                  padding: "12px 20px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  fontSize: 22,
                  color: "#f4efe7",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
